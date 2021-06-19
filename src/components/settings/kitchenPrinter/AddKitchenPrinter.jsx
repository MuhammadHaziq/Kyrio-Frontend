import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInputCheckbox,
  CInvalidFeedback,
  CCardFooter,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { add_new_kitchen_printer } from "../../../actions/settings/kitchenPrinterActions.js";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

const AddKitchenPrinter = (props) => {
  // const store = useSelector((state) => state.settingReducers.storeReducer);
  const kitchenPrinter = useSelector(
    (state) => state.settingReducers.kitchenPrinterReducer
  );
  const [collapse, setCollapse] = useState([true, true]);
  const [storeId, setStoreId] = useState();
  const [fields, setFields] = useState({ kitchen_name: "", noCategory: false });
  const [errors, setErrors] = useState({
    kitchen_name_error: false,
  });
  const [categoryId, setCategoryId] = useState([]);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.category !== undefined) {
      const categories = props.category.slice().map((item) => {
        return {
          ...item,
          isSelected: false,
        };
      });

      setCategoryId(categories);
    }
  }, [props.category]);

  useEffect(() => {
    if (
      kitchenPrinter.redirect_kitchen !== undefined &&
      kitchenPrinter.redirect_kitchen === true
    ) {
      props.goBack();
    }
  }, [kitchenPrinter.redirect_kitchen]);
  useEffect(() => {
    setStoreId(auth.user.stores[0] ? auth.user.stores[0]._id : "");
  }, [auth]);
  const goBack = () => {
    props.goBack();
  };
  const saveKitchenPrinter = () => {
    // e.preventDefault();
    if (fields.kitchen_name === "") {
      setErrors({
        ...errors,
        kitchen_name: validator.isEmpty(fields.kitchen_name),
      });
    } else {
      const category = categoryId.filter((item) => item.isSelected === true);
      let categoryData = [];
      category.map((item) => {
        return categoryData.push(item._id)
        // return categoryData.push({
        //   categoryId: item._id,
        //   categoryName: item.title,
        // });
      });
      const data = {
        title: fields.kitchen_name,
        categories: categoryData,
        store: storeId,
      };
      dispatch(add_new_kitchen_printer(data));
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };
  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: validator.isEmpty(value),
    });
  };
  const categoryHandleChange = (e) => {
    let selectedCategory = [];

    if (e.target.value === "0") {
      setFields({
        ...fields,
        noCategory: !fields.noCategory,
      });
    } else {
      selectedCategory = categoryId.slice().map((item) => {
        if (item._id === e.target.value) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      });
      setCategoryId(selectedCategory);
    }
  };
  return (
    <React.Fragment>
      <CCard>
        <CCardHeader>
          <h4>
            <strong>Create Printer Group</strong>
          </h4>
        </CCardHeader>
        <CCollapse show={collapse[0]}>
          <CCardBody>
            <CFormGroup>
              <CCol md="12">
                <CLabel htmlFor="store_name">Kitchen Printer</CLabel>
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-print" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    id="kitchen_name"
                    name="kitchen_name"
                    placeholder="Kitchen Printer"
                    onChange={handleOnChange}
                    value={fields.kitchen_name}
                    invalid={errors.kitchen_name}
                    onBlur={handleOnBlur}
                  />
                  <CInvalidFeedback style={{ display: "block" }}>
                    {errors.kitchen_name === true
                      ? "Please Enter Kitchen Printer"
                      : ""}
                  </CInvalidFeedback>
                </CInputGroup>
              </CCol>
            </CFormGroup>
            <CCol md="12" className="mb-3">
              <h2 className="mb-0">Categories</h2>
              <span>
                <small>Categories printed on this printer group</small>
              </span>
              <CFormGroup variant="custom-checkbox">
                <CInputCheckbox
                  custom
                  name="categoryId"
                  id={"categoryId"}
                  value={0}
                  checked={fields.noCategory}
                  onChange={categoryHandleChange}
                />
                <CLabel variant="custom-checkbox" htmlFor={"categoryId"}>
                  No Category
                </CLabel>
              </CFormGroup>
              {categoryId.map((item, index) => (
                <CFormGroup variant="custom-checkbox" inline key={index}>
                  <CInputCheckbox
                    custom
                    name="categoryId"
                    id={"categoryId" + item._id}
                    value={item._id}
                    checked={item.isSelected}
                    onChange={categoryHandleChange}
                  />
                  <CLabel
                    variant="custom-checkbox"
                    htmlFor={"categoryId" + item._id}
                  >
                    {item.title}
                  </CLabel>
                </CFormGroup>
              ))}
            </CCol>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block
                  variant="outline"
                  className="btn-pill pull-right"
                  color="danger"
                  onClick={goBack}
                >
                  BACK
                </CButton>
              </CCol>
              <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0 form-actions">
                <CButton
                  block
                  type="submit"
                  variant="outline"
                  className="btn-pill pull-right"
                  color="success"
                  onClick={saveKitchenPrinter}
                >
                  SAVE
                </CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCollapse>
      </CCard>
    </React.Fragment>
  );
};

export default AddKitchenPrinter;
