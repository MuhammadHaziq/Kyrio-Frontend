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
import { CIcon } from "@coreui/icons-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ShowUploadFileErrors = (props) => {
  const goBack = () => {
    props.goBack();
  };
  const skuErrorsCount =
    props.errors.length > 0
      ? props.errors[0].skuErrors !== undefined
        ? props.errors[0].skuErrors.length > 0
          ? props.errors[0].skuErrors.length
          : 0
        : 0
      : 0;
  const groupSkuErrors =
    props.errors.length > 0
      ? props.errors[0].groupSkuErrors !== undefined
        ? props.errors[0].groupSkuErrors.length > 0
          ? props.errors[0].groupSkuErrors.length
          : 0
        : 0
      : 0;
  const handleErrorsCount =
    props.errors.length > 0
      ? props.errors[0].handleErrors !== undefined
        ? props.errors[0].handleErrors.length > 0
          ? props.errors[0].handleErrors.length
          : 0
        : 0
      : 0;
  const groupHandleErrors =
    props.errors.length > 0
      ? props.errors[0].groupHandleErrors !== undefined
        ? props.errors[0].groupHandleErrors.length > 0
          ? props.errors[0].groupHandleErrors.length
          : 0
        : 0
      : 0;
  const groupNameErrors =
    props.errors.length > 0
      ? props.errors[0].groupNameErrors !== undefined
        ? props.errors[0].groupNameErrors.length > 0
          ? props.errors[0].groupNameErrors.length
          : 0
        : 0
      : 0;
  const handleLengthCount =
    props.errors.length > 0
      ? props.errors[0].handleLength !== undefined
        ? props.errors[0].handleLength.length > 0
          ? props.errors[0].handleLength.length
          : 0
        : 0
      : 0;
  const NameLengthCount =
    props.errors.length > 0
      ? props.errors[0].NameLength !== undefined
        ? props.errors[0].NameLength.length > 0
          ? props.errors[0].NameLength.length
          : 0
        : 0
      : 0;
  const messageError =
    props.errors !== undefined
      ? props.errors.message !== undefined && props.errors.message !== null
        ? props.errors.message
        : ""
      : "";

  const totalErrors =
    Number(skuErrorsCount) +
    Number(handleErrorsCount) +
    Number(handleLengthCount) +
    Number(NameLengthCount) +
    Number(handleErrorsCount) +
    Number(groupHandleErrors) +
    Number(groupNameErrors);
  /*
    {props.sku.length + props.handle.length + totalErrors}*/
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
                  {totalErrors}
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
                    {messageError !== undefined &&
                    messageError !== null &&
                    messageError !== "" ? (
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
                          {messageError}
                        </div>
                      </CListGroupItem>
                    ) : null}
                    {props.errors.length > 0 ? (
                      props.errors[0].groupHandleErrors !== undefined &&
                      props.errors[0].groupHandleErrors.length > 0 ? (
                        <React.Fragment>
                          <CListGroupItem>
                            <CRow>
                              <CCol sm="4" lg="4" md="4">
                                <p style={{ float: "left" }}>
                                  "Handle" field cannot be blank for an item
                                  with variants.{" "}
                                </p>
                              </CCol>
                              <CCol sm="8" lg="8" md="8">
                                <div
                                  style={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",

                                    height: "1.2em",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <b>Cells: </b>{" "}
                                  {props.errors[0].groupHandleErrors.map(
                                    (item) => {
                                      return `A${item.index + 2}, `;
                                    }
                                  )}
                                </div>
                              </CCol>
                            </CRow>
                          </CListGroupItem>
                        </React.Fragment>
                      ) : null
                    ) : null}

                    {props.errors.length > 0 ? (
                      props.errors[0].groupSkuErrors !== undefined &&
                      props.errors[0].groupSkuErrors.length > 0 ? (
                        <React.Fragment>
                          <CListGroupItem>
                            <CRow>
                              <CCol sm="4" lg="4" md="4">
                                <p style={{ float: "left" }}>
                                  "SKU" field cannot be blank for an item.{" "}
                                </p>
                              </CCol>
                              <CCol sm="8" lg="8" md="8">
                                <div
                                  style={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",

                                    height: "1.2em",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <b>Cells: </b>{" "}
                                  {props.errors[0].groupSkuErrors.map(
                                    (item) => {
                                      return `B${item.index + 2}, `;
                                    }
                                  )}
                                </div>
                              </CCol>
                            </CRow>
                          </CListGroupItem>
                        </React.Fragment>
                      ) : null
                    ) : null}
                    {props.errors.length > 0 ? (
                      props.errors[0].skuErrors !== undefined &&
                      props.errors[0].skuErrors.length > 0 ? (
                        <React.Fragment>
                          <CListGroupItem>
                            <CRow>
                              <CCol sm="4" lg="4" md="4">
                                <p style={{ float: "left" }}>
                                  Different Items Cannot Have the Same "SKU"
                                </p>
                              </CCol>
                              <CCol sm="8" lg="8" md="8">
                                <div
                                  style={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",

                                    height: "1.2em",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <b>Cells: </b>{" "}
                                  {props.errors[0].skuErrors.map((item) => {
                                    return `B${item.index + 2}, `;
                                  })}
                                </div>
                              </CCol>
                            </CRow>
                          </CListGroupItem>
                        </React.Fragment>
                      ) : null
                    ) : null}
                    {props.errors.length > 0 ? (
                      props.errors[0].handleErrors !== undefined &&
                      props.errors[0].handleErrors.length > 0 ? (
                        <React.Fragment>
                          <CListGroupItem>
                            <CRow>
                              <CCol sm="4" lg="4" md="4">
                                <p style={{ float: "left" }}>
                                  Different Items Cannot Have the Same "Handles"
                                </p>
                              </CCol>
                              <CCol sm="8" lg="8" md="8">
                                <div
                                  style={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",

                                    height: "1.2em",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <b>Cells: </b>{" "}
                                  {props.errors[0].handleErrors.map((item) => {
                                    return `A${item.index + 2}, `;
                                  })}
                                </div>
                              </CCol>
                            </CRow>
                          </CListGroupItem>
                        </React.Fragment>
                      ) : null
                    ) : null}
                    {props.errors.length > 0 ? (
                      props.errors[0].handleLength !== undefined &&
                      props.errors[0].handleLength.length > 0 ? (
                        <React.Fragment>
                          <CListGroupItem>
                            <CRow>
                              <CCol sm="4" lg="4" md="4">
                                <p style={{ float: "left" }}>
                                  "Handles" Fields cannot contain more than 72
                                  charactores
                                </p>
                              </CCol>
                              <CCol sm="8" lg="8" md="8">
                                <div
                                  style={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",

                                    height: "1.2em",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <b>Cells: </b>{" "}
                                  {props.errors[0].handleLength.map((item) => {
                                    return `A${item.index + 2}, `;
                                  })}
                                </div>
                              </CCol>
                            </CRow>
                          </CListGroupItem>
                        </React.Fragment>
                      ) : null
                    ) : null}
                    {props.errors.length > 0 ? (
                      props.errors[0].groupNameErrors !== undefined &&
                      props.errors[0].groupNameErrors.length > 0 ? (
                        <React.Fragment>
                          <CListGroupItem>
                            <CRow>
                              <CCol sm="4" lg="4" md="4">
                                <p style={{ float: "left" }}>
                                  "Name" field cannot be blank for an item.{" "}
                                </p>
                              </CCol>
                              <CCol sm="8" lg="8" md="8">
                                <div
                                  style={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",

                                    height: "1.2em",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <b>Cells: </b>{" "}
                                  {props.errors[0].groupNameErrors.map(
                                    (item) => {
                                      return `C${item.index + 2}, `;
                                    }
                                  )}
                                </div>
                              </CCol>
                            </CRow>
                          </CListGroupItem>
                        </React.Fragment>
                      ) : null
                    ) : null}
                    {props.errors.length > 0 ? (
                      props.errors[0].NameLength !== undefined &&
                      props.errors[0].NameLength.length > 0 ? (
                        <React.Fragment>
                          <CListGroupItem>
                            <CRow>
                              <CCol sm="4" lg="4" md="4">
                                <p style={{ float: "left" }}>
                                  "Name" Fields cannot contain more than 64
                                  charactores
                                </p>
                              </CCol>
                              <CCol sm="8" lg="8" md="8">
                                <div
                                  style={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",

                                    height: "1.2em",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <b>Cells: </b>{" "}
                                  {props.errors[0].NameLength.map((item) => {
                                    return `C${item.index + 2}, `;
                                  })}
                                </div>
                              </CCol>
                            </CRow>
                          </CListGroupItem>
                        </React.Fragment>
                      ) : null
                    ) : null}
                  </CListGroup>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CRow>
                <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                  <CButton
                    block
                    variant="outline"
                    className="btn-pill"
                    color="danger"
                    onClick={goBack}
                  >
                    BACK
                  </CButton>
                </CCol>
                <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
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
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};
export default ShowUploadFileErrors;
