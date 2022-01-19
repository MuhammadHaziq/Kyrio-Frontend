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
  { path: "/customers", exact: true, name: "Customer", Component: Customers },
  { path: "/inventory", exact: true, name: "Dashboard", Component: Dashboard },
  { path: "/reports", name: "Reports", Component: Dashboard, exact: true, },
  { path: "/reports/sales", name: "Sales Summary", Component: Dashboard, exact: true, },
  {
    path: "/reports/goods",
    name: "Sale by Items",
    exact: true,
    Component: SalesItem,
  },
  {
    path: "/reports/categories",
    name: "Sale by Categories",
    exact: true,
    Component: Categories,
  },
  {
    path: "/reports/employee",
    name: "Sale by Employee",
    exact: true,
    Component: SalesEmployee,
  },
  {
    path: "/reports/pay-types",
    name: "Sale by Payment Type",
    exact: true,
    Component: SalesPaymentType,
  },
  {
    path: "/reports/average",
    name: "Receipt",
    exact: true,
    Component: SalesReceipts,
  },
  {
    path: "/reports/modifiers",
    name: "Modifier",
    exact: true,
    Component: SalesModifier,
  },
  {
    path: "/reports/discounts",
    name: "Discount",
    exact: true,
    Component: SalesDiscount,
  },
  {
    path: "/reports/shift",
    name: "Shift",
    exact: true,
    Component: SalesShift,
  },
  {
    path: "/reports/tax",
    name: "Tax",
    exact: true,
    Component: SalesTax,
  },
  { path: "/settings", name: "Settings", Component: Settings },
  {
    path: "/settings/Features",
    name: "Features",
    Component: Features,
  },
  { path: "/items", name: "Item", exact: true, Component: ItemsList },
  { path: "/items/categories", exact: true, name: "Category-list", Component: CategoryList },
  { path: "/items/discounts", exact: true, name: "Discount-list", Component: DiscountList },
  { path: "/items/modifiers", exact: true, name: "Modifire-list", Component: Modifires },
  { path: "/items/customers", exact: true, name: "Customer", Component: Customers },
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
