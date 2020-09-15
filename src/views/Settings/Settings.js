import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CListGroup,
  CListGroupItem,
  CRow,
  CTabContent,
  CTabPane,
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
import { get_stores } from "../../actions/settings/storeActions";
// import { get_category_list } from "../../actions/items/categoryActions";
import {
  get_tax_category_list,
  get_taxes_type,
  get_taxes_option,
  get_item_taxes,
} from "../../actions/settings/taxesActions";
import { get_kitchen_printers } from "../../actions/settings/kitchenPrinterActions";
import { get_payment_types } from "../../actions/settings/paymentTypesActions";

import Taxes from "./taxes/Taxes.jsx";
const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const features = useSelector((state) => state.auth.user.roleData.features);
  const kitchenPrinter = useSelector(
    (state) => state.settingReducers.kitchenPrinterReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_stores());
    // dispatch(get_category_list())
    dispatch(get_tax_category_list());
    dispatch(get_taxes_type());
    dispatch(get_taxes_option());
    dispatch(get_item_taxes());
    dispatch(get_payment_types());
    if (
      kitchenPrinter.kitchen_printers == undefined ||
      kitchenPrinter.kitchen_printers.length === 0
    ) {
      dispatch(get_kitchen_printers());
    }
  }, []);

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
                    <CListGroupItem
                      onClick={() => setActiveTab(0)}
                      action
                      active={activeTab === 0}
                      style={{ paddingLeft: "40px" }}
                    >
                      General
                    </CListGroupItem>
                    <CListGroupItem
                      onClick={() => setActiveTab(1)}
                      action
                      active={activeTab === 1}
                      style={{ paddingLeft: "40px" }}
                    >
                      Billing &amp; subscriptions
                    </CListGroupItem>
                    <CListGroupItem
                      onClick={() => setActiveTab(2)}
                      action
                      active={activeTab === 2}
                      style={{ paddingLeft: "40px" }}
                    >
                      Payment types
                    </CListGroupItem>
                    <CListGroupItem
                      onClick={() => setActiveTab(3)}
                      action
                      active={activeTab === 3}
                      style={{ paddingLeft: "40px" }}
                    >
                      Loyalty
                    </CListGroupItem>
                    <CListGroupItem
                      onClick={() => setActiveTab(4)}
                      action
                      active={activeTab === 4}
                      style={{ paddingLeft: "40px" }}
                    >
                      Taxes
                    </CListGroupItem>
                    <CListGroupItem
                      onClick={() => setActiveTab(5)}
                      action
                      active={activeTab === 5}
                      style={{ paddingLeft: "40px" }}
                    >
                      Receipt
                    </CListGroupItem>
                    <CListGroupItem
                      onClick={() => setActiveTab(6)}
                      action
                      active={activeTab === 6}
                      style={{ paddingLeft: "40px" }}
                    >
                      Open tickets
                    </CListGroupItem>
                    <CListGroupItem
                      onClick={() => setActiveTab(7)}
                      action
                      active={activeTab === 7}
                      style={{ paddingLeft: "40px" }}
                    >
                      Kitchen printers
                    </CListGroupItem>
                    <CListGroupItem
                      onClick={() => setActiveTab(8)}
                      action
                      active={activeTab === 8}
                      style={{ paddingLeft: "40px" }}
                    >
                      Dining options
                    </CListGroupItem>
                    <CListGroupItem action active={false}>
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
                    <CListGroupItem
                      onClick={() => setActiveTab(9)}
                      action
                      active={activeTab === 9}
                      style={{ paddingLeft: "40px" }}
                    >
                      Stores
                    </CListGroupItem>
                    <CListGroupItem
                      onClick={() => setActiveTab(10)}
                      action
                      active={activeTab === 10}
                      style={{ paddingLeft: "40px" }}
                    >
                      POS devices
                    </CListGroupItem>
                  </CListGroup>
                </CCol>
                <CCol xs="8">
                  <CTabContent>
                    <CTabPane active={activeTab === 0}>
                      <General />
                    </CTabPane>
                    <CTabPane active={activeTab === 1}>
                      <BillingSubscription />
                    </CTabPane>
                    <CTabPane active={activeTab === 2}>
                      <PaymentTypes />
                    </CTabPane>
                    <CTabPane active={activeTab === 3}>
                      <Loyalty />
                    </CTabPane>
                    <CTabPane active={activeTab === 4}>
                      <Taxes />
                    </CTabPane>
                    <CTabPane active={activeTab === 6}>
                      <OpenTickets />
                    </CTabPane>
                    <CTabPane active={activeTab === 7}>
                      <KitchenPrinter />
                    </CTabPane>
                    <CTabPane active={activeTab === 8}>
                      <DiningOptions />
                    </CTabPane>
                    <CTabPane active={activeTab === 9}>
                      <Store />
                    </CTabPane>
                    <CTabPane active={activeTab === 10}>
                      <PosDevice />
                    </CTabPane>
                  </CTabContent>
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
