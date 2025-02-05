import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInvalidFeedback,
  CFormText,
} from "@coreui/react";
import { MdEmail, MdPhone, MdAddLocation, MdNote } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import { CountryDropdown } from "react-country-region-selector";
import { add_new_customer } from "../../actions/customer/customerActions";
const AddCustomer = (props) => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postal_code: "",
    country: "",
    customerCode: "",
    note: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
    city: false,
    region: false,
    postal_code: false,
    country: false,
    customerCode: false,
    note: false,
  });

  const dispatch = useDispatch();
  const customer = useSelector(
    (state) => state.customerReducers.customerReducer
  );
  useEffect(() => {
    if (
      customer.redirect_customer !== undefined &&
      customer.redirect_customer === true
    ) {
      props.goBack();
    }
  }, [customer.redirect_customer]);

  const goBack = () => {
    props.goBack();
  };

  const submitCustomer = () => {
    if (fields.name === "") {
      setErrors({
        ...errors,
        name: validator.isEmpty(fields.name),
      });
      return false;
    }
    //  else if (fields.email === "") {
    //   setErrors({
    //     ...errors,
    //     email: validator.isEmpty(fields.email),
    //   });
    //   return false;
    // }
    else {
      const data = {
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        address: fields.address,
        city: fields.city,
        region: fields.region,
        postal_code: fields.postal_code,
        country: fields.country,
        customer_code: fields.customerCode,
        note: fields.note,
      };
      dispatch(add_new_customer(data));
    }
  };
  const selectCountry = (val) => {
    setFields({
      ...fields,
      country: val,
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleOnBlur = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: validator.isEmpty(value),
    });
  };
  // const handleOnBlurCountry = (e) => {
  //   setErrors({
  //     ...errors,
  //     country: validator.isEmpty(fields.country) ? true : false,
  //   });
  // };
  return (
    <React.Fragment>
      <CRow className="justify-content-left">
        <CCol md="9" lg="7" xl="6">
          <CCard>
            <CCardBody>
              <CRow>
                <CCol md="12" sm="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Name</CLabel>
                    <CInputGroup>
                      <CInput
                        id="name"
                        name="name"
                        placeholder="Name"
                        onChange={handleOnChange}
                        value={fields.name}
                        invalid={errors.name}
                        onBlur={handleOnBlur}
                      />
                      <CInvalidFeedback>
                        {errors.name === true
                          ? "Please Enter Customer Name"
                          : ""}
                      </CInvalidFeedback>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol md="12">
                  <CFormGroup>
                    <CLabel htmlFor="email">Email</CLabel>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <MdEmail />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleOnChange}
                        invalid={errors.email}
                        onBlur={handleOnBlur}
                        value={fields.email}
                      />
                      <CInvalidFeedback>
                        {errors.email === true ? "Please Enter Email" : ""}
                      </CInvalidFeedback>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol md="12">
                  <CFormGroup>
                    <CLabel> Phone</CLabel>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <MdPhone />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <TextMask
                        mask={[
                          "(",
                          /[1-9]/,
                          /\d/,
                          /\d/,
                          ")",
                          " ",
                          /\d/,
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                        ]}
                        Component={InputAdapter}
                        className={
                          errors.phone === true
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        name="phone"
                        onChange={handleOnChange}
                        value={fields.phone}
                      />
                      <CInvalidFeedback>
                        {errors.phone ? "Please Enter Phone Number" : ""}
                      </CInvalidFeedback>
                    </CInputGroup>

                    <CFormText color="muted">ex. (999) 999-9999</CFormText>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol md="12">
                  <CFormGroup>
                    <CLabel htmlFor="address">Address</CLabel>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <MdAddLocation />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        id="address"
                        name="address"
                        placeholder="Address"
                        onChange={handleOnChange}
                        value={fields.address}
                      />
                      <CInvalidFeedback>
                        {errors.address === true ? "Please Enter Address" : ""}
                      </CInvalidFeedback>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol md="6">
                  <CFormGroup>
                    <CLabel htmlFor="city">City</CLabel>
                    <CInputGroup>
                      <CInput
                        id="city"
                        name="city"
                        placeholder="City"
                        onChange={handleOnChange}
                        value={fields.city}
                      />
                      <CInvalidFeedback>
                        {errors.city === true ? "Please Enter City" : ""}
                      </CInvalidFeedback>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
                <CCol md="6">
                  <CFormGroup>
                    <CLabel htmlFor="region">Region</CLabel>
                    <CInputGroup>
                      <CInput
                        id="region"
                        name="region"
                        placeholder="Region"
                        onChange={handleOnChange}
                        value={fields.region}
                      />
                      <CInvalidFeedback>
                        {errors.region === true ? "Please Enter Region" : ""}
                      </CInvalidFeedback>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol md="6">
                  <CFormGroup>
                    <CLabel htmlFor="postal_code">Postal Code</CLabel>
                    <CInputGroup>
                      <CInput
                        id="postal_code"
                        name="postal_code"
                        placeholder="Postal Code"
                        onChange={handleOnChange}
                        value={fields.postal_code}
                      />
                      <CInvalidFeedback>
                        {errors.postal_code === true
                          ? "Please Enter Postal Code"
                          : ""}
                      </CInvalidFeedback>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
                <CCol md="6">
                  <CFormGroup>
                    <CLabel htmlFor="country">Country</CLabel>
                    <CInputGroup>
                      <CountryDropdown
                        className={
                          errors.country === true
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        placeholder="Country"
                        name="country"
                        value={fields.country}
                        onChange={(val) => selectCountry(val)}
                      />
                      {validator.isEmpty(fields.country) ? (
                        <CInvalidFeedback>
                          Please Select Country
                        </CInvalidFeedback>
                      ) : (
                        ""
                      )}
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol md="12">
                  <CFormGroup>
                    <CLabel htmlFor="customerCode">Customer Code</CLabel>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <MdNote />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        id="customerCode"
                        name="customerCode"
                        placeholder="Customer Code"
                        onChange={handleOnChange}
                        value={fields.customerCode}
                      />
                      <CInvalidFeedback>
                        {errors.customerCode === true
                          ? "Please Enter Customer Code"
                          : ""}
                      </CInvalidFeedback>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol md="12">
                  <CFormGroup>
                    <CLabel htmlFor="note">Note</CLabel>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <MdNote />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        id="note"
                        name="note"
                        placeholder="Note"
                        onChange={handleOnChange}
                        value={fields.note}
                      />
                      <CInvalidFeedback>
                        {errors.note === true ? "Please Enter Note" : ""}
                      </CInvalidFeedback>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
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
                onClick={submitCustomer}
              >
                SAVE
              </CButton>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default AddCustomer;
