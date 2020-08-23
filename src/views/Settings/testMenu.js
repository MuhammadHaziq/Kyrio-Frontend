export default [
    {
    _tag: 'CSidebarNavDropdown',
    name: 'Reports',
    to: '/reports',
    icon: 'cil-bar-chart',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: "Sales summary",
        to: "/reports",
      },
      {
        _tag: 'CSidebarNavItem',
        name: "Sales by item",
        to: "/reports",
      },
      {
        _tag: 'CSidebarNavItem',
        name: "Sales by category",
        to: "/reports",
      },
      {
        _tag: 'CSidebarNavItem',
        name: "Sales by employee",
        to: "/reports",
      },
      {
        _tag: 'CSidebarNavItem',
        name: "Sales by payment type",
        to: "/reports",
      },
      {
        _tag: 'CSidebarNavItem',
        name: "Receipts",
        to: "/reports",
      },
      {
        _tag: 'CSidebarNavItem',
        name: "Sales by modifier",
        to: "/reports",
      },
      {
        _tag: 'CSidebarNavItem',
        name: "Discounts",
        to: "/reports",
      },
      {
        _tag: 'CSidebarNavItem',
        name: "Taxes",
        to: "/reports",
      },
      {
        _tag: 'CSidebarNavItem',
        name: "Shifts",
        to: "/reports",
      },
    ]
  },
  {
  _tag: 'CSidebarNavDropdown',
  name: 'Items',
  to: '/items',
  icon: 'cil-briefcase',
  _children: [
    {
      _tag: 'CSidebarNavItem',
      name: "Item list",
      to: "/items",
    },
    {
      _tag: 'CSidebarNavItem',
      name: "Categories",
      to: "/categories",
    },
    {
      _tag: 'CSidebarNavItem',
      name: "Modifiers",
      to: "/modifiers",
    },
    {
      _tag: 'CSidebarNavItem',
      name: "Discounts",
      to: "/discounts",
    },
  ]
},
  {
  _tag: 'CSidebarNavItem',
  name: 'Inventory',
  to: '/inventory',
  icon: 'cil-basket-loaded',
},
{
  _tag: 'CSidebarNavDropdown',
  name: 'Employees',
  to: '/employees',
  icon: 'cil-credit-card',
  _children: [
    {
      _tag: 'CSidebarNavItem',
      name: "Employees list",
      to: "/employees",
    },
    {
      _tag: 'CSidebarNavItem',
      name: "Access rights",
      to: "/employees",
    },
    {
      _tag: 'CSidebarNavItem',
      name: "Timecards",
      to: "/employees",
    },
    {
      _tag: 'CSidebarNavItem',
      name: "Total hours worked",
      to: "/employees",
    },
  ]
},
{
  _tag: 'CSidebarNavItem',
  name: 'Customers',
  to: '/customers',
  icon: 'cil-people',
},
{
  _tag: 'CSidebarNavItem',
  name: "Settings",
  to: "/settings",
  icon: "cil-settings",
},
{
_tag: 'CSidebarNavDropdown',
name: "Help",
to: "/help",
icon: "icon-speech",
children: [
{
  _tag: 'CSidebarNavItem',
  name: "Help center",
  to: "/help",
},
{
  _tag: 'CSidebarNavItem',
  name: "Community",
  to: "/help",
},
{
  _tag: 'CSidebarNavItem',
  name: "Live chat",
  to: "/help",
},
],
},
]
