import React, { useState, useEffect } from "react";
import {
  CButton,
  CCardBody,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import ModalSelectDiningOption from "./ModalSelectDiningOption";
import ModalSelectItemsTax from "./ModalSelectItemsTax";
import {
  toggle_dinings,
  toggle_category,
  toggle_category_item,
} from "../../../actions/settings/taxesActions.js";

import { useDispatch, useSelector } from "react-redux";
const TaxDiningOption = (props) => {
  const dispatch = useDispatch();

  const [modalDining, setModalDining] = useState(false);
  const [modalItems, setModalItems] = useState(false);
  const toggleDining = () => {
    setModalDining(!modalDining);
    const data = [];
    dispatch(toggle_dinings(data));
  };
  const toggleItems = () => {
    setModalItems(!modalItems);
    const data = [];
    dispatch(toggle_category_item(data, data));
  };

  const doneDining = () => {
    setModalDining(!modalDining);
  };
  const doneItems = () => {
    setModalItems(!modalItems);
  };
  const taxes = useSelector((state) => state.settingReducers.taxesReducer);
  return (
    <React.Fragment>
      <ModalSelectDiningOption
        show={modalDining}
        toggle={toggleDining}
        done={doneDining}
        dining={taxes.tax_dining_list}
      />
      <ModalSelectItemsTax
        show={modalItems}
        toggle={toggleItems}
        done={doneItems}
        category={taxes.tax_category_list}
      />
      <CCardBody>
        <CListGroup>
          <CListGroupItem>
            <h5 className="d-flex w-100 justify-content-between">
              When dining option is:
              <CButton
                className="float-right"
                variant="ghost"
                color="primary"
                size="sm"
                onClick={() => setModalDining(!modalDining)}
              >
                {taxes.tax_dining_list.filter((item) => item.isSelected === true)
                  .length === 0
                  ? "SELECT"
                  : "EDIT"}
              </CButton>
            </h5>
            <div style={{ color: "rgba(0,0,0,0.54)", marginTop: "-15px" }}>
              {taxes.tax_dining_list.filter((item) => item.isSelected === true)
                .length === 0
                ? "No dining options selected"
                : taxes.tax_dining_list.filter(
                    (item) => item.isSelected === true
                  ).length + " dinings are selected"}
            </div>
          </CListGroupItem>
          <CListGroupItem>
            <h5>
              Do not apply tax to these items:
              <CButton
                className="float-right"
                variant="ghost"
                color="primary"
                size="sm"
                onClick={() => setModalItems(!modalItems)}
              >
                {taxes.tax_category_list.filter(
                  (item) => item.isSelected === true
                ).length === 0
                  ? "SELECT"
                  : "EDIT"}
              </CButton>
            </h5>
            <div style={{ color: "rgba(0,0,0,0.54)", marginTop: "-8px" }}>
              {taxes.tax_category_list.filter((item) => item.isSelected === true)
                .length === 0
                ? " No items selected"
                : taxes.tax_category_list.filter(
                    (item) => item.isSelected === true
                  ).length + " items are selected"}
            </div>
          </CListGroupItem>
        </CListGroup>
      </CCardBody>
    </React.Fragment>
  );
};

export default TaxDiningOption;
