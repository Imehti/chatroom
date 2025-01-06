const ConnectionState = ({isConnected}:any) => {
  return (
    <>
    <p className="mt-1 mx-4 font-mono">State: { '' + isConnected }</p>
    </>
  )
}

export default ConnectionState