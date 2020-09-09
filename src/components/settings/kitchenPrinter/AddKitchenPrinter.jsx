import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CFade,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CFormText,
  CLink,
  CInputGroupAppend,
  CForm,
  CInputCheckbox,
  CInputRadio,
  CSelect,
  CInvalidFeedback,
  CCardFooter,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import { add_new_dining_option } from "../../../actions/settings/diningOptionActions.js";
import { get_stores } from "../../../actions/settings/storeActions.js";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

const AddKitchenPrinter = (props) => {
  // const store = useSelector((state) => state.settingReducers.storeReducer);
  const [collapse, setCollapse] = useState([true, true]);
  const [expRight, setExpRight] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [title, setTitle] = useState("");
  const [timeout, setTimeout] = useState(300);
  const [fields, setFields] = useState({ kitchen_name: "", checkAll: true });
  const [errors, setErrors] = useState({
    kitchen_name_error: false,
    checkAll_error: false,
  });
  const [categoryId, setCategoryId] = useState([]);

  const [fade, setFade] = useState(true);
  const dispatch = useDispatch();
  // useEffect(()=> {
  //   dispatch(get_stores())
  //
  // },[])
  useEffect(() => {
    if (props.category !== undefined) {
      const categories = props.category.slice().map((item) => {
        return {
          ...item,
          isSelected: true,
        };
      });
      setCategoryId(categories);
    }
  }, [props.category]);
  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  const goBack = () => {
    props.goBack();
  };
  const saveKitchenPrinter = () => {
    // e.preventDefault();
    // if (categoryId.length == 0) {
    if (categoryId.filter((item) => item.isSelected == true).length == 0) {
      alert("Select Category");
    } else {
      const category = categoryId.filter((item) => item.isSelected == true);
      let categoryData = [];
      category.map((item) => {
        categoryData.push({
          categoryId: item._id,
          categoryName: item.catTitle,
        });
      });

      const data = {
        title: fields.kitchen_name,
        categoryId: JSON.stringify(categoryData),
        isSelected: true,
        // store: JSON.stringify(categoryId),
      };
      console.log(data);
      // dispatch(add_new_dining_option(data));
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

    if (e.target.value == 0) {
      setFields({
        ...fields,
        checkAll: !fields.checkAll,
      });
      selectedCategory = categoryId.slice().map((item) => {
        return {
          ...item,
          isSelected: !item.isSelected,
        };
      });
    } else {
      selectedCategory = categoryId.slice().map((item) => {
        if (item._id == e.target.value) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      });
    }

    setCategoryId(selectedCategory);
  };
  console.log(props.category);
  return (
    <React.Fragment>
      <CCard>
        <CCardHeader>
          <h4>
            <strong>Create Dining Option</strong>
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
                    {errors.kitchen_name == true
                      ? "Please Enter Kitchen Printer"
                      : ""}
                  </CInvalidFeedback>
                </CInputGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup>
              <CCol md="3" className="mb-3">
                <h2 className="mb-0">Categories</h2>
                <span>
                  <small>Categories printed on this printer group</small>
                </span>
              </CCol>
              <CCol md="9">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    name="categoryId"
                    id={"categoryId"}
                    value={0}
                    checked={fields.checkAll}
                    onChange={categoryHandleChange}
                  />
                  <CLabel variant="custom-checkbox" htmlFor={"categoryId"}>
                    {categoryId.filter((item) => item.isSelected == false)
                      .length == 0
                      ? "UnSelect All"
                      : "Select All"}
                  </CLabel>
                </CFormGroup>
              </CCol>
              <CCol md="8">
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
                      {item.catTitle}
                    </CLabel>
                  </CFormGroup>
                ))}
              </CCol>
            </CFormGroup>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block
                  variant="outline"
                  className="btn-pill pull-right"
                  color="default"
                  onClick={goBack}
                >
                  BACK
                </CButton>
              </CCol>
              <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block
                  variant="outline"
                  className="btn-pill pull-right"
                  color="danger"
                  onClick={goBack}
                >
                  CANCEL
                </CButton>
              </CCol>
              <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0 form-actions">
                <CButton
                  block
                  type="submit"
                  variant="outline"
                  className="btn-pill pull-right"
                  color="success"
                  onClick={saveKitchenPrinter}
                  disabled={
                    fields.kitchen_name == "" ||
                    categoryId.filter((item) => item.isSelected == true)
                      .length == 0
                  }
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
