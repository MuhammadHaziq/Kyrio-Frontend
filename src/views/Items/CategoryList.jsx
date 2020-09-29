import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardHeader,
  CRow,
  CCol,
  CButton,
  CCardBody,
} from "@coreui/react";
import { get_category_list } from "../../actions/items/categoryActions";
import { useSelector, useDispatch } from "react-redux";
import { CIcon } from "@coreui/icons-react";
import CategoryDatatable from "../../datatables/category/CategoryDatatable";
const CategoryList = (props) => {
  const category = useSelector((state) => state.items.categoryReducer);
  const dispatch = useDispatch();
  console.log("item_list", category);
  // const [items, setItems] = useState(usersData)

  useEffect(() => {
    dispatch(get_category_list());
  }, [dispatch]);

  const deleteCategory = () => {
    const category_id = category.category_list
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    console.log(category_id);
  };
  return (
    <CCard>
      <CCardHeader>Categories Detail</CCardHeader>
      <CCardBody>
        {category.category_list.filter((item) => item.isDeleted === true)
          .length > 0 ? (
          <React.Fragment>
            <CRow>
              <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  variant="outline"
                  className="ml-2"
                  color="danger"
                  onClick={deleteCategory}
                >
                  <CIcon name="cil-trash" />
                  DELETE
                </CButton>
              </CCol>
            </CRow>
          </React.Fragment>
        ) : (
          ""
        )}
        <CategoryDatatable categories={category.category_list} {...props} />
      </CCardBody>
    </CCard>
  );
};

export default CategoryList;
