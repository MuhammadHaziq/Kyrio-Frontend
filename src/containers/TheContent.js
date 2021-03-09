import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";
import LoginCheck from "../views/Authorization/LoginCheck";
// routes config
import routes from "../routes";
import { useSelector } from "react-redux";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  const user = useSelector((state) => state.auth.user);
  return !LoginCheck() ? (
    <Redirect exact to="/login" />
  ) : (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map(({ path, name, Component, exact }, key) => (
              <Route
                exact={exact}
                path={path}
                key={key}
                render={(props) => {
                  const crumbs = routes
                    // Get all routes that contain the current one.
                    .filter(({ path }) => props.match.path.includes(path))
                    // Swap out any dynamic routes with their param values.
                    // E.g. "/pizza/:pizzaId" will become "/pizza/1"
                    .map(({ path, ...rest }) => ({
                      path: Object.keys(props.match.params).length
                        ? Object.keys(props.match.params).reduce(
                            (path, param) =>
                              path.replace(
                                `:${param}`,
                                props.match.params[param]
                              ),
                            path
                          )
                        : path,
                      ...rest,
                    }));
                  return (
                    <CFade>
                      <Component {...props} />
                    </CFade>
                  );
                }}
              />
            ))}

            <Redirect from="/" to="/reports/sales" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
/*
{routes.map((route, idx) => {
  console.log(route);
  return (
    route.component && (
      <Route
        key={idx}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={(props) => (
          <CFade>
            <route.component {...props} />
          </CFade>
        )}
      />
    )
  );
})}
*/
