import React from 'react';

const App = () => {
  return (
    <div className="container mt-4">
      {/* Bootstrap Button */}
      <button className="btn btn-primary">Bootstrap Button</button>

      {/* Tailwind Button */}
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
        Tailwind Button
      </button>

      {/* Combination */}
      <button className="btn btn-danger bg-red-600 hover:bg-red-800 text-white font-bold">
        Combined Button
      </button>
    </div>
  );
};

export default App;
