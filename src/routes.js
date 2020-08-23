import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Settings = React.lazy(() => import("./views/Settings/Settings"));
const ItemsList = React.lazy(() => import("./views/Items/ItemsList"));
const CategoryList = React.lazy(() => import("./views/Items/CategoryList"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/reports", name: "Reports", component: Dashboard },
  { path: "/settings", name: "Settings", component: Settings },
  { path: "/items", name: "Item-list", component: ItemsList },
  { path: "/categories", name: "Category-list", component: CategoryList },
];

export default routes;
