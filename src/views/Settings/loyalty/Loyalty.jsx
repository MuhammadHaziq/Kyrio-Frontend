import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFade,
} from "@coreui/react";
import AddLoyalty from "../../../components/settings/loyalty/AddLoyalty";
import { get_loyalty } from "../../../actions/settings/loyaltyActions";
import { useDispatch, useSelector } from "react-redux";

const Loyalty = () => {
  const [timeout] = useState(300);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_loyalty());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="animated fadeIn">
        <CFade timeout={timeout}>
          <CRow>
            <CCol xs="12" lg="12">
              <CCard>
                <CCardHeader>
                  <h3>Loyalty settings</h3>
                </CCardHeader>
                <CCardBody>
                  <AddLoyalty />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CFade>
      </div>
    </React.Fragment>
  );
};
export default Loyalty;
