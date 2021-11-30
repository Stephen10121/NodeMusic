import React, { useState, useEffect, useRef } from "react";
import './Music.css';
import socketio from 'socket.io-client';
//const socket = socketio("https://www.gruzservices.com");
const socket = socketio("http://192.168.0.24:4000");


const Music = (props) => {
  const [songs, changeSongs] = useState([]);

  const checkIncomingData = () => {
    socket.on("getFiles", (data) => {
      changeSongs(data);
    });
  }

  const renderSongs = () => {
    return songs.map((item, index) => (
      <button className="song" key={index}>
        {item}
      </button>
    ));
  }

  const onStartup = useRef(() => {});
  onStartup.current = () => {
    socket.emit("getFiles", "new_get");
    checkIncomingData();
  }
  useEffect(() => {
      onStartup.current();
  }, []);

  return (
    <div className="Music">
      <div className="header">
          <button id="home" onClick={props.change}>Home</button>
          <p>Music Page</p>
      </div>
      <div className="songSection">
      {renderSongs()}        
      </div>
    </div>
  );
  }
  
  export default Music;