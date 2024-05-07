import '../styles/Titlebar.css';

const Titlebar = () => {
  return (
    <section className="titlebar">
      <img
        src="/vscode_icon.svg"
        alt="VSCode Icon"
        height={15}
        width={15}
        className="icon"
      />
      <div className="items">
        <p>File</p>
        <p>Edit</p>
        <p>View</p>
        <p>Go</p>
        <p>Run</p>
        <p>Terminal</p>
        <p>Help</p>
      </div>
      <p className="title">Amrit Srivastava - Portfolio</p>
      <div className="windowButtons">
        <span className="minimize"></span>
        <span className="maximize"></span>
        <span className="close"></span>
      </div>
    </section>
  );
};

export default Titlebar;
