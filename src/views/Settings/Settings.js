import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CListGroup,
  CRow,
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavItem
} from "@coreui/react";
import { Redirect } from "react-router-dom";
import { MdSettings, MdStore } from "react-icons/md";
import General from "./General/General";
import BillingSubscription from "./BillingSubscriptions/BillingSubscription.jsx";
import { useSelector, useDispatch } from "react-redux";
import LoginCheck from "../Authorization/LoginCheck";
import Store from "./stores/Store.jsx";
import PosDevice from "./posDevices/PosDevice.jsx";
import DiningOptions from "./diningOption/DiningOptions.jsx";
// import DiningOptions2 from "./diningOption/DiningOptions2.jsx";
import KitchenPrinter from "./kitchenPrinter/KitchenPrinter.jsx";
import PaymentTypes from "./paymentTypes/PaymentTypes.jsx";
import OpenTickets from "./openTickets/OpenTickets.jsx";
import Loyalty from "./loyalty/Loyalty.jsx";
import Taxes from "./taxes/Taxes.jsx";
import Receipt from "./receipt/Receipt.js";
import { get_stores } from "../../actions/settings/storeActions";
import { HashRouter, Switch, Route, useRouteMatch } from "react-router-dom";

const Settings = () => {
  let { url } = useRouteMatch();
  const settings = useSelector((state) => state.auth.user.settings);
  const modules = useSelector((state) => state.auth.user.roleData.allowBackoffice.modules);
  const roleTitle = useSelector((state) => state.auth.user.roleData.title);
  
  const [settingCk, setSettingCk] = useState(modules.filter(mod => mod.backoffice.isMenu && mod.backoffice.isChild && mod.enable && mod.backoffice.title !== "Manage POS devices").length > 0);
  const [editSettingCk, setEditSettingCk] = useState(modules.filter(mod => mod.backoffice.isMenu && !mod.backoffice.isChild && mod.enable && mod.backoffice.title === "Edit general settings").length > 0);
  const [show, setShow] = useState(true);
  const [settingBar, setSettingBar] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_stores());
  }, [dispatch]);
  const setting = [];
  useEffect(() => {
    if (settings !== undefined && settings) {
      // mod.backoffice.isMenu && mod.backoffice.isChild
      if(modules.filter(mod => mod.backoffice.isMenu && mod.backoffice.isChild && mod.enable && mod.backoffice.title !== "Manage POS devices").length > 0){
        setSettingCk(true)
      } else {
        setSettingCk(false)
      }
      if(modules.filter(mod => mod.backoffice.isMenu && !mod.backoffice.isChild && mod.enable && mod.backoffice.title === "Edit general settings").length > 0){
        setEditSettingCk(true)
      } else {
        setEditSettingCk(false)
      }
      let storePOSCheck = modules.filter(mod => mod.backoffice.isMenu && mod.backoffice.isChild && mod.enable && mod.backoffice.title === "Manage POS devices").length > 0
      let settingCheck = modules.filter(mod => mod.backoffice.isMenu && mod.backoffice.isChild && mod.enable)
      let editSettingCheck = modules.filter(mod => mod.backoffice.isMenu && !mod.backoffice.isChild && mod.enable && mod.backoffice.title === "Edit general settings")
      if(settingCheck.length > 0 || editSettingCheck.length > 0){
        let generalSettings    = modules.find(mod=> mod.backoffice.title == "Edit general settings").enable
        let mngBilling         = modules.find(mod=> mod.backoffice.title == "Manage billing").enable
        let mngPaymentTypes    = modules.find(mod=> mod.backoffice.title == "Manage payment types").enable
        let mngLoyaltyProgram  = modules.find(mod=> mod.backoffice.title == "Manage loyalty program").enable
        let mngTaxes           = modules.find(mod=> mod.backoffice.title == "Manage taxes").enable
        let mngDiningOptions   = modules.find(mod=> mod.backoffice.title == "Manage dining options").enable
        let mngKitchenPrinters = modules.find(mod=> mod.backoffice.title == "Manage kitchen printers").enable
        let mngPOSDevices      = modules.find(mod=> mod.backoffice.title == "Manage POS devices").enable
        
        if(!generalSettings){
          settings.find(st => st.module.title === "Features").enable = false
          settings.find(st => st.module.title === "Receipt").enable = false
          settings.find(st => st.module.title === "Open tickets").enable = false
        } else {
          settings.find(st => st.module.title === "Features").enable = true
          settings.find(st => st.module.title === "Receipt").enable = true
          if(settings.find(st => st.module.title === "Open tickets").enable){
            settings.find(st => st.module.title === "Open tickets").enable = true
          } else {
            settings.find(st => st.module.title === "Open tickets").enable = false
          }
        }
        if(!mngBilling){
          settings.find(st => st.module.title === "Billing & subscriptions").enable = false
        } else {
          settings.find(st => st.module.title === "Billing & subscriptions").enable = true
        }
        if(!mngPaymentTypes){
          settings.find(st => st.module.title === "Payment types").enable = false
        } else {
          settings.find(st => st.module.title === "Payment types").enable = true
        }
        if(!mngLoyaltyProgram){
          settings.find(st => st.module.title === "Loyalty").enable = false
        } else {
          settings.find(st => st.module.title === "Loyalty").enable = true
        }
        if(!mngTaxes){
          settings.find(st => st.module.title === "Taxes").enable = false
        } else {
          settings.find(st => st.module.title === "Taxes").enable = true
        }
        if(!mngDiningOptions){
          settings.find(st => st.module.title === "Dining options").enable = false
        } else {
          if(settings.find(st => st.module.title === "Dining options").enable){
             settings.find(st => st.module.title === "Dining options").enable = true
          } else {
             settings.find(st => st.module.title === "Dining options").enable = false
          }
        }
        if(!mngKitchenPrinters){
          settings.find(st => st.module.title === "Kitchen printers").enable = false
        } else {
          if(settings.find(st => st.module.title === "Kitchen printers").enable){
            settings.find(st => st.module.title === "Kitchen printers").enable = true
          } else {
            settings.find(st => st.module.title === "Kitchen printers").enable = false
          }
        }
        if(!mngPOSDevices){
          settings.find(st => st.module.title === "POS devices").enable = false
        } else {
          settings.find(st => st.module.title === "POS devices").enable = true
        }
        if(roleTitle !== "Owner"){
          settings.find(st => st.module.title === "Stores").enable = false
        } else {
          settings.find(st => st.module.title === "Stores").enable = true
        }
        
        (settings || []).map((item, index) => {
          return index !== 9
            ? item.enable === true
              ? setting.push({
                  _tag: "CSidebarNavItem",
                  name: item.module.title,
                  module: item.module.title,
                  to: `${url}/${item.module.title.replace(/\s/g, "")}`,
                })
              : ""
            : storePOSCheck || roleTitle === "Owner" ? setting.push({
                _tag: "CSidebarNavItem",
                name: <>{item.module.heading}<br/>{item.module.span}</>,
                icon:  <MdStore style={{ fontSize: "30px", margin: "5px" }} />,
              }) : ""
            });
        setSettingBar(setting);
      }
    }
  }, [settings,modules]);

  return !LoginCheck() ? (
    <Redirect exact to="/login" />
  ) : (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardBody>
            <CRow>
              <CCol xs="12" sm="12" md="4" lg="4">
                <CListGroup id="list-tab" role="tablist">
                  <CSidebar
                    show={show}
                    colorScheme="light"
                    size="lg"
                    fixed={false}
                    onShowChange={() => setShow(!show)}
                    style={{ width: "100%" }}
                  >
                    {settingCk || editSettingCk ?
                    (<h5>
                      <MdSettings style={{ fontSize: "30px", margin: "5px" }} />
                      {/* <strong>&nbsp;{t('Settings.settings')}</strong> */}
                      <strong>&nbsp;Settings</strong>
                      <small
                        style={{
                          marginTop: "-10px",
                          display: "grid",
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System
                        settings
                      </small>
                    </h5>) : ""}

                    <CSidebarNav>
                      <CCreateElement
                        style={{borderBootom:'16px'}}
                        items={settingBar}
                        components={{
                          CSidebarNavDivider,
                          CSidebarNavItem,
                        }}
                      />
                    </CSidebarNav>
                  </CSidebar>
                </CListGroup>
              </CCol>
              <CCol xs="12" sm="12" md="8" lg="8">
                <HashRouter>
                  <Switch>
                    <Route
                      path={`${url}`}
                      exact
                      name="Setting Features"
                      render={(props) => <General {...props} />}
                    />
                    <Route
                      path={`${url}/Features`}
                      exact
                      name="Setting Features"
                      render={(props) => <General {...props} />}
                    />
                    <Route
                      path={`${url}/Billing&subscriptions`}
                      exact
                      name={"Billing Subscription"}
                      render={(props) => <BillingSubscription {...props} />}
                    />
                    <Route
                      path={`${url}/PaymentTypes`}
                      exact
                      name="Payment Types"
                      render={(props) => <PaymentTypes {...props} />}
                    />
                    <Route
                      path={`${url}/Loyalty`}
                      exact
                      name="Loyalty"
                      render={(props) => <Loyalty {...props} />}
                    />
                    <Route
                      path={`${url}/Taxes`}
                      exact
                      name="Taxes"
                      render={(props) => <Taxes {...props} />}
                    />
                    <Route
                      path={`${url}/Receipt`}
                      exact
                      name="Receipt"
                      render={(props) => <Receipt {...props} />}
                    />
                    <Route
                      path={`${url}/OpenTickets`}
                      exact
                      name="Open Tickets"
                      render={(props) => <OpenTickets {...props} />}
                    />
                    <Route
                      path={`${url}/KitchenPrinters`}
                      exact
                      name="Kitchen Printer"
                      render={(props) => <KitchenPrinter {...props} />}
                    />
                    <Route
                      path={`${url}/DiningOptions`}
                      exact
                      name="Dining Options"
                      render={(props) => <DiningOptions {...props} />}
                    />

                    <Route
                      path={`${url}/Stores`}
                      exact
                      name="Stores"
                      render={(props) => <Store {...props} />}
                    />
                    <Route
                      path={`${url}/PosDevices`}
                      exact
                      name="Pos Devices"
                      render={(props) => <PosDevice {...props} />}
                    />
                  </Switch>
                </HashRouter>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Settings;
