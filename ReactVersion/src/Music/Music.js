import React, { useState, useEffect, useRef } from "react";
import socketio from 'socket.io-client';
//const socket = socketio("https://www.gruzservices.com");
const socket = socketio("http://192.168.0.24:4000");

const Music = (props) => {
  const checkIncomingData = () => {
    socket.on("getFiles", (data) => {
      console.log(data);
    });
  }

  const onStartup = useRef(() => {});
    onStartup.current = () => {
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
      </div>
    );
  }
  
  export default Music;