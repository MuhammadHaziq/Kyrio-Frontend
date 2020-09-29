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
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { add_new_dining_option } from "../../../actions/settings/diningOptionActions.js";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

const UpdateDiningOption = (props) => {
  // const store = useSelector((state) => state.settingReducers.storeReducer);
  const dinings = useSelector(
    (state) => state.settingReducers.diningOptionReducer
  );
  const [collapse, setCollapse] = useState([true, true]);
  const [fields, setFields] = useState({ dining_name: "", checkAll: true });
  const [errors, setErrors] = useState({
    dining_name: false,
    checkAll_error: false,
  });
  const [storeId, setStoreId] = useState([]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (props.store !== undefined) {
  //     const stores = props.store.slice().map((item) => {
  //       return {
  //         ...item,
  //         isSelected: true,
  //       };
  //     });
  //     setStoreId(stores);
  //   }
  // }, [props.store]);
  //
  useEffect(() => {
    if (props.store !== undefined) {
      let stores = props.store;
      (props.update_data.stores || []).map((ite) => {
        return (stores = stores.slice().map((item) => {
          if (item._id === ite.storeId) {
            return {
              ...item,
              isSelected: true,
            };
          }
          return item;
        }));
      });
      setFields({
        ...fields,
        dining_name: props.update_data.title,
        checkAll:
          stores.filter((item) => item.isSelected === true).length ===
          props.store.length
            ? true
            : false,
      });
      setStoreId(stores);
    }
  }, [props, props.update_data]);

  useEffect(() => {
    if (
      dinings.redirect_dining !== undefined &&
      dinings.redirect_dining === true
    )
      props.goBack();
  }, [dinings.redirect_dining, props]);
  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  const goBack = () => {
    props.goBack();
  };
  // const submitDiningForm = (e) => {
  const submitDiningForm = () => {
    // e.preventDefault();
    // if (storeId.length == 0) {
    if (storeId.filter((item) => item.isSelected === true).length === 0) {
      alert("Select Store");
    } else if (fields.dining_name === "") {
      setErrors({
        ...errors,
        dining_name: validator.isEmpty(fields.dining_name),
      });
    } else {
      const store = storeId.filter((item) => item.isSelected === true);
      let storeData = [];
      store.map((item) => {
        return storeData.push({
          storeId: item._id,
          storeName: item.title,
        });
      });

      const data = {
        title: fields.dining_name,
        store: JSON.stringify(storeData),
        isSelected: true,
        id: props.update_data._id,
        // store: JSON.stringify(storeId),
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
    // setFields({
    //   ...fields,
    //   checkAll:
    //     selectedStore.map((item) => item.isSelected !== false).length === 0
    //       ? true
    //       : false,
    // });

    setStoreId(selectedStore);
  };
  return (
    <React.Fragment>
      <CCard>
        <CCardHeader>
          <h4>
            <strong>Create Dining Option</strong>
          </h4>
        </CCardHeader>

        <CCardBody>
          <CFormGroup>
            <CCol md="12">
              <CLabel htmlFor="store_name">Dining Name</CLabel>
              <CInputGroup>
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-print" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  id="dining_name"
                  name="dining_name"
                  placeholder="Dining Name"
                  onChange={handleOnChange}
                  value={fields.dining_name}
                  invalid={errors.dining_name}
                  onBlur={handleOnBlur}
                />
                <CInvalidFeedback>
                  {errors.dining_name === true
                    ? "Please Enter Dining Name"
                    : ""}
                </CInvalidFeedback>
              </CInputGroup>
            </CCol>
          </CFormGroup>
        </CCardBody>
        {collapse[0] ? (
          <CCardFooter>
            <h4>
              Stores
              <div className="card-footer-actions float-right">
                <CLink className="card-footer-action" onClick={() => toggle(0)}>
                  <CIcon
                    name={
                      collapse[0] ? "cil-chevron-bottom" : "cil-chevron-top"
                    }
                  />
                </CLink>
              </div>
            </h4>
            <span>
              <small>
                {storeId.filter((item) => item.isSelected === false).length ===
                0
                  ? "Available in all stores"
                  : "Not available in stores"}
              </small>
            </span>
          </CCardFooter>
        ) : (
          ""
        )}
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
            onClick={submitDiningForm}
          >
            SAVE
          </CButton>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default UpdateDiningOption;
