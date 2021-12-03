import LandingPage from "../LandingPage/LandingPage";
import Music from "../Music/Music";
import Settings from "../Settings/Settings";

const ChooseRender = (props) => {
    if (props.place === "music") {
      return(
        <Music change={props.updateLocation}/>
      );
    } else if (props.place === "setting") {
      return(
        <Settings change={props.updateLocation}/>
      );
    } else {
      return(
        <LandingPage change={props.updateLocation}/>
      );
    }
}

export default ChooseRender;