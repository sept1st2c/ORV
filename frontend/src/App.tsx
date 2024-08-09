import { useState } from "react";
import { useEffect } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
import "./App.css";

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  const socket = new WebSocket('ws://localhost:8080');

  useEffect(() => {
    // Handle incoming messages
    socket.onmessage = (event: MessageEvent) => {
      setMessages(prevMessages => [...prevMessages, event.data]);
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, [socket]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInput(newValue);

    // Send the new value to the WebSocket server
    socket.send(newValue);
  };

  return (
    <div>
      <h1>Real-Time Text Update</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;