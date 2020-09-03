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
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import TaxDiningOption from "./TaxDiningOption.jsx";
import { useDispatch, useSelector } from "react-redux";
const AddTax = (props) => {
  const store = useSelector((state) => state.settingReducers.storeReducer);
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
  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  const goBack = () => {
    props.goBack();
  };
  const submitTaxForm = (e) => {
    e.preventDefault();
    const data = {
      title: fields.tax_name,
      address: fields.tax_rate,
      phone: fields.store_phone,
      description: fields.store_description,
    };
    console.log("sote_name", data);
  };
  const handleOnChange = (e) => {
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
    const store = props.store.filter((item) => item._id == e.target.value);
    let storeData;
    storeData = {
      storeId: store[0]._id,
      storeName: store[0].title,
    };
    if (storeId.length == 0) {
      setStoreId([storeData]);
    } else {
      const checkExist = storeId.filter((item) => item.storeId == store[0]._id);
      if (checkExist.length == 0) {
        setStoreId([...storeId, storeData]);
      } else {
        const data = storeId.filter((item) => item.storeId !== store[0]._id);
        setStoreId(data);
      }
    }
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
            <CForm onSubmit={submitTaxForm}>
              <CFormGroup row="row">
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
                  <CSelect
                    custom
                    size="md"
                    name="taxTypeId"
                    id="taxTypeId"
                    value={taxTypeId}
                    onChange={typeHandleChange}
                  >
                    {store.stores_list.map((item) => {
                      return <option value={item._id}>{item.title}</option>;
                    })}
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol col="12" sm="12" md="12" xl="xl" className="mb-3 mb-xl-0">
                <CFormGroup>
                  <CSelect
                    custom
                    size="md"
                    name="taxOptionId"
                    id="taxOptionId"
                    value={taxOptionId}
                    onChange={optionHandleChange}
                  >
                    {store.stores_list.map((item) => {
                      return <option value={item._id}>{item.title}</option>;
                    })}
                  </CSelect>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <p>
                      Tax application depends on dining option
                      <CSwitch
                        className={"mx-1 float-right"}
                        variant={"3d"}
                        color={"success"}
                        size="sm"
                        checked={sChecked || ""}
                        onChange={() => setChecked(!sChecked)}
                      />
                    </p>
                  </CCol>
                </CFormGroup>
              </CCol>
            </CForm>
          </CCardBody>
        </CCollapse>

        <CCardFooter>
          <h4>
            Select Stores
            <div className="card-header-actions">
              <CLink className="card-header-action" onClick={() => toggle(1)}>
                <CIcon
                  name={collapse[1] ? "cil-chevron-bottom" : "cil-chevron-top"}
                />
              </CLink>
            </div>
          </h4>
          <CCollapse show={collapse[1]}>
            <CCardBody>
              <CFormGroup row>
                <CCol md="9">
                  {store.stores_list.map((item) => (
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox
                        custom
                        name="storeId"
                        id={"storeId" + item._id}
                        value={item._id}
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
        <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
          <CButton
            block="block"
            variant="outline"
            className="btn-pill pull-right"
            color="default"
            onClick={goBack}
          >
            BACK
          </CButton>
        </CCol>
        <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
          <CButton
            block="block"
            variant="outline"
            className="btn-pill pull-right"
            color="danger"
            onClick={goBack}
          >
            CANCEL
          </CButton>
        </CCol>
        <CCol
          col="6"
          sm="4"
          md="4"
          xl="xl"
          className="mb-3 mb-xl-0 form-actions"
        >
          <CButton
            type="submit"
            block="block"
            variant="outline"
            className="btn-pill pull-right"
            color="primary"
          >
            SAVE
          </CButton>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default AddTax;
