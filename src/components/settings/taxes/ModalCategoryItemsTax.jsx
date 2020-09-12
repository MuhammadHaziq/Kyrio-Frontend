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
import { CIcon } from "@coreui/icons-react";
import { toggle_category_item } from "../../../actions/settings/taxesActions.js";
const ModalCategoryItemsTax = (props) => {
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState([]);

  const categoryHandleChange = (e) => {
    const category = props.category_items.filter(
      (item) => item._id == e.target.value
    );
    let category_item;
    category_item = {
      itemId: category[0]._id,
      itemName: category[0].name,
      categoryId: category[0].category.categoryId,
    };
    const categoryData = {
      categoryId: category[0].category.categoryId,
      categoryName: category[0].category.categoryName,
    };
    dispatch(toggle_category_item(category_item, categoryData));
  };

  return (
    <React.Fragment>
      <CFormGroup row>
        <CCol md="12">
          <CListGroup>
            {props.category_items.map((item) => (
              <CListGroupItem>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    name="itemId"
                    id={"itemId" + item._id}
                    value={item._id}
                    checked={item.isSelected}
                    onChange={categoryHandleChange}
                  />
                  <CLabel
                    variant="custom-checkbox"
                    htmlFor={"itemId" + item._id}
                  >
                    {item.name}
                  </CLabel>
                </CFormGroup>
              </CListGroupItem>
            ))}
          </CListGroup>
        </CCol>
      </CFormGroup>
    </React.Fragment>
  );
};
export default ModalCategoryItemsTax;
