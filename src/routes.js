import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Settings = React.lazy(() => import("./views/Settings/Settings"));
const ItemsList = React.lazy(() => import("./views/Items/ItemsList"));
const CategoryList = React.lazy(() => import("./views/Items/CategoryList"));
const DiscountList = React.lazy(() => import("./views/Items/DiscountList"));
const Modifires = React.lazy(() => import("./views/Items/Modifires"));
const Customers = React.lazy(() => import("./views/customers/Customers"));
const EmployeeList = React.lazy(() => import("./views/employee/EmployeeList"));
const TimeCards = React.lazy(() => import("./views/employee/TimeCards"));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/reports", name: "Reports", component: Dashboard },
  { path: "/settings", name: "Settings", component: Settings },
  { path: "/items", name: "Item-list", component: ItemsList },
  { path: "/categories", name: "Category-list", component: CategoryList },
  { path: "/discounts", name: "Discount-list", component: DiscountList },
  { path: "/modifiers", name: "Modifire-list", component: Modifires },
  { path: "/customers", name: "Customer", component: Customers },
  {
    path: "/employees",
    name: "Employee List",
    exact: true,
    component: EmployeeList,
  },
  {
    path: "/employees/timecard",
    name: "Employee Time Card",
    exact: true,
    component: TimeCards,
  },
];

export default routes;
