import React, { useEffect, useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
const SubscriptionModel = (props) => {
  return (
    <React.Fragment>
      <CModal show={props.show} onClose={props.toggle}>
        <CModalHeader closeButton> {props.title} </CModalHeader>{" "}
        <CModalBody> {props.message} </CModalBody>{" "}
        <CModalFooter>
          <CButton color="primary" shap="pill" onClick={props.toggle}>
            {" "}
            {props.buttonText}{" "}
          </CButton>{" "}
          <CButton color="secondary" shap="pill" onClick={props.toggle}>
            Cancel{" "}
          </CButton>{" "}
        </CModalFooter>{" "}
      </CModal>{" "}
    </React.Fragment>
  );
};

export default SubscriptionModel;
