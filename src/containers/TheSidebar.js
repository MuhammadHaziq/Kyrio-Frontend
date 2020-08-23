import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { MESSAGE } from "../constants/ActionTypes";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem
} from '@coreui/react'
import { sidebarToggle } from "../actions/settingsAction";
// sidebar nav config
import _nav from './_nav';
import LoginCheck from "../views/Authorization/LoginCheck";
var _ = require('lodash');

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector(state => state.settings.sidebarShow)
  const user = useSelector(state => state.auth.user);
  const [navigation, setNavigation] = useState([]);
  useEffect(()=>{
    if(typeof user.roleData !== "undefined"){
      if(!user.roleData.allowBackoffice.enable){
        let msg = {
          open: true,
          message: "Sorry you do not have access to backoffice!",
          object: {},
          error: true
      }
        dispatch({ type: MESSAGE, data: msg });
      }else{
        let module = user.roleData.allowBackoffice.modules;
        let settings = module.filter(itm => itm.moduleName === "Edit general settings");
        let routes = [];
        let settingCheck = false;

        for(const mod of module){
          if(mod.enable){
            if(mod.isMenu && !mod.isChild){
              console.log("test2")
              let nav = _nav.filter(itm=> itm.moduleName === mod.moduleName);
              if(nav.length > 0){
                routes.push(nav[0]);
                if(nav.length > 1){
                  routes.push(nav[1]);
                }
              }
            }
             else if(mod.isMenu && mod.isChild){
              if(!settingCheck){
                if(!settings[0].enable){
                  let nav = _nav.filter(itm=> itm.moduleName === "Edit general settings");
                  if(nav.length > 0){
                    routes.push(nav[0]);
                    settingCheck = true;
                  }
                }
              }
            }
          }
        } 
        setNavigation(routes)
      }
    }
    
  },[user]);
  
  return (
    !LoginCheck() ? <Redirect exact to="/login" /> :
    <CSidebar
      show={show}
      unfoldable
      onShowChange={(val) => dispatch(sidebarToggle(val))}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
          <img
            src={'logo/logo.png'}
            className="c-sidebar-brand-full"
            alt="kyrio POS"
            style={{width: "50%", height: "100%"}}
          />
          <img
            src={'logo/mini_logo.png'}
            className="c-sidebar-brand-minimized"
            alt="kyrio POS"
            style={{width: "50%", height: "50%"}}
          />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
          />

      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
