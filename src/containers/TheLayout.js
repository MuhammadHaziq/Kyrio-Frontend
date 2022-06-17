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
import {
  FEATURES_TOGGLE,
  ROLES_ACCESS_TOGGLE,
  ITEM_INSERT,
} from "../SocketEvents";
import {
  GET_FEATURE_MODULE,
  SET_ACCESS_RIGHT_MODULE,
} from "../constants/ActionTypes";
import io from "socket.io-client";
import DeleteIcon from "../assets/icons/account-deleted.png";
import { SocketURL } from "../constants/baseUrls";

const TheLayout = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.settings.darkMode);
  const user = useSelector((state) => state.auth.user);
  const account_deleted = useSelector((state) => state.account.account_deleted);

  const classes = classNames(
    "c-app c-default-layout",
    darkMode && "c-dark-theme"
  );

  useEffect(() => {
    var connectionOptions = {
      // "force new connection" : true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    };
    // const socketBaseUrl =
    // window.location.protocol +
    // "//" +
    // window.location.hostname +
    // ":" +
    // "3002";
    const socketBaseUrl = SocketURL
    // const socketBaseUrl = "http://192.168.10.7:3002" // Home IP
    let socket = io(socketBaseUrl, connectionOptions);

    socket.on("connect", () => {
      socket.emit("create", user.account);
      socket.on(FEATURES_TOGGLE, (data) => {
        if (user._id !== data.user) {
          dispatch({ type: GET_FEATURE_MODULE, response: data.backoffice });
        }
      });
      socket.on(ROLES_ACCESS_TOGGLE, (data) => {
        if (user._id !== data.user) {
          if (user.role_id == data.backoffice._id) {
            dispatch({
              type: SET_ACCESS_RIGHT_MODULE,
              response: data.backoffice,
            });
          }
        }
      });
      // socket.on("ITEM_UPDATE", (data) => {
      //   console.log(data)
      // });
      // socket.on(ITEM_INSERT,(data) => {
      //   console.log(data)
      // });
    });
  }, []);

  return (
    <div className={classes}>
      {account_deleted ? (
        <div className="c-body">
          <div className="account-deleted" style={{ display: "flex" }}>
            <div className="message-block">
              <div className="message-block-img">
                <img src={DeleteIcon} />
              </div>
              <div className="message-block-message">
                <div className="message-block-message-title">
                  Your account has been deleted
                </div>
                <div className="message-block-message-text">
                  Thank you for using our services
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <TheSidebar />
          <TheAside />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent />
            </div>
            <TheFooter />
          </div>
        </>
      )}
    </div>
  );
};

export default TheLayout;
