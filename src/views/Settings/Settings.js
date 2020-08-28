import React, { useState } from "react";
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
import BillingSubscription from './BillingSubscriptions/BillingSubscription.jsx'
import { useSelector } from "react-redux";
import LoginCheck from "../Authorization/LoginCheck";

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const features = useSelector((state) => state.auth.user.roleData.features);
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
                      <p>
                        Ut ut do pariatur aliquip aliqua aliquip exercitation do
                        nostrud commodo reprehenderit aute ipsum voluptate.
                        Irure Lorem et laboris nostrud amet cupidatat cupidatat
                        anim do ut velit mollit consequat enim tempor.
                        Consectetur est minim nostrud nostrud consectetur irure
                        labore voluptate irure. Ipsum id Lorem sit sint
                        voluptate est pariatur eu ad cupidatat et deserunt culpa
                        sit eiusmod deserunt. Consectetur et fugiat anim do
                        eiusmod aliquip nulla laborum elit adipisicing pariatur
                        cillum.
                      </p>
                    </CTabPane>
                    <CTabPane active={activeTab === 3}>
                      <p>
                        Irure enim occaecat labore sit qui aliquip reprehenderit
                        amet velit. Deserunt ullamco ex elit nostrud ut dolore
                        nisi officia magna sit occaecat laboris sunt dolor. Nisi
                        eu minim cillum occaecat aute est cupidatat aliqua
                        labore aute occaecat ea aliquip sunt amet. Aute mollit
                        dolor ut exercitation irure commodo non amet consectetur
                        quis amet culpa. Quis ullamco nisi amet qui aute irure
                        eu. Magna labore dolor quis ex labore id nostrud
                        deserunt dolor eiusmod eu pariatur culpa mollit in
                        irure.
                      </p>
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
