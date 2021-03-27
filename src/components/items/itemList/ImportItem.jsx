import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CInvalidFeedback,
  CCardFooter,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import CSVReader from "react-csv-reader";
import {
  save_csv,
  get_items_list,
  validate_csv,
} from "../../../actions/items/itemActions";
import ShowUploadFileErrors from "./ShowUploadFileErrors";
const ImportItem = (props) => {
  const [addFile, setAddFile] = useState();
  const [uploadFileError, SetUploadFileError] = useState(false);
  const [uploadFieldsError, setUploadErrorFields] = useState({
    sku: [],
    handle: [],
  });
  const [errors, setErrors] = useState({
    uploadFileError: false,
  });
  const item = useSelector((state) => state.items.itemReducer);

  const dispatch = useDispatch();
  const goBack = () => {
    props.goBack();
  };
  useEffect(() => {
    if (
      item.redirect_itemList !== undefined &&
      item.redirect_itemList === true
    ) {
      props.getItemsOnImport();
      props.goBack();
    }
  }, [item.redirect_itemList]);
  useEffect(() => {
    if (
      item.show_item_import_errors !== undefined &&
      item.show_item_import_errors === true
    ) {
      SetUploadFileError(true);
    }
  }, [item.show_item_import_errors]);

  const get_upload_file = (data, fileInfo) => {
    setErrors({
      ...errors,
      uploadFileError: false,
    });
    console.log(fileInfo);
    setAddFile(data);
  };
  const save_csv_db = (e) => {
    var handle = [];
    var sku = [];
    if (
      typeof addFile === "null" ||
      typeof addFile === "undefined" ||
      addFile.length === 0
    ) {
      setErrors({
        ...errors,
        uploadFileError: true,
      });
      return false;
    } else {
      dispatch(save_csv({ csvData: JSON.stringify(addFile) }));
    }
  };
  const validate_csv_backend = (e) => {
    var handle = [];
    var sku = [];
    if (
      typeof addFile === "null" ||
      typeof addFile === "undefined" ||
      addFile.length === 0
    ) {
      setErrors({
        ...errors,
        uploadFileError: true,
      });
      return false;
    } else {
      dispatch(validate_csv({ csvData: JSON.stringify(addFile) }));
    }
  };
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    // transformHeader: header =>
    //   header
    //     .toLowerCase()
    //     .replace(/\W/g, '_')
  };
  const uploadFileScreen = () => {
    SetUploadFileError(false);
  };
  if (uploadFileError) {
    return (
      <React.Fragment>
        <ShowUploadFileErrors
          goBack={props.goBack}
          uploadFileScreen={uploadFileScreen}
          handle={uploadFieldsError.handle}
          sku={uploadFieldsError.sku}
          errors={item.errors}
        />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <CRow>
          <CCol xs="8" sm="8">
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol sm="12" md="12" lg="12">
                    <div
                      style={{
                        textAlign: "center",
                        padding: "70px",
                        border: "3px dashed #eeeeee",
                        backgroundColor: "#f2f2f2",
                        color: "rgba(0,0,0,0.87)",
                      }}
                    >
                      <CSVReader
                        parserOptions={papaparseOptions}
                        onFileLoaded={(data, fileInfo) =>
                          get_upload_file(data, fileInfo)
                        }
                      />
                      <CInvalidFeedback>
                        {errors.uploadFileError === true
                          ? "Please Select File"
                          : ""}
                      </CInvalidFeedback>
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter>
                <CRow>
                  <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                    <CButton
                      block
                      variant="outline"
                      className="btn-pill"
                      color="danger"
                      onClick={goBack}
                    >
                      CANCEL
                    </CButton>
                  </CCol>
                  <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                    <CButton
                      block
                      type="button"
                      variant="outline"
                      className="btn-pill"
                      color="success"
                      onClick={validate_csv_backend}
                    >
                      Upload
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </React.Fragment>
    );
  }
};
export default ImportItem;
