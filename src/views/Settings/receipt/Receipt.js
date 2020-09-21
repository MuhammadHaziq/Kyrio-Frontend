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
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { CIcon } from "@coreui/icons-react";
import { add_new_receipt } from "../../../actions/settings/receiptActions";
const Receipt = (props) => {
  const [checked, setChecked] = useState([false, false]);
  const [fadeReceipt, setFadeReceipt] = useState(true);
  const [timeout, setTimeOut] = useState(300);
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
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

  // Create a reference to the hidden file input element
  // const hiddenFileInput = useRef(null);
  // const hiddenFileInputPrintedReceipt = useRef(null);
  const dispatch = useDispatch();
  const store = useSelector((state) => state.settingReducers.storeReducer);

  const storeHandleChange = (e) => {
    setSelectedStoreId(e.target.value);
  };
  const goBack = () => {
    setFadeReceipt(true);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadReceiptImage = (e) => {
    setrReceiptFile(e.target.files[0]);
    setReceiptImage(URL.createObjectURL(e.target.files[0]));
  };

  const uploadPrintedReceiptImage = (e) => {
    setPrintedReceiptFile(e.target.files[0]);
    setPrintedReceiptImage(URL.createObjectURL(e.target.files[0]));
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
  const saveReceipt = (e) => {
    let data = new FormData();

    data.append("receiptImage", receiptFile);
    data.append("printedReceiptImage", printedReceiptFile);
    data.append("footer", values.footer);
    data.append("header", values.header);
    data.append("show_customer_info", checked[0]);
    data.append("show_comments", checked[1]);
    data.append("language", selectedLanguage);
    data.append("storeId", selectedStoreId);
    console.log(...data);
    dispatch(add_new_receipt(data));
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
                        custom
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
                    lg="2"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <p>Emailed receipt</p>
                    <CLabel htmlFor="upload-button-receipt">
                      {receiptImage !== null ? (
                        <CImg
                          src={receiptImage}
                          alt=""
                          width="100px"
                          height="80px"
                        />
                      ) : (
                        <CIcon name="cil-file" height="80px" />
                      )}
                    </CLabel>
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
                      style={{ display: isHovered ? "block" : "none" }}
                    >
                      UPLOAD
                    </CButton>
                  </CCol>
                  <CCol
                    xs="6"
                    lg="2"
                    onMouseEnter={() => setPrintedReceiptHover(true)}
                    onMouseLeave={() => setPrintedReceiptHover(false)}
                  >
                    <p>Printed receipt</p>
                    <CLabel htmlFor="upload-button-printed-receipt">
                      {printedReceiptImage !== null ? (
                        <CImg
                          src={printedReceiptImage}
                          alt=""
                          width="100px"
                          height="80px"
                        />
                      ) : (
                        <CIcon name="cil-file" height="80px" />
                      )}
                    </CLabel>
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
                          required
                          onChange={handleOnChange}
                        />
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
                          required
                          onChange={handleOnChange}
                        />
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
                        custom
                        size="md"
                        name="selectedLanguage"
                        id="selectedLanguage"
                        value={selectedLanguage}
                        onChange={handleSelectedLanguage}
                      >
                        <option value="0">Select Language</option>
                        <option value="English">English</option>
                        <option value="Urdu">Urdu</option>
                        <option value="Korean">Korean</option>
                        <option value="Chinese">Chinese</option>
                      </CSelect>
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
