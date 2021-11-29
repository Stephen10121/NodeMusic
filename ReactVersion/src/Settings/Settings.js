const Settings = (props) => {

    return (
      <div className="Settings">
          <div className="header">
            <button id="home" onClick={props.change}>Home</button>
            <p>Settings Page</p>
          </div>
      </div>
    );
  }
  
  export default Settings;