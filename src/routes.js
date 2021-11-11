import React from "react";

// const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Dashboard = React.lazy(() =>
  import("./views/dashboard/dashboardSummary/Dashboard")
);
const Account = React.lazy(() =>
  import("./views/Account/Account.jsx")
);

const SalesItem = React.lazy(() => import("./views/dashboard/item/SalesItem"));
// const SalesItem = React.lazy(() =>
//   import("./views/dashboard/salesByItems/SalesByItems")
// );
const Categories = React.lazy(() =>
  import("./views/dashboard/categories/Categories")
);
const SalesEmployee = React.lazy(() =>
  import("./views/dashboard/employee/SalesEmployee")
);
const SalesPaymentType = React.lazy(() =>
  import("./views/dashboard/paymentType/SalesPaymentType")
);
const SalesReceipts = React.lazy(() =>
  import("./views/dashboard/receipt/SalesReceipts")
);
const SalesModifier = React.lazy(() =>
  import("./views/dashboard/modifier/SalesModifier")
);
const SalesDiscount = React.lazy(() =>
  import("./views/dashboard/discount/SalesDiscount")
);
const SalesTax = React.lazy(() => import("./views/dashboard/taxes/SalesTax"));
const SalesShift = React.lazy(() =>
  import("./views/dashboard/shift/SalesShift")
);
const Settings = React.lazy(() => import("./views/Settings/Settings"));
const Features = React.lazy(() => import("./views/Settings/General/General"));
const ItemsList = React.lazy(() => import("./views/Items/ItemsList"));
const CategoryList = React.lazy(() => import("./views/Items/CategoryList"));
const DiscountList = React.lazy(() => import("./views/Items/DiscountList"));
const Modifires = React.lazy(() => import("./views/Items/Modifires"));
const Customers = React.lazy(() => import("./views/customers/Customers"));
const EmployeeList = React.lazy(() => import("./views/employee/EmployeeList"));
const TimeCards = React.lazy(() => import("./views/employee/TimeCards"));
const UserAccess = React.lazy(() => import("./views/employee/UserAccess"));
const TotalHoursWorked = React.lazy(() =>
  import("./views/employee/TotalHoursWorked")
);
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [

  { path: "/", exact: true, name: "Home", Component: Dashboard },
  { path: "/account", exact: true, name: "Account", Component: Account },
  { path: "/reports/sales", name: "Reports / Sales Summary", Component: Dashboard },
  {
    path: "/reports/goods",
    name: "Reports / Sale by Items",
    Component: SalesItem,
  },
  {
    path: "/reports/categories",
    name: "Reports / Sale by Categories",
    Component: Categories,
  },
  {
    path: "/reports/employee",
    name: "Reports / Sale by Employee",
    Component: SalesEmployee,
  },
  {
    path: "/reports/pay-types",
    name: "Reports / Sale by Payment Type",
    Component: SalesPaymentType,
  },
  {
    path: "/reports/average",
    name: "Reports / Receipt",
    Component: SalesReceipts,
  },
  {
    path: "/reports/modifiers",
    name: "Reports / Modifier",
    Component: SalesModifier,
  },
  {
    path: "/reports/discounts",
    name: "Reports / Discount",
    Component: SalesDiscount,
  },
  {
    path: "/reports/shift",
    name: "Reports / Shift",
    Component: SalesShift,
  },
  {
    path: "/reports/tax",
    name: "Reports / Tax",
    Component: SalesTax,
  },
  { path: "/settings", name: "Settings", Component: Settings },
  {
    path: "/settings/Features",
    name: "Features",
    exact: true,
    Component: Features,
  },
  // { path: "/settings", name: "Settings", Component: Settings },
  // { path: "/settings", name: "Settings", Component: Settings },
  // { path: "/settings", name: "Settings", Component: Settings },
  // { path: "/settings", name: "Settings", Component: Settings },
  { path: "/items", name: "items / Item-list", exact: true, Component: ItemsList },
  { path: "/categories", name: "items / Category-list", exact: true, Component: CategoryList },
  { path: "/discounts", name: "items / Discount-list", exact: true, Component: DiscountList },
  { path: "/modifiers", name: "items / Modifire-list", exact: true, Component: Modifires },
  { path: "/customers", name: "items / Customer", exact: true, Component: Customers },
  {
    path: "/employees",
    name: "Employee List",
    exact: true,
    Component: EmployeeList,
  },
  {
    path: "/employees/user_roles",
    name: "User Roles",
    exact: true,
    Component: UserAccess,
  },
  {
    path: "/employees/timecard",
    name: "Employee Time Card",
    exact: true,
    Component: TimeCards,
  },
  {
    path: "/employees/total-hour-worked",
    name: "Employee Total Hours Worked",
    exact: true,
    Component: TotalHoursWorked,
  },
];

export default routes;
