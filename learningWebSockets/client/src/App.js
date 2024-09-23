import io from 'socket.io-client';
import {useEffect, useState} from 'react';

function App() {
  const [socket, setSocket] = useState(null);
  useEffect(()=>{
    setSocket(io.connect("http://localhost:3001"));
  },[])
  
  const sendMessage = () => {
    socket?.emit("sendMessage", {message: "Hello"})
  }
  return (
    <div className="App">
      <div className="form">
        <input placeholder="message" type='text'/>
        <button >Send Message</button>        
      </div>
    </div>
  );
}

export default App;
