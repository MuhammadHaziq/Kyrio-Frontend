import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CListGroup,
  CListGroupItem,
  CRow,
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
import KitchenPrinter from "./kitchenPrinter/KitchenPrinter.jsx";
import PaymentTypes from "./paymentTypes/PaymentTypes.jsx";
import OpenTickets from "./openTickets/OpenTickets.jsx";
import Loyalty from "./loyalty/Loyalty.jsx";
import Taxes from "./taxes/Taxes.jsx";
import Receipt from "./receipt/Receipt.js";
import settingRoutes from "./settingRoutes";
import { get_stores } from "../../actions/settings/storeActions";
import {
  HashRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

const Settings = () => {
  let { path, url } = useRouteMatch();
  const settings = useSelector((state) => state.auth.user.roleData.settings);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_stores());
  }, [dispatch]);

  return !LoginCheck() ? (
    <Redirect exact to="/login" />
  ) : (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol xs="4">
                  <CListGroup id="list-tab" role="tablist">
                    <CListGroupItem action active={false}>
                      <h5>
                        <MdSettings style={{ fontSize: "30px" }} />
                        {/* <strong>&nbsp;{t('Settings.settings')}</strong> */}
                        <strong>&nbsp;Settings</strong>
                        <br />
                        <small>
                          {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t('Settings.systemSettings')} */}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System
                          settings
                        </small>
                      </h5>
                    </CListGroupItem>
                    {(settings.settingModules || []).map((item, index) =>
                      index !== 9 ? (
                        item.enable === true ? (
                          <Link
                            key={index}
                            to={`${url}/${item.moduleName.replace(/\s/g, "")}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <CListGroupItem
                              style={{ paddingLeft: "40px" }}
                              key={index}
                            >
                              {item.moduleName}
                            </CListGroupItem>
                          </Link>
                        ) : (
                          ""
                        )
                      ) : (
                        <CListGroupItem action active={false} key={index}>
                          <h5>
                            <MdStore style={{ fontSize: "30px" }} />
                            <strong>&nbsp;Stores</strong>
                            <br />
                            <small>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Store
                              &amp; POS settings
                            </small>
                          </h5>
                        </CListGroupItem>
                      )
                    )}
                  </CListGroup>
                </CCol>
                <CCol xs="8">
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
    </>
  );
};

export default Settings;
// {settingRoutes.map(({ path, name, Component }, index) => {
//    return (
//      <Route
//        key={index}
//        path={`${url}/${path}`}
//        exact
//        name={name}
//        render={(props) => (
//          <CFade>
//            <Component {...props} />
//          </CFade>
//        )}
//      />
//    );
//  })}
