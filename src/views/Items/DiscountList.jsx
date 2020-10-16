import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CBadge,
  CRow,
  CCol,
  CButton,
  CFormGroup,
  CSelect,
} from "@coreui/react";
import usersData from "../users/UsersData.js";
import {
  get_discount_list,
  delete_discount,
} from "../../actions/items/discountActions";
import DiscountDatatable from "../../datatables/discount/DiscountDatatable.jsx";
import ConformationAlert from "../../components/conformationAlert/ConformationAlert";
import { useSelector, useDispatch } from "react-redux";
import { get_stores } from "../../actions/settings/storeActions";
const DiscountList = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState("0");

  const discount = useSelector((state) => state.items.discountReducer);
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_discount_list());
    dispatch(get_stores());
  }, []);

  const storeHandleChange = (e) => {
    setSelectedStoreId(e.target.value);
    // dispatch(get_store_pos_device(e.target.value));
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

  return (
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol sm="6"> Discount Detail </CCol>
          <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
            <CFormGroup>
              <CSelect
                custom
                size="md"
                name="selectStore"
                id="selectStore"
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
        {discount.discount_list.filter((item) => item.isDeleted === true)
          .length > 0 ? (
          <React.Fragment>
            <CRow>
              <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
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
              </CCol>
            </CRow>
          </React.Fragment>
        ) : (
          ""
        )}
        <DiscountDatatable discount={discount.discount_list} />
      </CCardBody>
    </CCard>
  );
};

export default DiscountList;
