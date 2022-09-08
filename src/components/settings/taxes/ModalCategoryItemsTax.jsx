import React, { useState, useEffect } from "react";
import {
  // CModal,
  // CModalHeader,
  // CModalBody,
  // CModalFooter,
  // CButton,
  CFormGroup,
  CCol,
  CInputCheckbox,
  CLabel,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
// import CIcon from "@coreui/icons-react";
import { toggle_category_item } from "../../../actions/settings/taxesActions.js";
const ModalCategoryItemsTax = (props) => {
  const dispatch = useDispatch();
  // const [itemId, setItemId] = useState([]);
  const [categoryItems, setCategoryItems] = useState(props.category_items);
  useEffect(() => {
    setCategoryItems(props.category_items);
  }, [props.category_items]);

  const categoryHandleChange = (e) => {
    const category = categoryItems.filter(
      (item) => item._id === e.target.value
    );
    setCategoryItems(
      categoryItems.map((item) => {
        if (item._id === e.target.value) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      })
    );
    let category_item;
    category_item = {
      itemId: category[0]._id,
      itemName: category[0].title,
      categoryId:
        category[0].category !== undefined && category[0].category !== null
          ? category[0].category._id
          : "0",
    };
    const categoryData = {
      categoryId:
        category[0].category !== undefined && category[0].category !== null
          ? category[0].category._id
          : "0",
      categoryName:
        category[0].category !== undefined && category[0].category !== null
          ? category[0].category.title
          : "No Category",
    };
    dispatch(toggle_category_item(category_item, categoryData));
  };

  return (
    <React.Fragment>
      <CFormGroup row>
        <CCol md="12">
          <CListGroup>
            {(categoryItems || []).length > 0 ? (
              (categoryItems || []).map((item) => (
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
                      {item.title}
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              ))
            ) : (
              <CListGroupItem>No Reacord Found</CListGroupItem>
            )}
          </CListGroup>
        </CCol>
      </CFormGroup>
    </React.Fragment>
  );
};
export default ModalCategoryItemsTax;
