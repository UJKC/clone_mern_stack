function App() {

  // Asynchronus call to backend services
  const get = async() => {

    // wait for sme time and fetch the results
    const res = await fetch('http://localhost:8000/api');

    // If good result will be 200 OK
    console.log(res);
  };

  // Calling The function
  get();
  
  return <div>welcome to frontend</div>;
}

export default App;
