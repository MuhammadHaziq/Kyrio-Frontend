import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const SalesItem = React.lazy(() => import("./views/dashboard/item/SalesItem"));
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
  { path: "/", exact: true, name: "Home" },
  { path: "/reports/sales", name: "Reports / Sales", component: Dashboard },
  {
    path: "/reports/goods",
    name: "Reports / Items",
    component: SalesItem,
  },
  {
    path: "/reports/categories",
    name: "Reports / Categories",
    component: Categories,
  },
  {
    path: "/reports/employee",
    name: "Reports / Employee",
    component: SalesEmployee,
  },
  {
    path: "/reports/pay-types",
    name: "Reports / Payment Type",
    component: SalesPaymentType,
  },
  {
    path: "/reports/average",
    name: "Reports / Receipt",
    component: SalesReceipts,
  },
  {
    path: "/reports/modifiers",
    name: "Reports / Modifier",
    component: SalesModifier,
  },
  {
    path: "/reports/discounts",
    name: "Reports / Discount",
    component: SalesDiscount,
  },
  {
    path: "/reports/shift",
    name: "Reports / Shift",
    component: SalesShift,
  },
  {
    path: "/reports/tax",
    name: "Reports / Tax",
    component: SalesTax,
  },
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
    path: "/employees/user_roles",
    name: "User Roles",
    exact: true,
    component: UserAccess,
  },
  {
    path: "/employees/timecard",
    name: "Employee Time Card",
    exact: true,
    component: TimeCards,
  },
  {
    path: "/employees/total-hour-worked",
    name: "Employee Total Hours Worked",
    exact: true,
    component: TotalHoursWorked,
  },
];

export default routes;
