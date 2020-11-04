import React, { useState, useEffect, useRef } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLink,
  CInputCheckbox,
  CInvalidFeedback,
  CCardFooter,
  CInputRadio,
  CListGroup,
  CListGroupItem,
  CSwitch,
  CImg,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactTags from "react-tag-autocomplete";
import { save_item_variants } from "../../../actions/items/itemActions";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const AddItemVariant = (props) => {
  const reactTags = useRef();
  const dispatch = useDispatch();

  const item = useSelector((state) => state.items.itemReducer);

  const [variantFields, setVariantFields] = useState([
    {
      id: "0",
      optionName: "",
      optionValue: [],
      position: 0,
      price: "",
      cost: 0.0,
      sku: "",
      barcode: "",
    },
  ]);

  const [variantFieldsError, setVariantFieldsError] = useState([
    {
      optionName: false,
      optionValue: false,
    },
  ]);

  useEffect(() => {
    if (props.variants !== undefined && props.variants.length > 0) {
      setVariantFields(props.variants);
      let errors = [];
      props.variants.map((item) => {
        return errors.push({
          optionName: false,
          optionValue: false,
        });
      });
      setVariantFieldsError(errors);
    }
  }, [props]);
  // a little function to help us with reordering the result
  const reorder = (data, startIndex, endIndex) => {
    const result = data;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "rgb(255 255 255)" : "rgb(255 255 255)",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "rgb(255 255 255)" : "rgb(255 255 255)",
    padding: grid,
    // width: 250,
  });

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      variantFields,
      result.source.index,
      result.destination.index
    );
    // const data = {
    //   data: JSON.stringify(
    //     items.map((item, index) => {
    //       return {
    //         id: item.id,
    //         position: index,
    //         optionName: item.optionName,
    //         optionValue: item.optionValue,
    //       };
    //     })
    //   ),
    // };
    // console.log("data", data)
    dispatch(
      save_item_variants(
        items.map((item, index) => {
          return {
            ...item,
            position: index,
          };
        })
      )
    );
    setVariantFields(
      items.map((item, index) => {
        return {
          ...item,
          position: index,
        };
      })
    );
  };

  const addOptions = () => {
    const validateVariantFields = (variantFields || []).filter((item) => {
      return item.optionName.trim() == "";
    });
    const validateVariantValue = (variantFields || []).filter((item) => {
      return item.optionValue.length === 0;
    });
    if (validateVariantFields.length > 0 || validateVariantValue.length > 0) {
      const variantFieldsIndex = (variantFields || []).map((item, index) => {
        if (item.optionName.trim() == "") {
          const data = variantFieldsError.map((ite, indx) => {
            if (index === indx) {
              return {
                ...ite,
                optionName: validator.isEmpty(item.optionName),
                optionValue: item.optionValue.length === 0 ? true : false,
              };
            }
            return ite;
          });
          setVariantFieldsError(data);
        }
      });
    } else {
      setVariantFields([
        ...variantFields,
        {
          id: variantFields.length.toString(),
          optionName: "",
          optionValue: [],
          price: "",
          cost: 0.0,
          sku: "",
          barcode: "",
          position: variantFields.length,
        },
      ]);
      setVariantFieldsError([
        ...variantFieldsError,
        { optionName: false, optionValue: false },
      ]);
    }
  };

  const handleOnChangeVariantField = (idx) => (e) => {
    const { name, value } = e.target;
    const data = variantFields.map((item, index) => {
      if (index === idx) {
        return {
          ...item,
          [name]: value,
        };
      }
      return item;
    });
    setVariantFields(data);
  };

  const variantFieldBlur = (idx) => (e) => {
    const data = variantFieldsError.map((item, index) => {
      if (index === idx) {
        return {
          ...item,
          optionName: validator.isEmpty(variantFields[idx].optionName),
          optionValue: variantFields[idx].optionValue.length > 0,
        };
      }
      return item;
    });
    setVariantFieldsError(data);
  };

  const closeModal = () => {
    setVariantFields([
      { id: "0", optionName: "", optionValue: [], position: 0 },
    ]);
    setVariantFieldsError([
      {
        optionName: false,
        optionValue: false,
      },
    ]);
    props.toggleVariantModal();
  };

  const save_variants = () => {
    dispatch(save_item_variants(variantFields));
    props.toggleVariantModal();
  };

  const onDelete = (i) => {
    console.log(i);

    let variants = this.state.variantFields.slice(0);
    variants.splice(i, 1);
    // this.setState({ tags });
    setVariantFields(variants);
    dispatch(save_item_variants(variants));
  };

  const addNewTag = (idx) => (tag) => {
    const data = variantFields.map((item, index) => {
      if (index === idx) {
        return {
          ...item,
          optionValue: tag,
        };
      }
      return item;
    });
    setVariantFields(data);
  };
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  console.log(variantFieldsError);
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  return (
    <React.Fragment>
      <CModal
        show={props.variantModal}
        onClose={props.toggleVariantModal}
        size="lg"
      >
        <CModalHeader closeButton>Create options</CModalHeader>
        <CModalBody>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  <CRow>
                    <CCol sm="12">
                      <CListGroup>
                        {variantFields.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <CRow>
                                  <CListGroupItem
                                    action
                                    key={index}
                                    style={{
                                      border: "none",
                                    }}
                                  >
                                    <CRow>
                                      <CCol sm="4">
                                        <CFormGroup>
                                          <CInputGroup>
                                            <CInput
                                              id="optionName"
                                              name="optionName"
                                              placeholder="Option Name"
                                              value={item.optionName}
                                              onChange={handleOnChangeVariantField(
                                                index
                                              )}
                                              invalid={
                                                variantFieldsError[index]
                                                  .optionName
                                              }
                                              onBlur={variantFieldBlur(index)}
                                            />
                                            <CInvalidFeedback>
                                              {variantFieldsError[index]
                                                .optionName === true
                                                ? "Please Enter Option Name"
                                                : ""}
                                            </CInvalidFeedback>
                                          </CInputGroup>
                                        </CFormGroup>
                                      </CCol>
                                      <CCol sm="7">
                                        <CFormGroup>
                                          <CInputGroup>
                                            <ReactTagInput
                                              tags={item.optionValue}
                                              onChange={addNewTag(index)}
                                              onBlur={variantFieldBlur(index)}
                                              className={
                                                variantFieldsError[index]
                                                  .optionValue === true
                                                  ? "form-control is-invalid"
                                                  : "form-control"
                                              }
                                              invalid={
                                                variantFieldsError[index]
                                                  .optionValue
                                              }
                                            />
                                          </CInputGroup>
                                        </CFormGroup>
                                        <CInvalidFeedback>
                                          {variantFieldsError[index]
                                            .optionValue === true
                                            ? "Please Enter Option Value"
                                            : ""}
                                        </CInvalidFeedback>
                                      </CCol>
                                      <CCol sm="1">
                                        <CButton
                                          variant="outline"
                                          className="pull-right"
                                          color="danger"
                                          block={false}
                                        >
                                          <CIcon name="cil-trash" />
                                        </CButton>
                                      </CCol>
                                    </CRow>
                                  </CListGroupItem>
                                </CRow>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </CListGroup>
                    </CCol>
                  </CRow>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0 form-actions">
            <CButton
              className="btn-square pull right"
              color="success"
              onClick={addOptions}
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
              ADD OPTION
            </CButton>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={save_variants}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};
export default AddItemVariant;
//
// <CInput
//   id="optionValue"
//   name="optionValue"
//   placeholder="Option Name"
//   value={item.name}
//   onChange={handleOnChangeVariantField(
//     index
//   )}
//   invalid={
//     variantFieldsError[index]
//       .optionValue
//   }
//   onBlur={variantFieldBlur(index)}
// />
// <CInvalidFeedback>
//   {variantFieldsError[index]
//     .optionValue === true
//     ? "Please Enter Option Value"
//     : ""}
// </CInvalidFeedback>
