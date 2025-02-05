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
  CLink,
  CInputCheckbox,
  CInvalidFeedback,
  CCardFooter,
  CListGroup,
  CListGroupItem,
  CSwitch,
  CContainer,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import {
  update_item_discount,
  delete_discount,
} from "../../../actions/items/discountActions";
import ConformationAlert from "../../conformationAlert/ConformationAlert";
import NumberFormat from "react-number-format";
import DiscountIcon from "../../icons/DiscountIcon";
const UpdateDiscount = (props) => {
  const discount = useSelector((state) => state.items.discountReducer);
  const decimal = useSelector((state) => state.auth.user.decimal);

  const [collapse, setCollapse] = useState([true, true]);
  const [restricted_access, setRestrictedAccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [Percentage, setPercentage] = useState(true);
  const [Amount, setAmount] = useState(false);
  const [fields, setFields] = useState({
    discount_name: "",
    discount_value: "",
    disocunt_type: "Percentage",
    checkAll: true,
  });
  const [errors, setErrors] = useState({
    discount_name: false,
    discount_value: false,
    disocunt_type: false,
    checkAll_error: false,
  });
  const [storeId, setStoreId] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      discount.redirect_discountList !== undefined &&
      discount.redirect_discountList === true
    )
      props.goBack();
  }, [discount.redirect_discountList]);

  useEffect(() => {
    if (props.store !== undefined) {
      let stores = props.store;
      if (props.update_item_discount !== undefined) {
        (props.update_item_discount.stores || []).map((ite) => {
          return (stores = stores.slice().map((item) => {
            if (item._id === ite._id) {
              return {
                ...item,
                isSelected: true,
              };
            }
            return item;
          }));
        });
        if (props.update_item_discount.type === "Percentage") {
          setPercentage(true);
        } else {
          setPercentage(false);
        }
        setFields({
          ...fields,
          discount_name: props.update_item_discount.title,
          discount_value: props.update_item_discount.value,
          disocunt_type: props.update_item_discount.type,
          checkAll:
            stores.filter((item) => item.isSelected === true).length ===
              props.store.length && props.store.length > 0
              ? true
              : false,
        });
        setStoreId(stores);
        setRestrictedAccess(props.update_item_discount.restricted);
      }
    }
  }, [props, props.update_item_discount]);

  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };

  const restrictedOnChange = () => {
    setRestrictedAccess(!restricted_access);
  };

  const goBack = () => {
    props.goBack();
  };

  const ReturnNumber = (params) => {
    let num = params;
    num = Number.isInteger(num)
      ? num
      : num !== null
      ? num.replace("$", "")
      : num;
    num = Number.isInteger(num)
      ? num
      : num !== null
      ? num.replace(",", "")
      : num;
    return num;
  };

  const updateDiscount = () => {
    if (storeId.filter((item) => item.isSelected === true).length === 0) {
      alert("Select Store");
    } else if (fields.discount_name === "") {
      setErrors({
        ...errors,
        discount_name: validator.isEmpty(fields.discount_name),
      });
    } else {
      const store = storeId.filter((item) => item.isSelected === true);
      let storeData = [];
      store.map((item) => {
        return storeData.push(item._id);
        // return storeData.push({
        //   id: item._id,
        //   title: item.title,
        // });
      });

      const data = {
        id: props.update_item_discount._id,
        title: fields.discount_name,
        value: ReturnNumber(fields.discount_value),
        type: fields.disocunt_type,
        restricted: restricted_access,
        stores: storeData,
        // store: JSON.stringify(storeId),
      };
      dispatch(update_item_discount(data));
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };
  const handleOnChangeToggle = (type) => {
    if (type === "%") {
      setPercentage(true);
      setAmount(false);
      setFields({
        ...fields,
        disocunt_type: "Percentage",
      });
    } else if (type === "$") {
      setPercentage(false);
      setAmount(true);
      setFields({
        ...fields,
        disocunt_type: "Amount",
      });
    }
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

  const delete_item_discount = () => {
    const data = [props.update_item_discount._id];
    console.log(data);
    dispatch(delete_discount(JSON.stringify(data)));
  };

  // const hideAlert = () => {
  //   setShowAlert(!showAlert);
  // };

  return (
    <React.Fragment>
      <CCard>
        <CCardHeader>
          <CContainer
            className="text-center"
            style={{
              width: "135px",
              height: "135px",
              borderRadius: "70px",
              backgroundColor: "#ec407a",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <DiscountIcon
              style={{
                height: "50px",
                width: "50px",
                background: "#ec407a",
                marginLeft: "25px",
                fill: "aliceblue",
              }}
            />
          </CContainer>
        </CCardHeader>

        <CCardBody>
          <CFormGroup>
            <CCol md="12">
              <CLabel htmlFor="store_name">Discount Name</CLabel>
              <CInputGroup>
                <CInput
                  id="discount_name"
                  name="discount_name"
                  placeholder="Discount Name"
                  onChange={handleOnChange}
                  value={fields.discount_name}
                  invalid={errors.discount_name}
                  onBlur={handleOnBlur}
                />
                <CInvalidFeedback>
                  {errors.discount_name === true
                    ? "Please Enter Discount Name"
                    : ""}
                </CInvalidFeedback>
              </CInputGroup>
            </CCol>
          </CFormGroup>
          <CCol md="12">
            <CRow>
              <CCol sm="2">
                <CLabel>Type</CLabel>
              </CCol>
              <CCol sm="3">
                <CFormGroup variant="custom-checkbox">
                  <CInputCheckbox
                    custom
                    id="percentage"
                    name="percentage"
                    onChange={() => {
                      handleOnChangeToggle("%");
                    }}
                    value={"Percentage"}
                    checked={
                      Percentage || fields.disocunt_type === "Percentage"
                    }
                  />
                  <CLabel variant="custom-checkbox" htmlFor="percentage">
                    Percentage
                  </CLabel>
                </CFormGroup>
              </CCol>
              <CCol sm="3">
                <CFormGroup variant="custom-checkbox">
                  <CInputCheckbox
                    custom
                    id="amount"
                    name="amount"
                    onChange={() => {
                      handleOnChangeToggle("$");
                    }}
                    value={"Amount"}
                    checked={fields.disocunt_type === "Amount"}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="amount">
                    Amount
                  </CLabel>
                </CFormGroup>
              </CCol>
            </CRow>
          </CCol>
          <CFormGroup>
            <CCol md="12">
              <CLabel htmlFor="discount_value">Value</CLabel>
              <CInputGroup>
                <NumberFormat
                  className="form-control"
                  id="discount_value"
                  name="discount_value"
                  placeholder="Value"
                  onChange={handleOnChange}
                  value={fields.discount_value}
                  thousandSeparator={true}
                  allowNegative={false}
                  decimalScale={decimal}
                />
              </CInputGroup>
            </CCol>
          </CFormGroup>
          <CCol sm="12">
            <CListGroup>
              <CListGroupItem
                className="justify-content-between"
                style={{
                  marginBottom: "2%",
                  height: "65px",
                  lineHeight: "0.23",
                  border: "none",
                }}
              >
                <h5>
                  Restricted access
                  <CSwitch
                    className={"mx-1 float-right"}
                    shape="pill"
                    color={"success"}
                    checked={restricted_access}
                    onChange={restrictedOnChange}
                  />
                </h5>
                <p style={{ lineHeight: "normal" }}>
                  Only employees with appropriate access right are able to apply
                  this discount
                </p>
              </CListGroupItem>
            </CListGroup>
          </CCol>
        </CCardBody>
        {collapse[0] && storeId.length > 1 ? (
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
      {storeId.length > 1 ? (
        <CCollapse show={!collapse[0]}>
          <CCard>
            <CCardHeader>
              <h4>
                <strong>Stores</strong>
                <div className="card-header-actions">
                  <CLink
                    className="card-header-action"
                    onClick={() => toggle(0)}
                  >
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
                      Available in all stores
                      {/*{" "}
                    {storeId.filter((item) => item.isSelected !== true)
                      .length === 0
                      ? "UnSelect All"
                      : "Select All"}
                    */}
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
      ) : (
        ""
      )}
      <CRow>
        <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
          <ConformationAlert
            button_text="Delete"
            heading="Delete discount"
            section="Are you sure you want to delete discount?"
            buttonAction={delete_item_discount}
            show_alert={showAlert}
            hideAlert={setShowAlert}
            variant="outline"
            className="btn-pill pull-right"
            color="danger"
            block={true}
          />
        </CCol>
        <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
          <CButton
            block
            variant="outline"
            className="btn-pill pull-right"
            color="default"
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
            onClick={updateDiscount}
          >
            UPDATE
          </CButton>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default UpdateDiscount;
