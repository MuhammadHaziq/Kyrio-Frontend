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
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { CIcon } from "@coreui/icons-react";
import {
  toggle_category,
  get_catgeory_item,
  // filter_category_item
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
  const [category_items, setCategoryItems] = useState([]);
  const [search, setSearch] = useState("");

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
    // if (id != categoryId) {
    // const category_items =[]
    if (id === "0") {
      const category_items = taxes.category_items.filter(
        (item) =>
          item.category === null ||
          item.category === undefined ||
          item.category["id"] === id
      );
      setCategoryItems(category_items);
    } else {
      const category_items = taxes.category_items.filter((item) =>
        item.category !== null && item.category !== undefined
          ? item.category["id"] === id
          : item._id === id
      );
      setCategoryItems(category_items);
    }

    // dispatch(filter_category_item(data))
    // dispatch(get_catgeory_item(data));
    // }
  };
  useEffect(() => {
    setFadeCategory(false);
    setFadeItems(true);
  }, [props.show]);

  const handleOnChange = (e) => {
    // setSendCall(!sendCall);
    setSearch(e.target.value);
    const value = e.target.value !== "" ? e.target.value.toUpperCase() : "";
    if (value.trim() !== "") {
      const category_items = taxes.category_items.filter((element) =>
        element.name.toUpperCase().includes(value)
      );
      setFadeCategory(true);
      setFadeItems(false);
      setCategoryItems(category_items);
    } else {
      setFadeCategory(false);
      setFadeItems(true);
    }
  };
  return (
    <React.Fragment>
      <CModal
        show={props.show}
        onClose={props.toggle}
        closeOnBackdrop={false}
        size="lg"
      >
        <CModalHeader closeButton>
          <h4>Select Items</h4>
        </CModalHeader>
        <CModalBody>
          <React.Fragment>
            <CFormGroup>
              <div className="controls">
                <CInputGroup className="input-prepend">
                  <CInput
                    id="prependedInput"
                    size="50"
                    type="text"
                    name="search"
                    placeholder="Search"
                    onChange={handleOnChange}
                  />
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <svg
                        viewBox="0 0 20 20"
                        class="c-icon c-icon-lg"
                        role="img"
                      >
                        <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                      </svg>
                    </CInputGroupText>
                  </CInputGroupPrepend>
                </CInputGroup>
              </div>
            </CFormGroup>
          </React.Fragment>
          {!fadeCategory ? (
            <React.Fragment>
              <CFormGroup row>
                <CCol md="12">
                  <CListGroup>
                    {props.category.map((item, index) => (
                      <CListGroupItem key={index}>
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
                            (ite) =>
                              ite.isSelected === true && ite._id === item._id
                          ).length === 0
                            ? " No items selected"
                            : taxes.tax_category_list.filter(
                                (ite) =>
                                  ite.isSelected == true && item._id === ite._id
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
            <ModalCategoryItemsTax category_items={category_items} />
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
// <ModalCategoryItemsTax category_items={taxes.category_items} />
