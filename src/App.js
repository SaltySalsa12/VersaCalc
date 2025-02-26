import React from 'react';
import Calculator from './calculator';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-white text-3xl font-bold mb-8">Calculator</h1>
      <Calculator />
    </div>
  );
}

export default App;