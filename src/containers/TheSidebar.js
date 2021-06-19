import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MESSAGE } from "../constants/ActionTypes";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";
import { sidebarToggle } from "../actions/settingsAction";
// sidebar nav config
import _nav from "./_nav";
import LoginCheck from "../views/Authorization/LoginCheck";
var _ = require("lodash");

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.settings.sidebarShow);
  const user = useSelector((state) => state.auth.user);

  const [navigation, setNavigation] = useState([]);
  useEffect(() => {
    if (typeof user.roleData !== "undefined") {
      if (!user.roleData.allowBackoffice.enable || "") {
        let msg = {
          open: true,
          message: "Sorry you do not have access to backoffice!",
          object: {},
          error: true,
        };
        dispatch({ type: MESSAGE, data: msg });
      } else {
        let module = user.roleData.allowBackoffice.modules || [];
        
        // let settings = module.filter(
        //   (itm) => itm.backoffice.name === "Edit general settings"
        // );
        let routes = [];
        // let settingCheck = false;

        for (const mod of module) {
          if (mod.enable) {
            if (mod.backoffice.isMenu && !mod.backoffice.isChild) {
              let nav = _nav.filter((itm) => itm.moduleName === mod.backoffice.name);

              if (nav.length > 0) {
                
                // Check Bacoffice Module Is Enabled Or Not For Reports
                // Shifts Feature Done
                if(nav[0].name === "Reports"){
                  
                  let mod = module.filter(itm => itm.backoffice.name === "View sales report")
                  if(!mod[0].enable){
                    nav.splice(1, 1);
                  } else if(nav.filter(itm => itm.name == "Reports").length <= 0) {
                    nav.push(_nav[0])
                  }
                  let shift = user.features.filter(ftr => ftr.feature.name === "Shifts")
                  
                  if(!shift[0].enable && mod[0].enable){
                    nav[0]._children.splice(9, 1);
                  } else if(nav[0]._children.filter(ch => ch.name === "Shifts").length <= 0 && mod[0].enable){
                    nav[0]._children.push({
                      _tag: "CSidebarNavItem",
                      name: "Shifts",
                      to: "/reports/shift",
                    })
                  }
                }
                // #END#
                // Check Bacoffice Module Is Enabled Or Not For Items & Inventory
                if(nav[0].name === "Items"){ 
                  let mod = module.filter(itm => itm.backoffice.name === "Items")
                  if(!mod[0].enable){
                    nav.splice(1, 1);
                  } else if(nav.filter(itm => itm.name == "Items").length <= 0) {
                    nav.push(_nav[0])
                  }
                }
                if(nav[0].name === "Inventory"){ 
                  let mod = module.filter(itm => itm.backoffice.name === "Items")
                  if(!mod[0].enable){
                    nav.splice(1, 1);
                  } else if(nav.filter(itm => itm.name == "Inventory").length <= 0) {
                    nav.push(_nav[0])
                  }
                }
                // #END#

                // Employees Features
                if(nav[0].name === "Employees"){
                  let timeClok = user.features.filter(ftr => ftr.feature.name === "Time clock")
                  if(!timeClok[0].enable){
                    nav[0]._children.splice(2, 2);
                  } else if(nav[0]._children.filter(ch => ch.name === "Timecards").length <= 0){
                    nav[0]._children.push({
                      _tag: "CSidebarNavItem",
                      name: "Timecards",
                      to: "/employees/timecard",
                    },
                    {
                      _tag: "CSidebarNavItem",
                      name: "Total hours worked",
                      to: "/employees/total-hour-worked",
                    })
                  }
                }
                // #END#

                routes.push(nav[0]);
                if (nav.length > 1) {
                  routes.push(nav[1]);
                }
              }
            } 
            // else if (mod.backoffice.isMenu && mod.backoffice.isChild) {
            //   console.log("Inside Child")
            //   if (!settingCheck) {
            //     console.log("Inside Child settingCheck")
            //     if (!settings[0].enable) {
            //       console.log("Inside Child !settings[0].enable")
            //       let nav = _nav.filter(
            //         (itm) => itm.moduleName === "Edit general settings"
            //       );
            //       if (nav.length > 0) {
            //         console.log("Inside Child nav.length > 0")

            //         // Check Bacoffice Module Is Enabled Or Not For Reports
            //         if(nav[0].name === "Reports"){ 
            //           let mod = module.filter(itm => itm.backoffice.name === "View sales report")
            //           if(!mod[0].enable){
            //             nav.splice(1, 1);
            //           } else if(nav.filter(itm => itm.name == "Reports").length <= 0) {
            //             nav.push({
            //               _tag: "CSidebarNavDropdown",
            //               name: "Reports",
            //               moduleName: "View sales report",
            //               to: "/reports",
            //               icon: "cil-chart-pie",
            //               _children: [
            //                 {
            //                   _tag: "CSidebarNavItem",
            //                   name: "Sales summary",
            //                   to: "/reports/sales",
            //                 },
            //                 {
            //                   _tag: "CSidebarNavItem",
            //                   name: "Sales by item",
            //                   to: "/reports/goods",
            //                 },
            //                 {
            //                   _tag: "CSidebarNavItem",
            //                   name: "Sales by category",
            //                   to: "/reports/categories",
            //                 },
            //                 {
            //                   _tag: "CSidebarNavItem",
            //                   name: "Sales by employee",
            //                   to: "/reports/employee",
            //                 },
            //                 {
            //                   _tag: "CSidebarNavItem",
            //                   name: "Sales by payment type",
            //                   to: "/reports/pay-types",
            //                 },
            //                 {
            //                   _tag: "CSidebarNavItem",
            //                   name: "Receipts",
            //                   to: "/reports/average",
            //                 },
            //                 {
            //                   _tag: "CSidebarNavItem",
            //                   name: "Sales by modifier",
            //                   to: "/reports/modifiers",
            //                 },
            //                 {
            //                   _tag: "CSidebarNavItem",
            //                   name: "Discounts",
            //                   to: "/reports/discounts",
            //                 },
            //                 {
            //                   _tag: "CSidebarNavItem",
            //                   name: "Taxes",
            //                   to: "/reports/tax",
            //                 },
            //                 {
            //                   _tag: "CSidebarNavItem",
            //                   name: "Shifts",
            //                   to: "/reports/shift",
            //                 },
            //               ],
            //             })
            //           }
            //         }
            //         // #END#

            //          // Employees Features
            //           if(nav[0].name === "Employees"){
            //             let timeClok = user.features.filter(ftr => ftr.feature.name === "Time clock")
            //             if(!timeClok[0].enable){
            //               nav[0]._children.splice(2, 2);
            //             } else if(nav[0]._children.filter(ch => ch.name === "Timecards").length <= 0){
            //               nav[0]._children.push({
            //                 _tag: "CSidebarNavItem",
            //                 name: "Timecards",
            //                 to: "/employees/timecard",
            //               },
            //               {
            //                 _tag: "CSidebarNavItem",
            //                 name: "Total hours worked",
            //                 to: "/employees/total-hour-worked",
            //               })
            //             }
            //           }
            //         // #END#

            //         // Shifts Feature Done
            //           if(nav[0].name === "Reports"){
            //             let shift = user.features.filter(ftr => ftr.feature.name === "Shifts")
                        
            //             if(!shift[0].enable){
            //               nav[0]._children.splice(9, 1);
            //             } else if(nav[0]._children.filter(ch => ch.name === "Shifts").length <= 0){
            //               nav[0]._children.push({
            //                 _tag: "CSidebarNavItem",
            //                 name: "Shifts",
            //                 to: "/reports/shift",
            //               })
            //             }
            //           }
            //         // #END#
            //         routes.push(nav[0]);
            //         settingCheck = true;
            //       }
            //     }
            //   }
            // }
          }
        }
        setNavigation(routes);
      }
    }
  }, [user]);
  return !LoginCheck() ? (
    <Redirect exact to="/login" />
  ) : (
    <CSidebar
      show={show}
      unfoldable
      onShowChange={(val) => dispatch(sidebarToggle(val))}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img
          src={"logo/logo.png"}
          className="c-sidebar-brand-full"
          alt="kyrio POS"
          style={{ width: "50%", height: "100%" }}
        />
        <img
          src={"logo/mini_logo.png"}
          className="c-sidebar-brand-minimized"
          alt="kyrio POS"
          style={{ width: "50%", height: "50%" }}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
