import { useState, useEffect } from 'react';
import './App.css';
import ChatBot from './components/ChatBot';

function App() {
   const [message, setMessage] = useState<string>('');

   useEffect(() => {
      fetch('/api/hello')
         .then((response: Response) => response.json())
         .then((data: { message: string }) => setMessage(data.message))
         .catch((error) => console.error('Error:', error));
   }, []);

   return (
      <div className="p-4">
         <ChatBot />
      </div>
   );
}

export default App;
