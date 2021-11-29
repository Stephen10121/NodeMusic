import LandingPage from "../LandingPage/LandingPage";
import Music from "../Music/Music";
import Settings from "../Settings/Settings";

const ChooseRender = (props) => {
    if (props.place === "music") {
      return(
        <div>
          <Music change={props.updateLocation}/>
        </div>
      );
    } else if (props.place === "setting") {
      return(
        <div>
          <Settings change={props.updateLocation}/>
        </div>
      );
    } else {
      return(
        <LandingPage change={props.updateLocation}/>
      );
    }
}

export default ChooseRender;