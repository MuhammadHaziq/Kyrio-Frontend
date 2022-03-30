import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CFormGroup,
  CSelect,
  CFade,
} from "@coreui/react";
import {
  get_discount_list,
  delete_discount,
  redirect_back_discount,
} from "../../actions/items/discountActions";
import DiscountDatatable from "../../datatables/discount/DiscountDatatable.jsx";
import ConformationAlert from "../../components/conformationAlert/ConformationAlert";
import { useSelector, useDispatch } from "react-redux";
import { get_stores } from "../../actions/settings/storeActions";
import AddDiscount from "../../components/items/disocunt/AddDiscount.jsx";
import UpdateDiscount from "../../components/items/disocunt/UpdateDiscount.jsx";
import PlusIcon from "../../components/icons/PlusIcon";
import ItemSplash from "../../components/splashScreen/ItemSplash";
const DiscountList = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState("0");
  const [fadeDiscount, setFadeDiscount] = useState(true);
  const [fadeUpdateDiscount, setUpdateDiscount] = useState(false);
  const [fadeAddDiscount, setFadeAddDiscount] = useState(false);
  const [timeout] = useState(300);
  const discount = useSelector((state) => state.items.discountReducer);
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_discount_list(selectedStoreId));
    dispatch(get_stores());
  }, []);

  useEffect(() => {
    if (
      discount.redirect_update !== undefined &&
      discount.redirect_update === true
    ) {
      setFadeDiscount(false);
      setFadeAddDiscount(false);
      setUpdateDiscount(true);
    }
  }, [discount.redirect_update]);

  const storeHandleChange = (e) => {
    setSelectedStoreId(e.target.value);
    dispatch(get_discount_list(e.target.value));
  };

  const delete_discounts = () => {
    const discount_id = discount.discount_list
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_discount(JSON.stringify(discount_id)));
  };

  const hideAlert = () => {
    setShowAlert(!showAlert);
  };

  const addDicount = () => {
    setFadeDiscount(false);
    setFadeAddDiscount(true);
    setUpdateDiscount(false);
    dispatch(redirect_back_discount(false));
  };

  const goBack = () => {
    setFadeDiscount(true);
    setFadeAddDiscount(false);
    setUpdateDiscount(false);
    dispatch(redirect_back_discount(true));
  };

  return (
    <React.Fragment>
      <div className="animated fadeIn col-sm-12 col-md-10 col-lg-10">
        {fadeUpdateDiscount ? (
          <CFade timeout={timeout} in={fadeUpdateDiscount}>
            <UpdateDiscount
              goBack={goBack}
              store={store.stores_list}
              update_item_discount={discount.update_item_discount}
            />
          </CFade>
        ) : (
          ""
        )}
        {fadeAddDiscount ? (
          <CFade timeout={timeout} in={fadeAddDiscount}>
            <AddDiscount goBack={goBack} store={store.stores_list} />
          </CFade>
        ) : (
          ""
        )}
        {fadeDiscount ? (
          <CFade timeout={timeout} in={fadeDiscount}>
            <CCard>
              {discount?.discount_list?.length !== 0 && (
                <CCardHeader>
                  <CRow>
                    <CCol xs="3" lg="3">
                      <CButton
                        color="success"
                        className="btn-square"
                        onClick={addDicount}
                      >
                        <PlusIcon />
                        ADD DISCOUNT
                      </CButton>
                    </CCol>
                    <CCol xs="2" md="2" xl="xl" className="btn-square pull-left">
                      {discount.discount_list.filter(
                        (item) => item.isDeleted === true
                      ).length > 0 ? (
                        <React.Fragment>
                          <ConformationAlert
                            button_text="Delete"
                            heading="Delete Discount"
                            section={`Are you sure you want to delete the Discount (${discount.discount_list
                              .filter((item) => {
                                return item.isDeleted === true;
                              })
                              .map((item) => {
                                return item.title;
                              })
                              .join(",")}) ?`}
                            buttonAction={delete_discounts}
                            show_alert={showAlert}
                            hideAlert={setShowAlert}
                            variant="outline"
                            className="ml-2"
                            color="danger"
                            block={false}
                          />
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                    </CCol>

                    <CCol
                      xs="7"
                      md="7"
                      xl="xl"
                      className="mb-3 mb-xl-0 pull-right"
                    >
                      <CFormGroup>
                        <CSelect
                          size="md"
                          name="selectStore"
                          id="selectStore"
                          value={selectedStoreId}
                          onChange={storeHandleChange}
                        >
                          <option value="0">All Store</option>
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
              )}
              <CCardBody>
                {discount?.discount_list?.length === 0 ? (<ItemSplash buttonName="ADD DISCOUNT" onClick={addDicount} description={"Create discounts that can be applied at the time of sale."} descriptionLink={"https://help.loyverse.com/help/how-create-and-configure-discounts?utm_source=Back%20Office&utm_medium=Discounts"} title="Discounts" />) : (
                  <DiscountDatatable discount={discount.discount_list} />
                )}
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

export default DiscountList;
