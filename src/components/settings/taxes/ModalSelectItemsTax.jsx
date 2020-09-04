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
import { CIcon } from "@coreui/icons-react";
import {
  toggle_category,
  get_catgeory_item,
} from "../../../actions/settings/taxesActions.js";
import ModalCategoryItemsTax from "./ModalCategoryItemsTax";
const ModalSelectItemsTax = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const taxes = useSelector((state) => state.settingReducers.taxesReducer);

  const [fadeCategory, setFadeCategory] = useState(false);
  const [fadeItems, setFadeItems] = useState(true);
  const [storeId, setStoreId] = useState();
  const [categoryFilter, setCategoryFilter] = useState();
  const [categoryId, setCategoryId] = useState();
  const categoryHandleChange = (e) => {
    const category = props.category.filter(
      (item) => item._id == e.target.value
    );
    let categoryData;
    categoryData = {
      categoryId: category[0]._id,
      categoryName: category[0].catTitle,
    };
    dispatch(toggle_category(categoryData));
  };

  const goBack = () => {
    setFadeCategory(false);
    setFadeItems(true);
  };
  useEffect(() => {
    setStoreId(auth.user.stores[0]._id);
  }, [auth]);
  const getCategoryItems = (id) => {
    const data = {
      storeId: storeId,
      categoryFilter: id,
    };
    setCategoryId(id);
    setFadeCategory(true);
    setFadeItems(false);
    if (id != categoryId) {
      dispatch(get_catgeory_item(data));
    }
  };
  useEffect(() => {
    setFadeCategory(false);
    setFadeItems(true);
  }, [props.show]);
  return (
    <React.Fragment>
      <CModal
        show={props.show}
        onClose={props.toggle}
        closeOnBackdrop={false}
        size="md"
      >
        <CModalHeader closeButton>
          <h4>Select Items</h4>
        </CModalHeader>
        <CModalBody>
          {!fadeCategory ? (
            <React.Fragment>
              <CFormGroup row>
                <CCol md="12">
                  <CListGroup>
                    {props.category.map((item) => (
                      <CListGroupItem>
                        <CFormGroup variant="custom-checkbox" inline>
                          <CInputCheckbox
                            custom
                            name="categoryId"
                            id={"categoryId" + item._id}
                            value={item._id}
                            checked={item.isSelected}
                            onChange={categoryHandleChange}
                          />
                          <CLabel
                            variant="custom-checkbox"
                            htmlFor={"categoryId" + item._id}
                          >
                            {item.catTitle}
                          </CLabel>
                        </CFormGroup>
                        <CIcon
                          className="float-right"
                          name="cil-arrow-right"
                          onClick={() => getCategoryItems(item._id)}
                          style={{ cursor: "pointer" }}
                        />
                        <div
                          style={{
                            color: "rgba(0,0,0,0.54)",
                            marginTop: "-2px",
                            marginLeft: "25px",
                          }}
                        >
                          {taxes.tax_category_list.filter(
                            (item) => item.isSelected == true
                          ).length == 0
                            ? " No items selected"
                            : taxes.tax_category_list.filter(
                                (item) => item.isSelected == true
                              ).length + " items are selected"}
                        </div>
                      </CListGroupItem>
                    ))}
                  </CListGroup>
                </CCol>
              </CFormGroup>
            </React.Fragment>
          ) : (
            ""
          )}
          {!fadeItems ? (
            <ModalCategoryItemsTax category_items={taxes.category_items} />
          ) : (
            ""
          )}
        </CModalBody>
        <CModalFooter>
          {!fadeCategory ? (
            <React.Fragment>
              <CButton color="secondary" variant="ghost" onClick={props.toggle}>
                Cancel
              </CButton>
              <CButton color="primary" variant="ghost" onClick={props.done}>
                Done
              </CButton>{" "}
            </React.Fragment>
          ) : (
            <CButton color="primary" variant="ghost" onClick={goBack}>
              Back
            </CButton>
          )}
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};
export default ModalSelectItemsTax;
