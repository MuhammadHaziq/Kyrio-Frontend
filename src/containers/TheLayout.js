import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import {
  TheContent,
  TheSidebar,
  TheAside,
  TheFooter,
  TheHeader,
} from "./index";
import { FEATURES_TOGGLE, ROLES_ACCESS_TOGGLE } from "../SocketEvents"
import {
  GET_FEATURE_MODULE,
  SET_ACCESS_RIGHT_MODULE
} from "../constants/ActionTypes";
import io from "socket.io-client";

const TheLayout = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.settings.darkMode);
  const user = useSelector((state) => state.auth.user);

  const classes = classNames(
    "c-app c-default-layout",
    darkMode && "c-dark-theme"
  );

  useEffect(() => {

    var connectionOptions =  {
      // "force new connection" : true,
      "reconnectionAttempts": "Infinity", 
      "timeout" : 10000,                  
      "transports" : ["websocket"]
    };
    const socketBaseUrl =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":" +
    "3000";
      let socket = io(socketBaseUrl,connectionOptions);
      
        
      
      socket.on("connect", () => {
        socket.emit('create', user.account);
        socket.on(FEATURES_TOGGLE,(data) => {
          if(user._id !== data.user){
            dispatch({ type: GET_FEATURE_MODULE, response: data.backoffice });
          }
        });
        socket.on(ROLES_ACCESS_TOGGLE,(data) => {
          if(user._id !== data.user){
            if(user.role_id == data.backoffice._id){
              dispatch({ type: SET_ACCESS_RIGHT_MODULE, response: data.backoffice }); 
            }
          }
        });
      });

  }, []);

  return (
    <div className={classes}>
      <TheSidebar />
      <TheAside />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
