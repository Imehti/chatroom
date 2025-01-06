import socket from '../socket'

const ConnectionManager = () => {

  const connect = () => {
    if (!socket.connected) socket.connect();
  };
  const disconnect = () => {
    if (socket.connected) socket.disconnect();
  };
  

  return (
    <>
      <div className="space-x-4 my-2 mx-4">
        <button className='bg-green-700 text-white rounded-lg py-1 px-3 shadow-md' onClick={connect}>Connect</button>
        <button className='bg-red-700 text-white rounded-lg py-1 px-3 shadow-md' onClick={disconnect}>Disconnect</button>
      </div>
    </>
  );
};

export default ConnectionManager;
