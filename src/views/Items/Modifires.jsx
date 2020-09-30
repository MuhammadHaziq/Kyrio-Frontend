import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CSelect,
  CFormGroup,
  CCardHeader,
  CCardBody,
  CButton,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { get_stores } from "../../actions/settings/storeActions";
import {
  get_modifires_list,
  delete_modifire,
} from "../../actions/items/modifiresActions";
import ModifireList from "../../components/items/ModifireList";
const Modifires = (props) => {
  const dispatch = useDispatch();

  const [selectedStoreId, setSelectedStoreId] = useState();

  const auth = useSelector((state) => state.auth);
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const modifire = useSelector((state) => state.items.modifiresReducer);

  useEffect(() => {
    setSelectedStoreId(auth.user.stores[0]._id);
    if (auth.user.stores.length > 0 && auth.user.stores !== undefined) {
      dispatch(get_modifires_list(auth.user.stores[0]._id));
    }
  }, [auth, dispatch]);

  useEffect(() => {
    dispatch(get_stores());
  }, [dispatch]);

  const storeHandleChange = (e) => {
    setSelectedStoreId(e.target.value);
    dispatch(get_modifires_list(e.target.value));
  };

  const deleteItem = () => {
    const modifire_id = modifire.modifiers_list
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_modifire(JSON.stringify(modifire_id)));
    console.log(modifire_id);
  };

  return (
    <React.Fragment>
      <CRow>
        <CCol xs="12" sm="12">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                  <CButton className="btn-square pull right" color="success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="c-icon c-icon-sm"
                      role="img"
                    >
                      <polygon
                        fill="var(--ci-primary-color, currentColor)"
                        points="440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240"
                        className="ci-primary"
                      ></polygon>
                    </svg>
                    ADD MODIFIRE
                  </CButton>
                  {modifire.modifiers_list.filter(
                    (item) => item.isDeleted === true
                  ).length > 0 ? (
                    <CButton
                      variant="outline"
                      className="ml-2"
                      color="danger"
                      onClick={deleteItem}
                    >
                      <CIcon name="cil-trash" />
                      DELETE
                    </CButton>
                  ) : (
                    ""
                  )}
                </CCol>
                <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                  <CFormGroup>
                    <CSelect
                      custom
                      size="md"
                      name="selectedStoreId"
                      id="selectedStoreId"
                      value={selectedStoreId}
                      onChange={storeHandleChange}
                    >
                      <option value="0">All Store</option>
                      {(store.stores_list || []).map((item) => {
                        return (
                          <option value={item._id} key={item._id}>
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
                <CCol sm="12" lg="12" md="12">
                  <ModifireList
                    modifiers_list={modifire.modifiers_list}
                    {...props}
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default Modifires;
