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
import { get_loyalty } from "../../actions/settings/loyaltyActions";
import Taxes from "./taxes/Taxes.jsx";
import Receipt from "./receipt/Receipt.js";
const Settings = () => {
  // featuresReducer
  const [activeTab, setActiveTab] = useState(0);
  const [storeId, setStoreId] = useState();
  const features = useSelector((state) => state.auth.user.roleData.features);
  // const features = useSelector((state) => state.auth.user.roleData.features);
  const auth = useSelector((state) => state.auth);
  const kitchenPrinter = useSelector(
    (state) => state.settingReducers.kitchenPrinterReducer
  );

  // const allowBackoffice = useSelector(
  //   (state) => state.settingReducers.featuresReducer.setting_features
  // )
  const settings = useSelector((state) => state.auth.user.settings);
  console.log("settings", settings);
  useEffect(() => {
    setStoreId(auth.user.stores[0] ? auth.user.stores[0]._id : "");
  }, [auth]);

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
      kitchenPrinter.kitchen_printers === undefined ||
      kitchenPrinter.kitchen_printers.length === 0
    ) {
      dispatch(get_kitchen_printers());
    }
  }, []);
  useEffect(() => {
    if (storeId !== "" && typeof storeId !== "undefined") {
      dispatch(get_loyalty(storeId));
    }
  }, [storeId]);
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
                          <CListGroupItem
                            onClick={() => setActiveTab(index)}
                            action
                            active={activeTab === index}
                            style={{ paddingLeft: "40px" }}
                            key={index}
                          >
                            {item.moduleName}
                          </CListGroupItem>
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
                    <CTabPane active={activeTab === 5}>
                      <Receipt />
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
                    <CTabPane active={activeTab === 10}>
                      <Store />
                    </CTabPane>
                    <CTabPane active={activeTab === 11}>
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
