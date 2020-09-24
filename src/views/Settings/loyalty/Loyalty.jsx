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
  const [storeId, setStoreId] = useState();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    setStoreId(auth.user.stores[0] ? auth.user.stores[0]._id : "");
  }, [auth]);

  useEffect(() => {
    if (storeId !== "" && typeof storeId !== "undefined") {
      dispatch(get_loyalty(storeId));
    }
  }, [dispatch, storeId]);

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
