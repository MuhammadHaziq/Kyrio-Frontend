import React, { useState, useEffect } from "react";
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormGroup,
  CCol,
  CInputCheckbox,
  CLabel,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { toggle_dinings } from "../../../actions/settings/taxesActions.js";
const ModalSelectDiningOption = (props) => {
  const dispatch = useDispatch();
  const [diningId, setDiningId] = useState([]);
  const diningHandleChange = (e) => {
    const dining = props.dining.filter((item) => item._id == e.target.value);
    let diningData;
    diningData = {
      diningId: dining[0]._id,
      diningName: dining[0].title,
    };
    dispatch(toggle_dinings(diningData));
    // if (diningId.length == 0) {
    //   setDiningId([diningData]);
    // } else {
    //   const checkExist = diningId.filter(
    //     (item) => item.diningId == dining[0]._id
    //   );
    //   if (checkExist.length == 0) {
    //     setDiningId([...diningId, diningData]);
    //   } else {
    //     const data = diningId.filter((item) => item.diningId !== dining[0]._id);
    //     setDiningId(data);
    //   }
    // }

    // setDiningId(diningData);
    // setType(e.target.value);
  };
  console.log(props.dining);
  return (
    <React.Fragment>
      <CModal show={props.show} onClose={props.toggle} closeOnBackdrop={false}>
        <CModalHeader closeButton>
          <h4>Select dining options</h4>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row>
            <CCol md="12">
              <CListGroup>
                {props.dining.map((item) => (
                  <CListGroupItem>
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox
                        custom
                        name="diningId"
                        id={"diningId" + item._id}
                        value={item._id}
                        onChange={diningHandleChange}
                      />
                      <CLabel
                        variant="custom-checkbox"
                        htmlFor={"diningId" + item._id}
                      >
                        {item.title}
                      </CLabel>
                    </CFormGroup>
                  </CListGroupItem>
                ))}
              </CListGroup>
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={props.toggle}>
            Cancel
          </CButton>
          <CButton color="primary">Done</CButton>{" "}
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};
export default ModalSelectDiningOption;
