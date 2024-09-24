import {useState, useEffect} from 'react';
import io from 'socket.io-client';


function App() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io.connect("http://localhost:3001"));
  },[])
  useEffect(() => {
    if(socket){
      socket.on("messageReceived", () => {
        console(`Message was received by the server`);
      })      
    }
  },[socket])

  const sendMessage = () => {
    socket?.emit("sendMessage", ({message}))
  }

  return (
    <div className="App">
      <div className="form">
        <input placeholder="Type message..." type="text" 
        value={message} onChange={(e) => {setMessage(e.target.value)}}/>
        <button onClick={sendMessage}>Message</button>
      </div>
    </div>
  )
}

export default App
