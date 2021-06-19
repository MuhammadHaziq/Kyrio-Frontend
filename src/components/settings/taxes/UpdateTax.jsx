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
  CInputGroupAppend,
  CSelect,
  CInputCheckbox,
  CCardFooter,
  CSwitch,
  CInvalidFeedback,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import TaxDiningOption from "./TaxDiningOption.jsx";
import ConformationAlert from "../../../components/conformationAlert/ConformationAlert";
import { useDispatch, useSelector } from "react-redux";
import {
  get_taxes_type,
  get_taxes_option,
  remove_row_update_data,
  update_item_tax,
  delete_item_taxes,
} from "../../../actions/settings/taxesActions.js";
// import ConformationAlert from '../conformationALert/ConformationAlert'
import validator from "validator";
const UpdateTax = (props) => {
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const taxes = useSelector((state) => state.settingReducers.taxesReducer);
  const [collapse, setCollapse] = useState([true, false]);
  const [taxTypeId, setTaxType] = useState("");
  const [taxOptionId, setTaxOption] = useState("");
  const [storeId, setStoreId] = useState([]);
  const [sChecked, setChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [fields, setFields] = useState({
    tax_name: "",
    tax_rate: "",
    checkedAll: true,
  });

  const [errors, setErrors] = useState({
    tax_name: false,
    tax_rate: false,
  });

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(get_tax_category_list());
  // }, [dispatch]);

  useEffect(() => {
    if (taxes.tax_types === undefined || taxes.tax_types.length === 0) {
      dispatch(get_taxes_type());
      dispatch(get_taxes_option());
    }
  }, [dispatch, taxes.tax_types]);

  useEffect(() => {
    if (store.stores_list !== undefined) {
      const stores = store.stores_list.slice().map((item) => {
        return {
          ...item,
          isSelected: taxes.tax_row_data.stores.filter(store => store._id == item._id) ? true : false,
        };
      });
      setStoreId(stores);
    }
  }, [store.stores_list]);

  useEffect(() => {
    if (taxes.redirect_taxes === true) {
      props.goBack();
    }
  }, [props, taxes.redirect_taxes]);

  useEffect(() => {
    if (taxes.tax_types !== undefined && taxes.tax_types.length > 0) {
      // setTaxOption(0);
      // setTaxType(taxes.tax_types[0]._id || "");

      setTaxType(
        taxes.tax_row_data.tax_type !== undefined &&
          taxes.tax_row_data.tax_type !== null
          ? taxes.tax_row_data.tax_type || ""
          : ""
      );
    }
  }, [taxes.tax_row_data.tax_type, taxes.tax_types]);
  useEffect(() => {
    if (taxes.tax_options !== undefined && taxes.tax_options.length > 0) {
      const taxOption = (taxes.tax_options || [])
        .filter((item) => {
          return (
            item.title.toUpperCase() ===
            "Apply the tax to the new items".toUpperCase()
          );
        })
        .map((item) => item._id)[0];
      setTaxOption(
        taxes.tax_row_data.tax_option !== undefined &&
          taxes.tax_row_data.tax_option !== null
          ? taxes.tax_row_data.tax_option || 0
          : taxOption
      );
    }
  }, [taxes.tax_row_data.tax_option, taxes.tax_options]);

  useEffect(() => {
    if (
      taxes.tax_row_data !== undefined &&
      Object.keys(taxes.tax_row_data).length > 0
    ) {
      if (store.stores_list !== undefined) {
        var stores = store.stores_list;
        (taxes.tax_row_data.stores || []).map((ite) => {
          return (stores = stores.slice().map((item) => {
            if (item._id === ite) {
              return {
                ...item,
                isSelected: true,
              };
            }
            return item;
          }));
        });
        setStoreId(stores);
        // const data = {
        //   storeId: JSON.stringify(
        //     stores
        //       .filter((item) => item.isSelected === true)
        //       .map((item) => item._id)
        //   ),
        // };
        // dispatch(get_catgeory_item(data));
      }

      setFields({
        ...fields,
        tax_name: taxes.tax_row_data ? taxes.tax_row_data.title || "" : "",
        tax_rate: taxes.tax_row_data ? taxes.tax_row_data.tax_rate || 0 : 0,
        checkedAll:
          stores.filter((item) => item.isSelected === true).length ===
            store.stores_list.length && store.stores_list.length > 0
            ? true
            : false,
      });
    }
  }, [store.stores_list, taxes.tax_row_data]);

  useEffect(() => {
    if (
      (taxes.tax_category_list !== undefined &&
        taxes.tax_category_list.length > 0) ||
      (taxes.category_items !== undefined && taxes.category_items.length > 0)
    ) {
      if (
        taxes.tax_row_data !== undefined &&
        Object.keys(taxes.tax_row_data).length > 0
      ) {
        setChecked(
          taxes.tax_row_data.items.length > 0 ||
            taxes.tax_row_data.categories.length > 0
            ? true
            : false
        );
      }
    } 
    let dine = taxes.tax_row_data.dinings;
    if(typeof dine !== "undefined"){
      if(dine.length > 0){
        setChecked(true)
      }
    }
  }, [taxes.tax_row_data && taxes.tax_category_list && taxes.category_items]);

  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  const goBack = () => {
    props.goBack();
    setChecked(!sChecked);
    dispatch(remove_row_update_data());
  };
  const updateItemTax = (e) => {
    e.preventDefault();
    if (fields.tax_name === "") {
      setErrors({
        ...errors,
        tax_name: true,
      });
      return false;
    }
    const selectedStore = [];
    storeId
      .filter((item) => item.isSelected === true)
      .map((item) => {
        // return selectedStore.push({
        //   storeId: item._id,
        //   storeTitle: item.title,
        // });
        return selectedStore.push(item._id);
      });
    const selectedDining = [];
    taxes.tax_dining_list
      .filter((item) => item.isSelected === true)
      .map((item) => {
        // return selectedDining.push({
        //   diningId: item._id,
        //   diningTitle: item.title,
        // });
        return selectedDining.push(item._id);
      });
    const selectedCategory = [];
    taxes.tax_category_list
      .filter((item) => item.isSelected === true)
      .map((item) => {
        // return selectedCategory.push({
        //   categoryId: item._id,
        //   categoryTitle: item.catTitle,
        // });
        return selectedCategory.push(item._id);
      });
    const selectedCategoryItems = [];
    taxes.category_items
      .filter((item) => item.isSelected === true)
      .map((item) => {
        // return selectedCategoryItems.push({
        //   itemId: item._id,
        //   itemName: item.name,
        //   categoryId:
        //     item.category !== undefined && item.category !== null
        //       ? item.category.id
        //       : "0",
        // });
        return selectedCategoryItems.push(item._id);
      });
    const types = (taxes.tax_types || []).filter(
      (item) => item._id === taxTypeId
    );
    const options = (taxes.tax_options || []).filter(
      (item) => item._id === taxOptionId
    );
    const data = {
      id: taxes.tax_row_data._id || 0,
      title: fields.tax_name,
      tax_rate: fields.tax_rate,
      tax_type: types[0] ? types[0]._id : "",
      tax_option:
        options.length === 0
          ? ""
          : options[0]._id || "0",
      // tax_type: JSON.stringify({
      //   id: types[0] ? types[0]._id : "",
      //   title: types[0] ? types[0].title : "",
      // }),
      // tax_option:
      //   options.length === 0
      //     ? JSON.stringify({ id: "0", title: "-" })
      //     : JSON.stringify({
      //         id: options[0]._id || "0",
      //         title: options[0].title || "-",
      //       }),
      stores: selectedStore,
      dinings: selectedDining,
      categories: typeof selectedCategory[0] !== "undefined" &&  selectedCategory[0] == "0" ? [] : selectedCategory,
      items: selectedCategoryItems,
    };
    
    dispatch(update_item_tax(data));
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
  const typeHandleChange = (e) => {
    setTaxType(e.target.value);
  };
  const optionHandleChange = (e) => {
    setTaxOption(e.target.value);
  };
  const storeHandleChange = (e) => {
    let selectedStore = [];
    if (e.target.value === "0") {
      setFields({
        ...fields,
        checkedAll: !fields.checkedAll,
      });
      selectedStore = storeId.slice().map((item) => {
        return {
          ...item,
          isSelected: !fields.checkedAll === true ? true : false,
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
      setFields({
        ...fields,
        checkedAll:
          selectedStore.filter((item) => item.isSelected === true).length ===
            store.stores_list.length && store.stores_list.length > 0
            ? true
            : false,
      });
    }

    setStoreId(selectedStore);
  };
  const delete_tax = () => {
    const deleteIds = [taxes.tax_row_data._id || 0];
    dispatch(delete_item_taxes(JSON.stringify(deleteIds)));
  };
  const hideAlert = () => {
    setShowAlert(!showAlert);
  };
  return (
    <React.Fragment>
      <CCard>
        <CCardHeader>
          <h4>
            <strong>Update Tax</strong>
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
                    invalid={errors.tax_name}
                    onBlur={handleOnBlur}
                    value={fields.tax_name}
                  />
                  <CInvalidFeedback style={{ display: "block" }}>
                    {errors.tax_name === true ? "Please Enter Tax Name" : ""}
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
                    invalid={errors.tax_rate}
                    onBlur={handleOnBlur}
                    value={fields.tax_rate}
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
                  onChange={typeHandleChange}
                  invalid={errors.taxTypeId}
                  onBlur={handleOnBlur}
                  value={taxTypeId}
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
                  id="taxOptionId"
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
                      shape="pill"
                      className={"mx-1 float-right"}
                      color={"success"}
                      size="sm"
                      checked={sChecked}
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
              {storeId.filter((item) => item.isSelected).length === 0
                ? "Not Available in Stores"
                : `Available In ${
                    storeId.filter((item) => item.isSelected).length
                  } Stores`}{" "}
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
                      checked={fields.checkedAll}
                      onChange={storeHandleChange}
                    />
                    <CLabel variant="custom-checkbox" htmlFor={"storeId"}>
                      {storeId.filter((item) => !item.isSelected).length === 0
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
        <CCol sm="2" md="4" className="mb-3 mb-xl-0">
          <ConformationAlert
            button_text="Delete"
            heading="Delete Tax"
            section={`Are you sure you want to delete item tax (${fields.tax_name}) ?`}
            buttonAction={delete_tax}
            show_alert={showAlert}
            hideAlert={setShowAlert}
            variant="outline"
            className="btn-pill pull-right"
            color="danger"
            block={true}
          />
        </CCol>
        <CCol sm="2" md="4" className="mb-3 mb-xl-0">
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
        <CCol sm="2" md="4" className="mb-3 mb-xl-0 form-actions">
          <CButton
            block
            type="click"
            variant="outline"
            className="btn-pill pull-right"
            color="success"
            onClick={updateItemTax}
          >
            Update
          </CButton>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default UpdateTax;
