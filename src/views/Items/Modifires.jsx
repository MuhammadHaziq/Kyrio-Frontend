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
  CFade,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { get_stores } from "../../actions/settings/storeActions";
import {
  get_modifires_list,
  delete_modifire,
  redirect_back_modifier,
} from "../../actions/items/modifiresActions";
import ModifireList from "../../components/items/modifier/ModifireList";
import AddModifier from "../../components/items/modifier/AddModifier";
import UpdateModifier from "../../components/items/modifier/UpdateModifier";
import PlusIcon from "../../components/icons/PlusIcon";
import ItemSplash from "../../components/splashScreen/ItemSplash";
const Modifires = (props) => {
  const dispatch = useDispatch();

  const [selectedStoreId, setSelectedStoreId] = useState();
  const [fadeModifier, setFadeModifier] = useState(true);
  const [fadeUpdateModifier, setUpdateModifier] = useState(false);
  const [fadeAddModifier, setFadeAddModifier] = useState(false);
  const [timeout] = useState(300);
  const auth = useSelector((state) => state.auth);
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const modifire = useSelector((state) => state.items.modifiresReducer);

  useEffect(() => {
    setSelectedStoreId(0);
    if (auth.user.stores.length > 0 && auth.user.stores !== undefined) {
      dispatch(get_modifires_list(0));
    }
  }, [auth, dispatch]);
  useEffect(() => {
    if (
      modifire.redirect_update_modifier !== undefined &&
      modifire.redirect_update_modifier === true
    ) {
      setFadeModifier(false);
      setFadeAddModifier(false);
      setUpdateModifier(true);
    }
  }, [modifire.redirect_update_modifier]);
  useEffect(() => {
    dispatch(get_stores());
  }, [dispatch]);

  const storeHandleChange = (e) => {
    setSelectedStoreId(e.target.value);
    dispatch(get_modifires_list(e.target.value));
  };

  const addModifier = () => {
    setFadeModifier(false);
    setFadeAddModifier(true);
    setUpdateModifier(false);
    dispatch(redirect_back_modifier(false));
  };

  const goBack = () => {
    setFadeModifier(true);
    setFadeAddModifier(false);
    setUpdateModifier(false);
    dispatch(redirect_back_modifier(true));
  };

  const deleteItem = () => {
    const modifire_id = modifire.modifiers_list
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_modifire(JSON.stringify(modifire_id)));
  };

  return (
    <React.Fragment>
      <div className="animated fadeIn col-sm-12 col-md-8 col-lg-8">
        {fadeUpdateModifier ? (
          <CFade timeout={timeout} in={fadeUpdateModifier}>
            <UpdateModifier
              goBack={goBack}
              store={store.stores_list}
              modifier_row_data={modifire.modifier_row_data}
            />
          </CFade>
        ) : (
          ""
        )}
        {fadeAddModifier ? (
          <CFade timeout={timeout} in={fadeAddModifier}>
            <AddModifier goBack={goBack} store={store.stores_list} />
          </CFade>
        ) : (
          ""
        )}
        {fadeModifier ? (
          <CFade timeout={timeout} in={fadeModifier}>
            <CCard>
              {modifire?.modifiers_list?.length !== 0 && (<CCardHeader>
                <CRow>
                  <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                    <CButton
                      className="btn-square pull right"
                      color="success"
                      onClick={addModifier}
                    >
                      <PlusIcon />
                      ADD MODIFIER
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
              </CCardHeader>)}
              <CCardBody>
                <CRow>
                  <CCol sm="12" lg="12" md="12">
                    {modifire?.modifiers_list?.length === 0 ? (<ItemSplash buttonName="ADD MODIFIER" onClick={addModifier} description={"Create sets of options that can be applied to items."} descriptionLink={"https://help.loyverse.com/help/how-set-and-apply-modifiers?utm_source=Back%20Office&utm_medium=Modifiers"} title="Item modifiers" />) : (<ModifireList fadeModifier={fadeModifier} {...props} />)}
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CFade>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default Modifires;
