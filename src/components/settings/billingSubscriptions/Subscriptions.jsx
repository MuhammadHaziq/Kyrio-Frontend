import React, { useEffect, useState } from "react";
import { CButton } from "@coreui/react";
import { FaAddressCard, FaLuggageCart, FaRegCreditCard } from "react-icons/fa";
import SubscriptionModel from "./SubscriptionModel";
const Subscriptions = () => {
  const [subscribe, setSubscribe] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [show, setShow] = useState(false);
  const handleSubscribe = (param) => {
    if (param == 1) {
      setTitle("");
      setMessage("Please add an employee to subscribe.");
      setButtonText("ADD EMPLOYEE");
    } else {
      setTitle("Subscribe to advanced inventory");
      setMessage(
        "You can start a 14-day free trial without payment and credit card. After that, there is a subscription fee of $25 USD/month per store. You may also be charged tax if your billing country is USA, Canada or in the EU. You can cancel at any time."
      );
      setButtonText("SUBSCRIBE");
    }
    setSubscribe(true);
  };

  const toggle = () => {
    setShow(!show);
    setSubscribe(false);
  };
  return (
    <React.Fragment>
      <SubscriptionModel
        title={title}
        message={message}
        buttonText={buttonText}
        show={subscribe}
        toggle={toggle}
      />{" "}
      <h5>
        {" "}
        <FaAddressCard /> &nbsp;Employee management{" "}
        <CButton
          color="success"
          className="float-right btn-pill"
          variant="outline"
          onClick={() => handleSubscribe(1)}
        >
          SUBSCRIBE{" "}
        </CButton>{" "}
      </h5>{" "}
      <p
        style={{
          paddingLeft: "25px",
        }}
      >
        {" "}
        Manage access rights, track timecards and sales by employee.{" "}
      </p>{" "}
      <h5
        style={{
          marginTop: "5%",
        }}
      >
        {" "}
        <FaLuggageCart /> &nbsp;Advance Inventory{" "}
        <CButton
          color="success"
          className="float-right btn-pill"
          variant="outline"
          onClick={() => handleSubscribe(2)}
        >
          SUBSCRIBE{" "}
        </CButton>{" "}
      </h5>{" "}
      <p
        style={{
          paddingLeft: "25px",
        }}
      >
        {" "}
        Manage access rights, track timecards and sales by employee.{" "}
      </p>{" "}
      <p
        style={{
          paddingLeft: "25px",
        }}
      >
        {" "}
        14 day free trial{" "}
      </p>{" "}
      <p
        style={{
          paddingLeft: "25px",
        }}
      >
        {" "}
        You may also be charged tax if your billing country is USA, Canada or in
        the EU.{" "}
      </p>
    </React.Fragment>
  );
};

export default Subscriptions;
