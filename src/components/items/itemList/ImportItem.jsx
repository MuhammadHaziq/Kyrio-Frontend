import React, { useState, useEffect, useCallback } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CInputGroup,
  CInvalidFeedback,
  CInputRadio,
  CListGroup,
  CListGroupItem,
  CSwitch,
  CImg,
  CSelect,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import CSVReader from "react-csv-reader";
import { save_csv, get_items_list } from "../../../actions/items/itemActions";
import ShowUploadFileErrors from "./ShowUploadFileErrors";
const ImportItem = (props) => {
  const [addFile, setAddFile] = useState();
  const [uploadFileError, SetUploadFileError] = useState(false);
  const [uploadFieldsError, setUploadErrorFields] = useState({
    sku: [],
    handle: [],
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
      props.goBack();
    }
  }, [item.redirect_itemList]);

  const get_upload_file = (data, fileInfo) => {
    setAddFile(data);
  };
  const save_csv_db = (e) => {
    var handle = [];
    var sku = [];
    addFile.forEach(function (x, index) {
      console.log(x);
      if (x.Handle == "" || x.Handle == null || x.Handle == undefined) {
        handle.push({ index });
      }
      if (x.SKU == "" || x.SKU == null || x.SKU == undefined) {
        sku.push({ index });
      }
    });
    if (handle.length > 0 || sku.length > 0) {
      console.log(handle, sku);
      SetUploadFileError(true);
      setUploadErrorFields({
        ...uploadFieldsError,
        sku: sku,
        handle: handle,
      });
      return false;
    }
    dispatch(save_csv({ csvData: JSON.stringify(addFile) }));
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
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
              <CRow>
                <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                  <a
                    rel={"external"}
                    href="https://help.loyverse.com/help/importing-and-exporting?utm_source=Back%20Office&utm_medium=Exporting%20and%20Importing"
                    target="_blank"
                  >
                    <CButton
                      block
                      variant="outline"
                      className="btn-pill"
                      color="secondary"
                    >
                      Help
                    </CButton>
                  </a>
                </CCol>
                <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                  <CButton
                    block
                    variant="outline"
                    className="btn-pill"
                    color="secondary"
                    onClick={goBack}
                  >
                    BACK
                  </CButton>
                </CCol>
                <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                  <CButton
                    block
                    type="button"
                    variant="outline"
                    className="btn-pill"
                    color="success"
                    onClick={save_csv_db}
                  >
                    Upload
                  </CButton>
                </CCol>
              </CRow>

            </CCard>
          </CCol>
        </CRow>
      </React.Fragment>
    );
  }
};
export default ImportItem;
