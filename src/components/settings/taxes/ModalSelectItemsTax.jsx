import React, { useState, useEffect } from "react";
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormGroup,
  CCol,
  CInputCheckbox,
  CLabel,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { toggle_category } from "../../../actions/settings/taxesActions.js";
const ModalSelectDiningOption = (props) => {
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState([]);
  const categoryHandleChange = (e) => {
    const category = props.category.filter((item) => item._id == e.target.value);
    let categoryData;
    categoryData = {
      categoryId: category[0]._id,
      categoryName: category[0].catTitle,
    };
    dispatch(toggle_category(categoryData));
  };
  console.log(props.category);
  return (
    <React.Fragment>
      <CModal show={props.show} onClose={props.toggle} closeOnBackdrop={false}>
        <CModalHeader closeButton>
          <h4>Select Items</h4>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row>
            <CCol md="12">
              <CListGroup>
                {props.category.map((item) => (
                  <CListGroupItem>
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox
                        custom
                        name="categoryId"
                        id={"categoryId" + item._id}
                        value={item._id}
                        onChange={categoryHandleChange}
                      />
                      <CLabel
                        variant="custom-checkbox"
                        htmlFor={"categoryId" + item._id}
                      >
                        {item.catTitle}
                      </CLabel>
                    </CFormGroup>
                  </CListGroupItem>
                ))}
              </CListGroup>
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={props.toggle}>
            Cancel
          </CButton>
          <CButton color="primary">Done</CButton>{" "}
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};
export default ModalSelectDiningOption;
