import React, { useEffect, useState } from "react";
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";
const ConformationAlert = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    props.hideAlert();
  };

  return (
    <CModal show={props.show_alert} onClose={toggle}>
      <CModalHeader closeButton>{props.heading}</CModalHeader>
      <CModalBody>{props.section}</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={toggle}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={props.buttonAction}>
          {" "}
          {props.button_text}
        </CButton>{" "}
      </CModalFooter>
    </CModal>
  );
};
export default ConformationAlert;
