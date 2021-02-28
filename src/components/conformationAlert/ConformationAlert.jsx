import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { CButton } from "@coreui/react";
import { CIcon } from "@coreui/icons-react";

const ConformationAlert = (props) => {
  const submit = () => {
    confirmAlert({
      title: props.heading,
      message: props.section,
      buttons: [
        {
          label: "Cancel",
          onClick: props.hideAlert,
        },
        {
          label: props.button_text,
          onClick: props.buttonAction,
        },
      ],
    });
  };
  return (
    <React.Fragment>
      <CButton
        variant={props.variant}
        className={props.className}
        color={props.color}
        onClick={submit}
        block={props.block}
      >
        <CIcon name="cil-trash" />
        DELETE
      </CButton>
    </React.Fragment>
  );
};
export default ConformationAlert;
