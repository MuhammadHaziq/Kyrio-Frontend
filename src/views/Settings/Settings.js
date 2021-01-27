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
  CSidebarNavItem,
  CListGroupItem,
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
  const [show, setShow] = useState(true);
  const [settingBar, setSettingBar] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_stores());
  }, [dispatch]);
  const setting = [];
  useEffect(() => {
    if (settings !== undefined && settings.settingModules) {
      (settings.settingModules || []).map((item, index) =>
        index !== 9
          ? item.enable === true
            ? setting.push({
                _tag: "CSidebarNavItem",
                name: item.moduleName,
                moduleName: item.moduleName,
                to: `${url}/${item.moduleName.replace(/\s/g, "")}`,
              })
            : ""
          : setting.push({
              _tag: "CSidebarNavItem",
              name: item.heading,
              icon: "cil-home",
            })
      );
      setSettingBar(setting);
    }
  }, [settings]);

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
                    <h5>
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
                    </h5>

                    <CSidebarNav>
                      <CCreateElement
                        items={settingBar}
                        components={{
                          CSidebarNavDivider,
                          CSidebarNavItem,
                        }}
                      />
                      {/*
                      <h5>
                        <MdStore style={{ fontSize: "30px" }} />
                        <strong>&nbsp;Stores</strong>
                        <br />
                        <small>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Store
                          &amp; POS settings
                        </small>
                      </h5>
                      */}
                    </CSidebarNav>
                  </CSidebar>
                </CListGroup>
              </CCol>
              <CCol xs="12" sm="12" md="8" lg="8">
                <HashRouter>
                  <Switch>
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
