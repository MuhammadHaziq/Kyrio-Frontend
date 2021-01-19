import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { MESSAGE } from "./constants/ActionTypes";
import { CToaster, CAlert } from "@coreui/react";
import "./scss/style.scss";
import { useSelector, useDispatch } from "react-redux";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const Login = React.lazy(() => import("./views/Authorization/Login"));
const Register = React.lazy(() => import("./views/Authorization/Register"));
const Page404 = React.lazy(() => import("./views/Errors/Page404"));
const Page500 = React.lazy(() => import("./views/Errors/Page500"));
const TheLayout = React.lazy(() => import("./containers/TheLayout"));
const lightDatatable = React.lazy(() =>
  require("./assets/css/all_datatables_light.css")
);
const darkDatatable = React.lazy(() =>
  require("./assets/css/all_datatables_dark.css")
);
// "top-center"
const MessageHandler = (props) => {
  const [visible, setVisible] = useState(3);
  const dispatch = useDispatch();
  const closeError = (remaining) => {
    setVisible(remaining);
    if (remaining === 0) {
      let msg = {
        open: false,
        message: "",
        object: {},
        error: false,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
  return (
    <CToaster position={props.position}>
      <CAlert
        color={props.error ? "danger" : "success"}
        show={visible}
        onShowChange={closeError}
      >
        {props.message}
      </CAlert>
    </CToaster>
  );
};

const App = () => {
  const msg = useSelector((state) => state.msg);
  const darkMode = useSelector((state) => state.settings.darkMode);
  // {darkMode === true
  //   ? require("./assets/css/all_datatables_dark.css")
  //   : require("./assets/css/all_datatables_light.css")}
  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        {msg.open ? (
          <MessageHandler
            position={msg.position}
            title={msg.title}
            message={msg.message}
            error={msg.error}
          />
        ) : (
          ""
        )}
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <Page404 {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => <Page500 {...props} />}
          />
          <Route
            path="/"
            name="Home"
            render={(props) => <TheLayout {...props} />}
          />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
