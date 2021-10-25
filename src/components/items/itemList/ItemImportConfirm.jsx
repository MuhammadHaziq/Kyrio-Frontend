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
  CCardFooter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ItemImportConfirm = (props) => {
  const goBack = () => {
    props.goBack();
  };
  const confirmMessage =
    props.message !== undefined && props.message !== "" ? props.message : "";
  /*
    {props.sku.length + props.handle.length + totalErrors}*/
  return (
    <React.Fragment>
      <CRow>
        <CCol xs="8" sm="8">
          <CCard>
            <CCardHeader style={{ display: "grid" }}>
              <h4>Confirm import</h4>
              <div>
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
                  Please confirm the changes. By continuing you will not be able
                  to return to the previous list of items.
                </h7>
              </div>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" sm="12">
                  <CListGroup>
                    {props.loading !== undefined &&
                    props.loading !== null &&
                    props.loading !== false
                      ? "Loading.."
                      : null}
                    {confirmMessage !== undefined &&
                    confirmMessage !== null &&
                    confirmMessage !== "" ? (
                      <CListGroupItem
                        style={{ border: "none", marginLeft: "-19px" }}
                      >
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
                          {confirmMessage}
                        </div>
                      </CListGroupItem>
                    ) : null}
                  </CListGroup>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CRow>
                <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                  <Link
                    block
                    variant="outline"
                    className="btn-pill"
                    color="danger"
                    onClick={goBack}
                  >
                    HELP
                  </Link>
                </CCol>
                <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                  <CButton
                    block
                    variant="outline"
                    className="btn-pill"
                    color="danger"
                    onClick={goBack}
                  >
                    CANCEL
                  </CButton>
                </CCol>
                <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                  <CButton
                    block
                    type="button"
                    variant="outline"
                    className="btn-pill"
                    color="success"
                    onClick={props.upload}
                  >
                    CONFIRM IMPORT
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
export default ItemImportConfirm;
