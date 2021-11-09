import React, { useState, useEffect, useRef } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CInputGroup,
  CFormGroup,
  CInput,
  CSelect,
  CLabel,
  CFade,
  CSwitch,
  CImg,
  CInvalidFeedback,
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import CIcon from "@coreui/icons-react";
import {
  add_new_receipt,
  get_receipt,
} from "../../../actions/settings/receiptActions";
import validator from "validator";
import { imageBaseUrl } from "../../../constants/baseUrls";
var languages = require("language-list")();

const Receipt = (props) => {
  const [checked, setChecked] = useState([false, false]);
  const [fadeReceipt, setFadeReceipt] = useState(true);
  const [timeout, setTimeOut] = useState(300);
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [language] = useState(languages.getData());
  const [values, setValues] = useState({
    header: "",
    footer: "",
  });
  const [receiptFile, setrReceiptFile] = useState("");
  const [printedReceiptFile, setPrintedReceiptFile] = useState("");
  const [receiptImage, setReceiptImage] = useState(null);
  const [printedReceiptImage, setPrintedReceiptImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [printedReceiptHover, setPrintedReceiptHover] = useState(false);
  const [errors, setErrors] = useState({
    // header: false,
    // footer: false,
    selectedLanguage: false,
  });
  // Create a reference to the hidden file input element
  // const hiddenFileInput = useRef(null);
  // const hiddenFileInputPrintedReceipt = useRef(null);
  const dispatch = useDispatch();
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const auth = useSelector((state) => state.auth);
  const receiptData = useSelector(
    (state) => state.settingReducers.receiptReducer.receipt_data
  );

  useEffect(() => {
    setSelectedStoreId(auth.user.stores[0] ? auth.user.stores[0]._id : "0");
    dispatch(get_receipt(auth.user.stores[0]._id));
    
  },[])
  useEffect(() => {
    if (
      receiptData !== undefined &&
      receiptData !== null &&
      Object.keys(receiptData).length > 0
    ) {
      setSelectedStoreId(receiptData.store);
      setSelectedLanguage(receiptData.language);
      setValues({
        header: receiptData.header || "",
        footer: receiptData.footer || "",
      });
      setReceiptImage(
        receiptData.receiptImage === ""
          ? null
          : imageBaseUrl + receiptData.receiptImage
      );
      setPrintedReceiptImage(
        receiptData.printedReceiptImage === ""
          ? null
          : imageBaseUrl + receiptData.printedReceiptImage
      );
      setChecked([receiptData.show_customer_info, receiptData.show_comments]);
    } else {
      setSelectedLanguage("en");
    }
  }, [receiptData]);

  const storeHandleChange = (e) => {
    setSelectedStoreId(e.target.value);
    if (selectedStoreId !== e.target.value && e.target.value !== "0") {
      setChecked([false, false]);
      setFadeReceipt(true);
      setTimeOut(300);
      setSelectedLanguage("");
      setValues({
        header: "",
        footer: "",
      });
      setrReceiptFile("");
      setPrintedReceiptFile("");
      setReceiptImage(null);
      setPrintedReceiptImage(null);
      setIsHovered(false);
      setPrintedReceiptHover(false);

      dispatch(get_receipt(e.target.value));
    }

  };
  const goBack = () => {
    setFadeReceipt(true);
  };

  // const toBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });

  const uploadReceiptImage = (e) => {
    if (
      e.target.files !== undefined &&
      e.target.files !== null &&
      e.target.files.length > 0
    ) {
      setrReceiptFile(e.target.files[0]);
      let reader = new FileReader();

      reader.onloadend = () => {
        setReceiptImage(reader.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
    // setReceiptImage(URL.createObjectURL(e.target.files[0]));
  };

  const uploadPrintedReceiptImage = (e) => {
    
    if (
      e.target.files !== undefined &&
      e.target.files !== null &&
      e.target.files.length > 0
    ) {
      setPrintedReceiptFile(e.target.files[0]);
      let reader = new FileReader();

      reader.onloadend = () => {
        setPrintedReceiptImage(reader.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
    // setPrintedReceiptImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSelectedLanguage = (e) => {
    setSelectedLanguage(e.target.value);
  };

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    // hiddenFileInput.current.click();
    document.getElementById("upload-button-receipt").click();
  };

  const handleClickPrintedReceipt = (event) => {
    // hiddenFileInputPrintedReceipt.current.click();
    document.getElementById("upload-button-printed-receipt").click();
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const changeChecked = (tab) => {
    const state = checked.map((x, index) => (tab === index ? !x : x));
    setChecked(state);
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: validator.isEmpty(value),
    });
  };
  const handleOnBlurSelect = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: value === "0" ? true : false,
    });
  };

  const removeSelectedImages = (name) => {
    
    if (name === "printedReceiptImage") {
      setPrintedReceiptImage(null);
    } else {
      setReceiptImage(null);
    }
  };

  const saveReceipt = (e) => {
    if (selectedLanguage === "0") {
      setErrors({
        ...errors,
        selectedLanguage: true,
      });
    } else {
      let data = new FormData();

      data.append("receiptImage", receiptFile);
      // data.append("receiptImagePath", receiptImage);
      data.append("printedReceiptImage", printedReceiptFile);
      // data.append("printedReceiptImagePath", printedReceiptImage);
      data.append("footer", values.footer);
      data.append("header", values.header);
      data.append("show_customer_info", checked[0]);
      data.append("show_comments", checked[1]);
      data.append("language", selectedLanguage);
      data.append("storeId", selectedStoreId);
      // console.log(...data);
      dispatch(add_new_receipt(data));
    }
  };
  return (
    <div className="animated fadeIn">
      <CFade timeout={timeout} in={fadeReceipt}>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol xs="12" lg="6">
                    <h4>Receipt settings</h4>
                  </CCol>
                  <CCol xs="12" lg="6">
                    <CFormGroup>
                      <CSelect
                        size="md"
                        name="selectedStoreId"
                        id="selectedStoreId"
                        value={selectedStoreId}
                        onChange={storeHandleChange}
                      >
                        <option value="0">Select Store</option>
                        {store.stores_list.map((item, index) => {
                          return (
                            <option value={item._id} key={index}>
                              {item.title}
                            </option>
                          );
                        })}
                      </CSelect>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs="12">
                    <h6>Logo</h6>
                  </CCol>
                  <CCol
                    xs="6"
                    lg="4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <p>Emailed receipt</p>

                    {receiptImage !== null ? (
                      <>
                        <div
                          onClick={() => removeSelectedImages("receiptImage")}
                        >
                          <i
                            className="fa fa-times"
                            aria-hidden="true"
                            style={{
                              display: "block",
                              position: "inherit",
                              float: "left",
                            }}
                          ></i>
                        </div>
                        <CImg
                          src={receiptImage}
                          alt=""
                          width="80px"
                          height="80px"
                        />
                      </>
                    ) : (
                      <CLabel htmlFor="upload-button-receipt">
                        <CIcon name="cil-file" height="80px" />
                      </CLabel>
                    )}
                    <CInput
                      type="file"
                      id="upload-button-receipt"
                      onChange={uploadReceiptImage}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    {/*ref={hiddenFileInput}}*/}
                    <CButton
                      color="success"
                      className="btn-square ml-2"
                      outline="true"
                      size="xs"
                      onClick={handleClick}
                      style={{
                        display: isHovered ? "block" : "none",
                        fontSize: "xx-small",
                      }}
                    >
                      UPLOAD
                    </CButton>
                  </CCol>
                  <CCol
                    xs="6"
                    lg="4"
                    onMouseEnter={() => setPrintedReceiptHover(true)}
                    onMouseLeave={() => setPrintedReceiptHover(false)}
                  >
                    <p>Printed receipt</p>
                    {printedReceiptImage !== null ? (
                      <>
                        <div
                          onClick={() =>
                            removeSelectedImages("printedReceiptImage")
                          }
                        >
                          <i
                            className="fa fa-times"
                            aria-hidden="true"
                            style={{
                              display: "block",
                              position: "inherit",
                              float: "left",
                            }}
                          ></i>
                        </div>
                        <CImg
                          src={printedReceiptImage}
                          alt=""
                          width="80px"
                          height="80px"
                        />
                      </>
                    ) : (
                      <CLabel htmlFor="upload-button-printed-receipt">
                        <CIcon name="cil-file" height="80px" />
                      </CLabel>
                    )}
                    <CInput
                      type="file"
                      id="upload-button-printed-receipt"
                      onChange={uploadPrintedReceiptImage}
                      style={{ display: "none" }}
                      accept="image/*"
                    />
                    {/*ref={hiddenFileInputPrintedReceipt}}*/}
                    <CButton
                      color="success"
                      className="btn-square ml-2"
                      outline="true"
                      size="xs"
                      onClick={handleClickPrintedReceipt}
                      style={{
                        display: printedReceiptHover ? "block" : "none",
                        fontSize: "xx-small",
                      }}
                    >
                      UPLOAD
                    </CButton>
                  </CCol>
                </CRow>
                <br />
                <CRow>
                  <CCol xs="12" lg="12">
                    <CFormGroup>
                      <CLabel htmlFor="Header">Header</CLabel>
                      <CInputGroup>
                        <CInput
                          type="text"
                          id="Header"
                          name="header"
                          value={values.header}
                          placeholder="Name"
                          onChange={handleOnChange}
                          // invalid={errors.header}
                          // onBlur={handleOnBlur}
                        />
                        {/*<CInvalidFeedback>
                          {validator.isEmpty(values.header)
                            ? "Please Enter The Header Name"
                            : ""}
                        </CInvalidFeedback>*/}
                      </CInputGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" lg="12">
                    <CFormGroup>
                      <CLabel htmlFor="Footer">Footer</CLabel>
                      <CInputGroup>
                        <CInput
                          type="text"
                          id="Footer"
                          name="footer"
                          placeholder="Name"
                          value={values.footer}
                          onChange={handleOnChange}
                          // invalid={errors.footer}
                          // onBlur={handleOnBlur}
                        />
                        {/*<CInvalidFeedback>
                          {validator.isEmpty(values.footer)
                            ? "Please Enter The Footer  Name"
                            : ""}
                        </CInvalidFeedback>*/}
                      </CInputGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" lg="12">
                    <CFormGroup>
                      <CLabel htmlFor="showCustomer">Show customer info</CLabel>
                      <CSwitch
                        className={"mx-1 float-right"}
                        color={"success"}
                        shape="pill"
                        id="showCustomer"
                        checked={checked[0]}
                        onChange={() => changeChecked(0)}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" lg="12">
                    <CFormGroup>
                      <CLabel htmlFor="showComment">Show comments</CLabel>
                      <CSwitch
                        className={"mx-1 float-right"}
                        color={"success"}
                        shape="pill"
                        id="showComment"
                        checked={checked[1]}
                        onChange={() => changeChecked(1)}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" lg="12">
                    <CFormGroup>
                      <CLabel htmlFor="selectedLanguage">
                        Receipt language
                      </CLabel>
                      <CSelect
                        size="md"
                        name="selectedLanguage"
                        id="selectedLanguage"
                        value={selectedLanguage}
                        onChange={handleSelectedLanguage}
                        invalid={errors.selectedLanguage}
                        onBlur={handleOnBlurSelect}
                      >
                        {language.map((item, index) => {
                          return (
                            <option value={item.code} key={index}>
                              {item.language}
                            </option>
                          );
                        })}
                      </CSelect>
                      <CInvalidFeedback>
                        {errors.selectedLanguage
                          ? "Please Select The Language"
                          : ""}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm xs="12" className="text-center mt-3">
                    <CButton
                      color="danger"
                      block
                      className="btn-pill pull-right"
                      outline="true"
                      onClick={goBack}
                    >
                      CANCEL
                    </CButton>
                  </CCol>
                  <CCol sm xs="12" className="text-center mt-3">
                    <CButton
                      color="success"
                      block
                      className="btn-pill pull-right"
                      outline="true"
                      onClick={saveReceipt}
                    >
                      SAVE
                    </CButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CFade>
    </div>
  );
};

export default Receipt;
