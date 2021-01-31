import React, { useState, useEffect, useCallback } from "react";
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
  CInvalidFeedback,
  CInputRadio,
  CListGroup,
  CListGroupItem,
  CSwitch,
  CImg,
  CSelect,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ShowUploadFileErrors = (props) => {
  const goBack = () => {
    props.goBack();
  };
  return (
    <React.Fragment>
      <CRow>
        <CCol xs="8" sm="8">
          <CCard>
            <CCardHeader style={{ display: "grid" }}>
              <h4>Import errors</h4>
              <div>
                <CIcon
                  name="cil-warning"
                  style={{
                    float: "left",
                    width: "1.5rem",
                    height: "2rem",
                    color: "#FF5050",
                  }}
                />
                <h7
                  style={{
                    display: "grid",
                    float: "left",
                    marginLeft: "5px",
                    color: "#D32F2F",
                    fontFamily: "Roboto, 'Helvetica Neue', sans-serif",
                    verticalAlign: "top",
                    fontSize: "12px",
                    lineHeight: "1.428571429",
                  }}
                >
                  Errors found:
                  {props.sku.length + props.handle.length}
                  <small style={{ color: "rgba(0, 0, 0, 0.87)" }}>
                    Fix errors in the importing file and try downloading again.
                  </small>
                </h7>
              </div>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" sm="12">
                  <CListGroup>
                    {props.handle.length > 0 ? (
                      <CListGroupItem
                        style={{ border: "none", marginLeft: "-19px" }}
                      >
                        <div>
                          <CIcon
                            name="cil-warning"
                            style={{
                              float: "left",
                              width: "1.5rem",
                              height: "2rem",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            width: "45%",
                            float: "left",
                            marginLeft: "5px",
                            fontWeight: "bold",
                            fontFamily: "Roboto, 'Helvetica Neue', sans-serif",
                            verticalAlign: "top",
                            fontSize: "12px",
                            lineHeight: "1.428571429",
                          }}
                        >
                          "Handle" field cannot be blank for an item with
                          variants.{" "}
                        </div>
                        <div
                          style={{
                            float: "left",
                            fontWeight: "bold",
                            fontFamily: "Roboto, 'Helvetica Neue', sans-serif",
                            verticalAlign: "top",
                            fontSize: "12px",
                            lineHeight: "1.428571429",
                          }}
                        >
                          {props.handle.map((item) => {
                            return `Cell:A${item.index}`;
                          })}
                        </div>
                      </CListGroupItem>
                    ) : null}
                    {props.sku.length > 0 ? (
                      <CListGroupItem>
                        <p style={{ width: "45%", float: "left" }}>
                          "Sku" field cannot be blank for an item with variants.{" "}
                        </p>
                        {props.sku.map((item) => {
                          return `Cell:B${item.index}`;
                        })}
                      </CListGroupItem>
                    ) : null}
                  </CListGroup>
                </CCol>
              </CRow>
            </CCardBody>
            <CRow>
              <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <a
                  rel={"external"}
                  href="https://help.loyverse.com/help/importing-and-exporting?utm_source=Back%20Office&utm_medium=Exporting%20and%20Importing"
                  target="_blank"
                >
                  <CButton
                    block
                    variant="outline"
                    className="btn-pill"
                    color="secondary"
                  >
                    Help
                  </CButton>
                </a>
              </CCol>
              <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block
                  variant="outline"
                  className="btn-pill"
                  color="secondary"
                  onClick={goBack}
                >
                  Cancel
                </CButton>
              </CCol>
              <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block
                  type="button"
                  variant="outline"
                  className="btn-pill"
                  color="success"
                  onClick={props.uploadFileScreen}
                >
                  Retry
                </CButton>
              </CCol>
            </CRow>
          </CCard>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};
export default ShowUploadFileErrors;
