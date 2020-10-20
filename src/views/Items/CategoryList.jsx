import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardHeader,
  CRow,
  CCol,
  CButton,
  CCardBody,
  CFade,
} from "@coreui/react";
import {
  get_category_list,
  delete_categories,
} from "../../actions/items/categoryActions";
import { useSelector, useDispatch } from "react-redux";
import { CIcon } from "@coreui/icons-react";
import CategoryDatatable from "../../datatables/category/CategoryDatatable";
import ConformationAlert from "../../components/conformationAlert/ConformationAlert";
import AddCategory from "../../components/items/category/AddCategory";
const CategoryList = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [fadeCategory, setFadeCategory] = useState(true);
  const [fadeUpdateStore, setUpdateCategory] = useState(false);
  const [fadeAddCategory, setFadeAddCategory] = useState(false);
  const [timeout] = useState(300);
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

  const addCategory = () => {
    setFadeCategory(false);
    setFadeAddCategory(true);
    setUpdateCategory(false);
    // dispatch(redirect_back_store(false));
  };

  const goBack = () => {
    setFadeCategory(true);
    setFadeAddCategory(false);
    setUpdateCategory(false);
    // dispatch(redirect_back_store(true));
  };

  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeAddCategory ? (
          <CFade timeout={timeout} in={fadeAddCategory}>
            <AddCategory goBack={goBack} />
          </CFade>
        ) : (
          ""
        )}
        {fadeCategory ? (
          <CFade timeout={timeout} in={fadeCategory}>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                    <CButton
                      color="success"
                      className="btn-square pull right"
                      onClick={addCategory}
                    >
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
                      ADD CATEGORY
                    </CButton>
                    {category.category_list.filter(
                      (item) => item.isDeleted === true
                    ).length > 0 ? (
                      <React.Fragment>
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
                          className="ml-2 btn-square"
                          color="danger"
                          block={false}
                        />
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CategoryDatatable
                  categories={category.category_list}
                  {...props}
                />
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

export default CategoryList;
