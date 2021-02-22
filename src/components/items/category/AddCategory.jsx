import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CInputGroup,
  CInvalidFeedback,
  CCardFooter,
  CImg,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { add_new_category } from "../../../actions/items/categoryActions";
const AddCategory = (props) => {
  const [fields, setFields] = useState({
    category_name: "",
    color: "rgb(224, 224, 224)",
  });
  const [errors, setErrors] = useState({
    category_name: false,
  });

  const category = useSelector((state) => state.items.categoryReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      category.redirect_categoryList !== undefined &&
      category.redirect_categoryList === true
    ) {
      props.goBack();
    }
  }, [category.redirect_categoryList]);

  const goBack = () => {
    props.goBack();
  };

  const submitCategory = () => {
    if (fields.category_name === "") {
      setErrors({
        ...errors,
        category_name: validator.isEmpty(fields.category_name),
      });
      return false;
    }

    const data = {
      catTitle: fields.category_name,
      catColor: fields.color,
    };
    dispatch(add_new_category(data));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: validator.isEmpty(value),
    });
  };
  const changeColor = (e) => {
    setFields({
      ...fields,
      color: e,
    });
  };

  const colors = [
    { id: 0, color: "rgb(224, 224, 224)" },
    { id: 1, color: "rgb(244, 67, 54)" },
    { id: 2, color: "rgb(233, 30, 99)" },
    { id: 3, color: "rgb(255, 152, 0)" },
    { id: 4, color: "rgb(205, 220, 57)" },
    { id: 5, color: "rgb(76, 175, 80)" },
    { id: 6, color: "rgb(33, 150, 243)" },
    { id: 7, color: "rgb(156, 39, 176)" },
  ];

  return (
    <React.Fragment>
      <CCard>
        <CCardHeader>
          <h4>
            <strong>Create Category</strong>
          </h4>
        </CCardHeader>

        <CCardBody>
          <CCol md="12">
            <CFormGroup>
              <CLabel htmlFor="store_name">Category Name</CLabel>
              <CInputGroup>
                <CInput
                  id="category_name"
                  name="category_name"
                  placeholder="Category Name"
                  onChange={handleOnChange}
                  value={fields.category_name}
                  invalid={errors.category_name}
                  onBlur={handleOnBlur}
                />
                <CInvalidFeedback>
                  {errors.category_name === true
                    ? "Please Enter Category Name"
                    : ""}
                </CInvalidFeedback>
              </CInputGroup>
            </CFormGroup>
          </CCol>
          <CCol sm="12">
            {colors.map((item, index) => (
              <CCol
                sm="2"
                style={{
                  backgroundColor: `${item.color}`,
                  width: "100px",
                  height: "100px",
                  float: "left",
                }}
                className="ml-2"
                key={index}
                onClick={() => changeColor(item.color)}
              >
                {item.color === fields.color ? (
                  <CImg
                    src="web-category-check.png"
                    alt="image"
                    style={{
                      width: "25px",
                      marginTop: "41px",
                      marginLeft: "19px",
                    }}
                  />
                ) : (
                  ""
                )}
              </CCol>
            ))}
          </CCol>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
              <CButton
                block
                variant="outline"
                className="btn-pill pull-right"
                color="danger"
              >
                BACK
              </CButton>
            </CCol>
            <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0 form-actions">
              <CButton
                block
                type="submit"
                variant="outline"
                className="btn-pill pull-right"
                color="success"
                onClick={submitCategory}
              >
                SAVE
              </CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </React.Fragment>
  );
};

export default AddCategory;
