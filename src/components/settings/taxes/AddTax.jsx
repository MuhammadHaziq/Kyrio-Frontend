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
  CTextarea,
  CSelect,
  CInputCheckbox,
  CCardFooter,
  CSwitch,
  CInvalidFeedback,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import TaxDiningOption from "./TaxDiningOption.jsx";
import { useDispatch, useSelector } from "react-redux";
import { save_item_taxes } from "../../../actions/settings/taxesActions.js";
const AddTax = (props) => {
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const taxes = useSelector((state) => state.settingReducers.taxesReducer);
  const [collapse, setCollapse] = useState([true, false]);
  const [taxTypeId, setTaxType] = useState("");
  const [taxOptionId, setTaxOption] = useState("");
  const [storeId, setStoreId] = useState([]);
  const [sChecked, setChecked] = useState(false);
  const [fields, setFields] = useState({
    tax_name: "",
    tax_rate: "",
    tax_type: "",
    tax_option: "",
  });
  const [errors, setErrors] = useState({
    tax_name: false,
    tax_rate: false,
    tax_type: false,
    tax_option: false,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setStoreId(store.stores_list);
  }, [store.stores_list]);

  useEffect(() => {
    setTaxOption(0);
    setTaxType(taxes.tax_types[0]._id);
  }, [taxes.tax_types]);

  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  const goBack = () => {
    props.goBack();
  };
  const submitTaxForm = (e) => {
    e.preventDefault();
    if (fields.tax_name == "") {
      setErrors({
        ...errors,
        tax_name: true,
      });
      return false;
    }
    const selectedStore = [];
    storeId
      .filter((item) => item.isSelected == true)
      .map((item) => {
        selectedStore.push({
          storeId: item._id,
          storeTitle: item.title,
        });
      });
    const selectedDining = [];
    taxes.tax_dining_list
      .filter((item) => item.isSelected == true)
      .map((item) => {
        selectedDining.push({
          diningId: item._id,
          diningTitle: item.title,
        });
      });
    const selectedCategory = [];
    taxes.tax_category_list
      .filter((item) => item.isSelected == true)
      .map((item) => {
        selectedCategory.push({
          categoryId: item._id,
          categoryTitle: item.catTitle,
        });
      });
    const selectedCategoryItems = [];
    taxes.category_items
      .filter((item) => item.isSelected == true)
      .map((item) => {
        selectedCategoryItems.push({
          itemId: item._id,
          itemName: item.name,
          categoryId: item.category.categoryId,
        });
      });
    const types = taxes.tax_types.filter((item) => item._id == taxTypeId);
    const options = taxes.tax_options.filter((item) => item._id == taxOptionId);
    const data = {
      title: fields.tax_name,
      tax_rate: fields.tax_rate,
      tax_type: JSON.stringify({
        id: types[0]._id,
        title: types[0].title,
      }),
      tax_option:
        options.length == 0
          ? JSON.stringify({ id: "0", title: "-" })
          : JSON.stringify({
              id: options[0]._id,
              title: options[0].title,
            }),
      stores: JSON.stringify(selectedStore),
      dinings: JSON.stringify(selectedDining),
      categories: JSON.stringify(selectedCategory),
      items: JSON.stringify(selectedCategoryItems),
    };
    console.log("sote_name", data);
    dispatch(save_item_taxes(data));
  };
  const handleOnChange = (e) => {
    if (e.target.name == "tax_name") {
      setErrors({
        ...errors,
        tax_name: false,
      });
    }
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };
  const typeHandleChange = (e) => {
    setTaxType(e.target.value);
  };
  const optionHandleChange = (e) => {
    setTaxOption(e.target.value);
  };
  const storeHandleChange = (e) => {
    let selectedStore = [];
    if (e.target.value == 0) {
      selectedStore = storeId.slice().map((item) => {
        return {
          ...item,
          isSelected: !item.isSelected,
        };
      });
    } else {
      selectedStore = storeId.slice().map((item) => {
        if (item._id == e.target.value) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      });
    }

    setStoreId(selectedStore);
  };

  return (
    <React.Fragment>
      <CCard>
        <CCardHeader>
          <h4>
            <strong>Create Tax</strong>
            <div className="card-header-actions">
              <CLink className="card-header-action" onClick={() => toggle(0)}>
                <CIcon
                  name={collapse[0] ? "cil-chevron-bottom" : "cil-chevron-top"}
                />
              </CLink>
            </div>
          </h4>
        </CCardHeader>
        <CCollapse show={collapse[0]}>
          <CCardBody>
            <CFormGroup row>
              <CCol md="8">
                <CLabel htmlFor="tax_name">Tax Name</CLabel>
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-everplaces" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    id="tax_name"
                    name="tax_name"
                    placeholder="Tax Name"
                    onChange={handleOnChange}
                  />
                  <CInvalidFeedback style={{ display: "block" }}>
                    {errors.tax_name == true ? "Please Enter Tax Name" : ""}
                  </CInvalidFeedback>
                </CInputGroup>
              </CCol>
              <CCol md="4">
                <CLabel htmlFor="tax_rate">Tax Rate</CLabel>
                <CInputGroup>
                  <CInput
                    id="tax_rate"
                    name="tax_rate"
                    placeholder="Tax Rate %"
                    onChange={handleOnChange}
                  />
                  <CInputGroupAppend>
                    <CInputGroupText>%</CInputGroupText>
                  </CInputGroupAppend>
                </CInputGroup>
              </CCol>
            </CFormGroup>
            <CCol col="12" sm="12" md="12" xl="xl" className="mb-3 mb-xl-0">
              <CFormGroup>
                <CLabel htmlFor="taxTypeId">Type</CLabel>
                <CSelect
                  custom
                  size="md"
                  name="taxTypeId"
                  id="taxTypeId"
                  value={taxTypeId}
                  onChange={typeHandleChange}
                >
                  {taxes.tax_types.map((item, index) => {
                    return (
                      <option value={item._id} key={index}>
                        {item.title}
                      </option>
                    );
                  })}
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol col="12" sm="12" md="12" xl="xl" className="mb-3 mb-xl-0">
              <CFormGroup>
                <CLabel htmlFor="taxOptionId">Option</CLabel>
                <CSelect
                  custom
                  size="md"
                  name="taxOptionId"
                  id="taxOptionId;
"
                  value={taxOptionId}
                  onChange={optionHandleChange}
                >
                  <option value={0}>-</option>
                  {taxes.tax_options.map((item, index) => {
                    return (
                      <option value={item._id} key={index}>
                        {item.title}
                      </option>
                    );
                  })}
                </CSelect>
              </CFormGroup>
              <CFormGroup>
                <CCol md="12">
                  <p>
                    Tax application depends on dining option
                    <CSwitch
                      className={"mx-1 float-right"}
                      variant={"3d"}
                      color={"success"}
                      size="sm"
                      onChange={() => setChecked(!sChecked)}
                    />
                  </p>
                </CCol>
              </CFormGroup>
            </CCol>
          </CCardBody>
        </CCollapse>

        <CCardFooter>
          <h4>
            Select Stores{" "}
            <div className="card-header-actions">
              <CLink className="card-header-action" onClick={() => toggle(1)}>
                <CIcon
                  name={collapse[1] ? "cil-chevron-bottom" : "cil-chevron-top"}
                />
              </CLink>
            </div>
          </h4>
          <span>
            <small>
              {storeId.filter((item) => item.isSelected).length == 0
                ? "Not Available in Stores"
                : `Available In ${
                    storeId.filter((item) => item.isSelected).length
                  } Stores`}{" "}
              Stores
            </small>
          </span>
          <CCollapse show={collapse[1]}>
            <CCardBody>
              <CFormGroup>
                <CCol md="3">
                  <CLabel>Select Store</CLabel>
                </CCol>
                <CCol md="9">
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox
                      custom
                      name="storeId"
                      id={"storeId"}
                      value={0}
                      onChange={storeHandleChange}
                    />
                    <CLabel variant="custom-checkbox" htmlFor={"storeId"}>
                      {storeId.filter((item) => !item.isSelected).length == 0
                        ? "UnSelect All"
                        : "Select All"}
                    </CLabel>
                  </CFormGroup>
                </CCol>
                <CCol md="9">
                  {(storeId || []).map((item, index) => (
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
          </CCollapse>
        </CCardFooter>
      </CCard>
      {sChecked == true ? (
        <CRow>
          <CCol sm="12" xl="12">
            <CCard>
              <TaxDiningOption />
            </CCard>
          </CCol>
        </CRow>
      ) : null}

      <CRow>
        <CCol sm="2" md="2" className="mb-3 mb-xl-0">
          <CButton
            variant="ghost"
            className="pull-left"
            color="default"
            onClick={goBack}
          >
            BACK
          </CButton>
        </CCol>
        <CCol sm="2" md="2" className="mb-3 mb-xl-0">
          <CButton
            variant="ghost"
            className="pull-left"
            color="danger"
            onClick={goBack}
          >
            CANCEL
          </CButton>
        </CCol>
        <CCol sm="2" md="8" className="mb-3 mb-xl-0 form-actions">
          <CButton
            type="click"
            variant="ghost"
            className="float-right"
            color="primary"
            onClick={submitTaxForm}
          >
            SAVE
          </CButton>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default AddTax;