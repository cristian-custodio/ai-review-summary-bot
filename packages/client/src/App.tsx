import { useState, useEffect } from 'react';
import './App.css';
import { Button } from '@/components/ui/button';

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
         <p className="p-4 font-bold text-3xl">{message}</p>
         <Button>Click me!</Button>
      </div>
   );
}

export default App;
