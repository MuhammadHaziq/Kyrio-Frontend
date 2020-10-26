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
  CLink,
  CInputCheckbox,
  CInvalidFeedback,
  CCardFooter,
  CInputRadio,
  CListGroup,
  CListGroupItem,
  CSwitch,
  CImg,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { add_new_category } from "../../../actions/items/categoryActions";
const AddModifier = (props) => {
  const [collapse, setCollapse] = useState([true, true]);
  const [fields, setFields] = useState({
    modifier_name: "",
    checkAll: true,
  });
  const [errors, setErrors] = useState({
    modifier_name: false,
  });
  const [storeId, setStoreId] = useState([]);

  const category = useSelector((state) => state.items.categoryReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      category.redirect_categoryList !== undefined &&
      category.redirect_categoryList === true
    )
      props.goBack();
  }, [category.redirect_categoryList]);

  useEffect(() => {
    if (props.store !== undefined) {
      const stores = props.store.slice().map((item) => {
        return {
          ...item,
          isSelected: true,
        };
      });
      setStoreId(stores);
    }
  }, [props.store]);

  const goBack = () => {
    props.goBack();
  };

  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };

  const submitCategory = () => {
    if (fields.modifier_name === "") {
      setErrors({
        ...errors,
        modifier_name: validator.isEmpty(fields.modifier_name),
      });
      return false;
    }

    const data = {
      catTitle: fields.modifier_name,
      catColor: fields.color,
    };
    dispatch(add_new_category(data));
    console.log(data);
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

  const storeHandleChange = (e) => {
    let selectedStore = [];
    if (e.target.value === "0") {
      setFields({
        ...fields,
        checkAll: !fields.checkAll,
      });
      selectedStore = storeId.slice().map((item) => {
        return {
          ...item,
          isSelected: !fields.checkAll === true ? true : false,
          // !item.isSelected,
        };
      });
    } else {
      selectedStore = storeId.slice().map((item) => {
        if (item._id === e.target.value) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      });
    }
    setFields({
      ...fields,
      checkAll:
        selectedStore.filter((item) => item.isSelected === true).length ===
          props.store.length && props.store.length > 0
          ? true
          : false,
    });

    setStoreId(selectedStore);
  };

  return (
    <React.Fragment>
      <CCard>
        <CCardHeader>
          <h4>
            <strong>Create Modifier</strong>
          </h4>
        </CCardHeader>

        <CCardBody>
          <CCol md="12">
            <CFormGroup>
              <CLabel htmlFor="store_name">Modifier Name</CLabel>
              <CInputGroup>
                <CInput
                  id="modifier_name"
                  name="modifier_name"
                  placeholder="Modifier Name"
                  onChange={handleOnChange}
                  value={fields.modifier_name}
                  invalid={errors.modifier_name}
                  onBlur={handleOnBlur}
                />
                <CInvalidFeedback>
                  {errors.modifier_name === true
                    ? "Please Enter Category Name"
                    : ""}
                </CInvalidFeedback>
              </CInputGroup>
            </CFormGroup>
          </CCol>
        </CCardBody>
        <CCardFooter>
          {" "}
          <h4>
            Stores
            <div className="card-footer-actions float-right">
              <CLink className="card-footer-action" onClick={() => toggle(0)}>
                <CIcon
                  name={collapse[0] ? "cil-chevron-bottom" : "cil-chevron-top"}
                />
              </CLink>
            </div>
          </h4>
          <span>
            <small>
              {storeId.filter((item) => item.isSelected === false).length === 0
                ? "Available in all stores"
                : "Not available in stores"}
            </small>
          </span>
        </CCardFooter>
      </CCard>
      <CCollapse show={!collapse[0]}>
        <CCard>
          <CCardHeader>
            <h4>
              <strong>Stores</strong>
              <div className="card-header-actions">
                <CLink className="card-header-action" onClick={() => toggle(0)}>
                  <CIcon
                    name={
                      collapse[0] ? "cil-chevron-bottom" : "cil-chevron-top"
                    }
                  />
                </CLink>
              </div>
            </h4>
          </CCardHeader>
          <CCardBody>
            <CFormGroup>
              <CCol md="3">
                <CLabel>Select Store</CLabel>
              </CCol>
              <CCol md="9">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    name="checkAll"
                    id={"checkAll"}
                    value={0}
                    checked={fields.checkAll}
                    onChange={storeHandleChange}
                  />
                  <CLabel variant="custom-checkbox" htmlFor={"checkAll"}>
                    {storeId.filter((item) => item.isSelected !== true)
                      .length === 0
                      ? "UnSelect All"
                      : "Select All"}
                  </CLabel>
                </CFormGroup>
              </CCol>
              <CCol md="8">
                {storeId.map((item, index) => (
                  <CFormGroup variant="custom-checkbox" inline key={index}>
                    <CInputCheckbox
                      custom
                      name="storeId"
                      id={"storeId" + item._id}
                      value={item._id}
                      checked={item.isSelected}
                      onChange={storeHandleChange}
                    />
                    <CLabel
                      variant="custom-checkbox"
                      htmlFor={"storeId" + item._id}
                    >
                      {item.title}
                    </CLabel>
                  </CFormGroup>
                ))}
              </CCol>
            </CFormGroup>
          </CCardBody>
        </CCard>
      </CCollapse>
      <CRow>
        <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
          <CButton
            block
            variant="outline"
            className="btn-pill pull-right"
            color="secondary"
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
            onClick={submitCategory}
          >
            SAVE
          </CButton>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default AddModifier;
