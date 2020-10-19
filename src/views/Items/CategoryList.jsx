import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardHeader,
  CRow,
  CCol,
  CButton,
  CCardBody,
} from "@coreui/react";
import {
  get_category_list,
  delete_categories,
} from "../../actions/items/categoryActions";
import { useSelector, useDispatch } from "react-redux";
import { CIcon } from "@coreui/icons-react";
import CategoryDatatable from "../../datatables/category/CategoryDatatable";
import ConformationAlert from "../../components/conformationAlert/ConformationAlert";

const CategoryList = (props) => {
  const [showAlert, setShowAlert] = useState(false);

  const category = useSelector((state) => state.items.categoryReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_category_list());
  }, [dispatch]);

  const deleteCategory = () => {
    const category_id = category.category_list
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_categories(JSON.stringify(category_id)));
    console.log(category_id);
  };

  const hideAlert = () => {
    setShowAlert(!showAlert);
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
                <ConformationAlert
                  button_text="Delete"
                  heading="Delete Category"
                  section={`Are you sure you want to delete the Categories (${category.category_list
                    .filter((item) => {
                      return item.isDeleted === true;
                    })
                    .map((item) => {
                      return item.catTitle;
                    })
                    .join(",")}) ?`}
                  buttonAction={deleteCategory}
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
        <CategoryDatatable categories={category.category_list} {...props} />
      </CCardBody>
    </CCard>
  );
};

export default CategoryList;
