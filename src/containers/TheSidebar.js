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
        
        let routes = [];

        for (const mod of module) {
          if (mod.enable) {
            if (mod.backoffice.isMenu && !mod.backoffice.isChild) {
              let nav = _nav.filter((itm) => itm.module === mod.backoffice.name);

              if (nav.length > 0) {
                
                if(nav.filter(itm => itm.module ==  mod.backoffice.name).length <= 0){
                  nav.push(_nav.filter(itm => itm.module ==  mod.backoffice.name))
                }
                if(nav[0].name === "Reports"){
                let shift = user.features.filter(ftr => ftr.feature.name === "Shifts")
                  if(!shift[0].enable){
                    let index = nav[0]._children.findIndex(e => e.name === "Shifts")
                    if(index >= 0){
                      nav[0]._children.splice(index, 1);
                    }
                    
                  } else if(nav[0]._children.filter(ch => ch.name === "Shifts").length <= 0){
                    nav[0]._children.push({
                      _tag: "CSidebarNavItem",
                      name: "Shifts",
                      to: "/reports/shift",
                    })
                  }
                }
                if(nav[0].name === "Employees"){
                  let timeClok = user.features.filter(ftr => ftr.feature.name === "Time clock")
                  if(!timeClok[0].enable){
                    let index = nav[0]._children.findIndex(e => e.name === "Timecards")
                    if(index >= 0){
                      nav[0]._children.splice(index, 1);
                    }
                    index = nav[0]._children.findIndex(e => e.name === "Total hours worked")
                    if(index >= 0){
                      nav[0]._children.splice(index, 1);
                    }
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

                routes.push(nav[0]);
                if (nav.length > 1) {
                  routes.push(nav[1]);
                }
              }
            } else if (mod.backoffice.isMenu && mod.backoffice.isChild) {
              let nav = _nav.filter((itm) => itm.module === "Edit general settings");
                if(routes.filter(itm => itm.name == "Settings").length <= 0){
                  nav.push(_nav.filter(itm => itm.name == "Settings")[0])
                  routes.push(nav[0]);
                }
            }
          } else {
              let nav = _nav.filter((itm) => itm.module === mod.backoffice.name);
              if (nav.length > 0) {
                  nav.splice(nav.findIndex(e => e.module === mod.backoffice.name),1);
              }
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
