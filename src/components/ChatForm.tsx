import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "../schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { sendMessage } from "../features/messageSlice";
import socket from "../socket";
import Events from "./Events";

const ChatForm = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  // User state to switch between multiple users
  const [currentUser, setCurrentUser] = useState({ id: 1, userName: "Danny" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const payload = {
      message: value.message,
      user: currentUser, // Use the current user's info
      timestamp: new Date().toISOString(),
    };

    socket
      .timeout(5000)
      .emit("create-something", payload, (response: string) => {
        if (!response || response === "error") {
          console.error("Failed to send message");
          setIsLoading(false);
          return;
        }

        dispatch(sendMessage(payload)); // Save in Redux
        setIsLoading(false);
      });

    reset();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold font-mono italic mb-12">Welcome To Your Chatroom</h1>

        {/* Chat Interface Container */}
        <div className="w-full max-w-3xl shadow-xl rounded-lg overflow-hidden bg-white">
          {/* Chat Messages Section */}
          <div className="h-96 overflow-y-scroll p-4 border-b border-gray-300">
            <Events />
          </div>

          {/* Chat Input Section */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center justify-between p-4 bg-gray-200"
          >
            {/* Input Box */}
            <input
              {...register("message")}
              type="text"
              placeholder="Type your message..."
              className="flex-grow border border-gray-300 rounded-lg px-4 py-2 mr-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* Display error */}
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}

            {/* Send Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              } hover:bg-blue-600`}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>

          {/* User Switch Button */}
          <div className="p-4 bg-gray-100 flex justify-between items-center">
            <p className="text-gray-600">
              Current User:{" "}
              <span className="font-semibold text-blue-600">
                {currentUser.userName}
              </span>
            </p>
            <button
              onClick={() =>
                setCurrentUser(
                  currentUser.userName === "Danny"
                    ? { id: 2, userName: "John" }
                    : { id: 1, userName: "Danny" }
                )
              }
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg shadow-md"
            >
              Switch User
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatForm;
