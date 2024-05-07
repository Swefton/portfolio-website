import Navbar from "./navbar/navbar";
import CodeBlock from "./page/CodeBlock";


function App() {

  const code = `
  function helloWorld() {
    console.log('Hello, world!');
  }
  helloWorld();
`;

  return (
    <div className="App">
      <Navbar />
      <CodeBlock code={code} />

    </div>
  );
}

export default App;
