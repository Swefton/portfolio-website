import Navbar from "./navbar/navbar";
import Titlebar from "./navbar/titlebar";
import AboutMe from "./page/AboutMe";


function App() {

  return (
    <div className="App">
      <Titlebar />
      <Navbar />
      <br />
      <AboutMe />

    </div>
  );
}

export default App;
