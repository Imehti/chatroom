import { useSelector } from "react-redux";
import { ApplicationState } from "../store";

const Events = () => {
  const messages = useSelector(
    (state: ApplicationState) => state.message.messages
  );
  return (
    <ul className="space-y-1 p-2 font-serif">
      {messages.map((event, index) => {
        const formattedTime = new Date(event.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        return (
          <div className="flex items-center space-x-1">
            <span>{event.user.userName} :</span>
            <li className="bg-blue-200 rounded-lg p-2 max-w-max" key={index}>
              {event.message}
            </li>
            <span className="text-xs">{formattedTime}</span>
          </div>
        );
      })}
    </ul>
  );
};

export default Events;
