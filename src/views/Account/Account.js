import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CInputGroup,
  CCardFooter,
  CInputGroupAppend,
  CInputGroupText,
  CSelect
} from "@coreui/react";
const Account = () => {
  return (
    <React.Fragment>
      <CRow className="justify-content-left">
        <CCol md="9" lg="7" xl="6">
          <CCard>
            <CCardHeader>
              <h4>
                <strong>Account</strong>
              </h4>
            </CCardHeader>

            <CCardBody>
              <CRow>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="store_name">Business Name</CLabel>
                    <CInputGroup>
                      <CInput
                        id="category_name"
                        name="category_name"
                        placeholder="Category Name"
                      />
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="email">Email</CLabel>
                    <CInputGroup>
                      <CInput
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                      <CInputGroupAppend>
                        <CButton
                          block
                          variant="outline"
                          className="btn btn-sm "
                          color="success"
                        >
                          CHANGE
                        </CButton>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="password">Password</CLabel>
                    <CInputGroup>
                      <CInput
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        autoComplete="new-password"
                      />
                      <CInputGroupAppend>
                        <CButton
                          block
                          variant="outline"
                          className="btn btn-sm "
                          color="success"
                        >
                          CHANGE
                        </CButton>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="timezone">Timezone</CLabel>
                    <CInputGroup>
                      <CSelect
                        type="select"
                        name="timezone"
                        id="timezone"
                        placeholder="Timezone"
                      >
                        <option value="">Please select</option>
                        <option value="1">
                          (UTC+05:00) Islamabad, Karachi
                        </option>
                        <option value="2">
                          (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi
                        </option>
                        <option value="3">
                          (UTC+05:30) Sri Jayawardenepura
                        </option>
                      </CSelect>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CRow>
                <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                  <CButton
                    block
                    variant="outline"
                    className="btn-pill pull-right"
                    color="danger"
                  >
                    CANCEL
                  </CButton>
                </CCol>
                <CCol
                  sm="6"
                  md="6"
                  xl="xl"
                  className="mb-3 mb-xl-0 form-actions"
                >
                  <CButton
                    block
                    type="submit"
                    variant="outline"
                    className="btn-pill pull-right"
                    color="success"
                  >
                    SAVE
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default Account;
