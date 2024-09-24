import io from 'socket.io-client';
import {useEffect, useState} from 'react';

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(()=>{
    setSocket(io.connect("http://localhost:3001"));
  },[])
  
  const sendMessage = (e) => {
    e.preventDefault();
    socket?.emit("sendMessage", {message})
  }
  return (
    <div className="App">
      <div className="form">
        <input placeholder="message" type='text' value={message} onChange={(e) => {setMessage(e.target.value)}}/>
        <button onClick={sendMessage}>Send Message</button>        
      </div>
    </div>
  );
}

export default App;
