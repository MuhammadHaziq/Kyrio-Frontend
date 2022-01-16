import React, { useState, useEffect } from "react";
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
  CLink,
  CInputCheckbox,
  CInvalidFeedback,
  CCardFooter,
  CListGroup,
  CListGroupItem,
  CContainer
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  update_modifier,
  delete_modifire,
} from "../../../actions/items/modifiresActions";
import NumberFormat from "react-number-format";
import ConformationAlert from "../../conformationAlert/ConformationAlert";
import ModifierIcon from '../../icons/ModifierIcon'

const UpdateModifier = (props) => {
  const decimal = useSelector((state) => state.auth.user.decimal);

  const [collapse, setCollapse] = useState([true, true]);
  const [fields, setFields] = useState({
    modifier_name: "",
    checkAll: true,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [modifierFields, setModifierFields] = useState([
    { _id: "0", name: "", price: "0", position: 0 },
  ]);
  const [modifierFieldsError, setModifierFieldsError] = useState([
    {
      name: false,
      price: false,
    },
  ]);
  const [errors, setErrors] = useState({
    modifier_name: false,
  });
  const [storeId, setStoreId] = useState([]);
  const [items, setItems] = useState([]);

  const modifier = useSelector((state) => state.items.modifiresReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      modifier.redirect_modifier !== undefined &&
      modifier.redirect_modifier === true
    )
      props.goBack();
  }, [modifier.redirect_modifier]);

  const goBack = () => {
    props.goBack();
  };

  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };

  useEffect(() => {
    if (props.store !== undefined) {
      let stores = props.store;
      let options = [];
      if (props.modifier_row_data !== undefined) {
        (props.modifier_row_data.stores || []).map((ite) => {
          return (stores = stores.slice().map((item) => {
            if (item._id === ite._id) {
              return {
                ...item,
                isSelected: true,
              };
            }
            return item;
          }));
        });
        setFields({
          modifier_name: props.modifier_row_data.title,
          checkAll:
            stores.filter((item) => item.isSelected === true).length ===
              props.store.length && props.store.length > 0
              ? true
              : false,
        });
        let errors = [];
        (props.modifier_row_data.options || []).map((item) => {
          return errors.push({
            name: false,
          });
        });
        setModifierFields(
          props.modifier_row_data.options.map((item) => {
            return {
              ...item,
              price: "$" + item.price,
            };
          })
        );
        setModifierFieldsError(errors);
        setStoreId(stores);
      }
    }
  }, [props, props.modifier_row_data]);
  const ReturnNumber = (params) => {
    let num = params;
    num = Number.isInteger(num) ? num : num.replace("$", "");
    num = Number.isInteger(num) ? num : num.replace(",", "");
    return num;
  };
  const updateModifier = () => {
    if (fields.modifier_name === "") {
      setErrors({
        ...errors,
        modifier_name: validator.isEmpty(fields.modifier_name),
      });
      return false;
    }
    const validateModiferFields = (modifierFields || []).filter((item) => {
      return item.name.trim() == "" || item.price === "";
    });
    if (validator.isEmpty(fields.modifier_name)) {
      setErrors({ modifier_name: validator.isEmpty(fields.modifier_name) });
      return false;
    } else if (validateModiferFields.length > 0) {
      const modifierFieldsIndex = (modifierFields || []).map((item, index) => {
        if (item.name.trim() == "" || item.price === "") {
          const data = modifierFieldsError.map((ite, indx) => {
            if (index === indx) {
              return {
                ...ite,
                name: validator.isEmpty(item.name),
                price: validator.isEmpty(item.price),
              };
            }
            return ite;
          });
          setModifierFieldsError(data);
        }
      });
      return false;
    } else {
      const data = {
        id: props.modifier_row_data._id,
        title: fields.modifier_name,
        options: modifierFields.map((item) => {
          if (item._id == "0") {
            return {
              name: item.name,
              price: ReturnNumber(item.price),
              position: item.position,
            };
          } else {
            return {
              _id: item._id,
              name: item.name,
              price: ReturnNumber(item.price),
              position: item.position,
            };
          }
        }),
        stores: storeId
          .filter((item) => item.isSelected === true)
          .map((ite) => {
            return ite._id
          })
      };
      dispatch(update_modifier(data));
    }
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

  const storeHandleChange = (e) => {
    let selectedStore = [];
    if (e.target.value === "0") {
      setFields({
        ...fields,
        checkAll: !fields.checkAll,
      });
      selectedStore = storeId.slice().map((item) => {
        return {
          ...item,
          isSelected: !fields.checkAll === true ? true : false,
          // !item.isSelected,
        };
      });
    } else {
      selectedStore = storeId.slice().map((item) => {
        if (item._id === e.target.value) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      });
    }
    setFields({
      ...fields,
      checkAll:
        selectedStore.filter((item) => item.isSelected === true).length ===
          props.store.length && props.store.length > 0
          ? true
          : false,
    });

    setStoreId(selectedStore);
  };

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
    background: isDragging ? "rgb(128 128 128 / 0%)" : "rgb(128 128 128 / 0%)",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver
      ? "rgb(128 128 128 / 0%)"
      : "rgb(128 128 128 / 0%)",
    padding: grid,
    // width: 250,
  });

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      modifierFields,
      result.source.index,
      result.destination.index
    );
    const data = {
      data: JSON.stringify(
        items.map((item, index) => {
          return { id: item.id, position: index, title: item.content };
        })
      ),
    };

    setModifierFields(
      items.map((item, index) => {
        return {
          ...item,
          position: index,
        };
      })
    );
  };

  const addOptions = () => {
    const validateModiferFields = (modifierFields || []).filter((item) => {
      return item.name.trim() == "" || item.price === "";
    });
    if (validator.isEmpty(fields.modifier_name)) {
      setErrors({ modifier_name: validator.isEmpty(fields.modifier_name) });
    } else if (validateModiferFields.length > 0) {
      const modifierFieldsIndex = (modifierFields || []).map((item, index) => {
        if (item.name.trim() == "" || item.price == "") {
          const data = modifierFieldsError.map((ite, indx) => {
            if (index === indx) {
              return {
                ...ite,
                name: validator.isEmpty(item.name),
                price: validator.isEmpty(item.price),
              };
            }
            return ite;
          });
          setModifierFieldsError(data);
        }
      });
    } else {
      setModifierFields([
        ...modifierFields,
        {
          _id: "0",
          name: "",
          price: "0",
          position: modifierFields.length,
        },
      ]);
      setModifierFieldsError([...modifierFieldsError, { name: false }]);
    }
  };

  const handleOnChangeModifierField = (idx) => (e) => {
    const { name, value } = e.target;
    const data = modifierFields.map((item, index) => {
      if (index === idx) {
        return {
          ...item,
          [name]: value,
        };
      }
      return item;
    });
    setModifierFields(data);
  };

  const modifierFieldBlur = (idx) => (e) => {
    const data = modifierFieldsError.map((item, index) => {
      if (index === idx) {
        return {
          ...item,
          name: validator.isEmpty(modifierFields[idx].name),
          price: validator.isEmpty(modifierFields[idx].price),
        };
      }
      return item;
    });
    setModifierFieldsError(data);
  };

  const deleteOption = (idx) => {
    const newState = [...modifierFields];
    newState.splice(idx, 1);
    setModifierFields(newState);
  };

  const deleteModifier = () => {
    console.log(props.modifier_row_data._id);
    dispatch(delete_modifire(JSON.stringify([props.modifier_row_data._id])));
  };

  const hideAlert = () => {
    setShowAlert(!showAlert);
  };

  return (
    <React.Fragment>
      <CCard>
        <CCardHeader>
          <CContainer className='text-center' style={{
            width: "135px",
            height: "135px",
            borderRadius: "70px",
            backgroundColor: "#9ccc65",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <ModifierIcon style={{
              height: '50px',
              width: '50px',
              background: '#9ccc65',
              marginLeft: "25px",
              fill: "aliceblue"
            }} />
          </CContainer>
        </CCardHeader>

        <CCardBody>
          <CCol md="12">
            <CFormGroup>
              <CLabel htmlFor="store_name">Modifier Name</CLabel>
              <CInputGroup>
                <CInput
                  id="modifier_name"
                  name="modifier_name"
                  placeholder="Modifier Name"
                  onChange={handleOnChange}
                  value={fields.modifier_name}
                  invalid={errors.modifier_name}
                  onBlur={handleOnBlur}
                />
                <CInvalidFeedback>
                  {errors.modifier_name === true
                    ? "Please Enter Category Name"
                    : ""}
                </CInvalidFeedback>
              </CInputGroup>
            </CFormGroup>
          </CCol>
          <CCol sm="12">
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
                          {modifierFields.map((item, index) => (
                            <Draggable
                              key={item._id}
                              draggableId={"draggableID" + item._id}
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
                                        borderBottom:
                                          "1px solid rgb(118 129 146 / 25%)",
                                      }}
                                    >
                                      <CRow>
                                        <CCol sm="4">
                                          <CFormGroup>
                                            <CInputGroup>
                                              <CInput
                                                id="name"
                                                name="name"
                                                placeholder="Option Name"
                                                value={item.name}
                                                onChange={handleOnChangeModifierField(
                                                  index
                                                )}
                                                invalid={
                                                  modifierFieldsError[index]
                                                    .name
                                                }
                                                onBlur={modifierFieldBlur(
                                                  index
                                                )}
                                              />
                                              <CInvalidFeedback>
                                                {modifierFieldsError[index]
                                                  .name === true
                                                  ? "Please Enter Option Name"
                                                  : ""}
                                              </CInvalidFeedback>
                                            </CInputGroup>
                                          </CFormGroup>
                                        </CCol>
                                        <CCol sm="4">
                                          <CFormGroup>
                                            <CInputGroup>
                                              <NumberFormat
                                                id="price"
                                                name="price"
                                                placeholder="Price"
                                                value={item.price}
                                                thousandSeparator={true}
                                                allowNegative={false}
                                                decimalScale={decimal}
                                                className="form-control"
                                                // invalid={
                                                //   modifierFieldsError[index]
                                                //     .price
                                                // }
                                                onBlur={modifierFieldBlur(
                                                  index
                                                )}
                                                onChange={handleOnChangeModifierField(
                                                  index
                                                )}
                                              />
                                              {/* {modifierFieldsError[index]
                                                .price === true ? (
                                                <CInvalidFeedback
                                                  style={{ display: "block" }}
                                                >
                                                  Please Enter Option Price
                                                </CInvalidFeedback>
                                              ) : null} */}

                                              {/*  <CInput
                                                type="number"
                                                id="price"
                                                name="price"
                                                placeholder="Price"
                                                value={item.price}
                                                onChange={handleOnChangeModifierField(
                                                  index
                                                )}
                                              />
                                              <CInvalidFeedback>

                                                {errors.modifier_name === true
                                                  ? "Please Enter Category Name"
                                                  : ""}

                                              </CInvalidFeedback>*/}
                                            </CInputGroup>
                                          </CFormGroup>
                                        </CCol>
                                        <CCol sm="4">
                                          <CButton
                                            variant="outline"
                                            className="pull-right"
                                            color="danger"
                                            onClick={() => deleteOption(index)}
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
          </CCol>
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
        </CCardBody>
        <CCardFooter>
          <CCard>
            <CCardHeader>
              <h4>
                Stores
                <div className="card-footer-actions float-right">
                  <CLink className="card-footer-action" onClick={() => toggle(0)}>
                    <CIcon
                      name={collapse[0] ? "cil-chevron-bottom" : "cil-chevron-top"}
                    />
                  </CLink>
                </div>
              </h4>
              <span>
                <small>
                  {storeId.filter((item) => item.isSelected === false).length === 0
                    ? "Available in all stores"
                    : storeId.filter((item) => item.isSelected === true).length > 0 ? "Available in selected store" : "Not available in stores"}
                </small>
              </span>
            </CCardHeader>
            <CCollapse show={!collapse[0]}>
              <CCardBody>
                <CFormGroup>
                  <CCol md="3">
                    <CLabel>Select Store</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox
                        custom
                        name="checkAll"
                        id={"checkAll"}
                        value={0}
                        checked={fields.checkAll}
                        onChange={storeHandleChange}
                      />
                      <CLabel variant="custom-checkbox" htmlFor={"checkAll"}>
                        {storeId.filter((item) => item.isSelected === false).length === 0
                          ? "Available in all stores"
                          : storeId.filter((item) => item.isSelected === true).length > 0 ? "Available in selected store" : "Not available in stores"}
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                  <CCol md="8" >
                    {storeId.map((item, index) => (
                      <CFormGroup variant="custom-checkbox" inline key={index} style={{ paddingLeft: "8%", paddingTop: "2%" }}>
                        <CInputCheckbox
                          custom
                          name="storeId"
                          id={"storeId" + item._id}
                          value={item._id}
                          checked={item.isSelected}
                          onChange={storeHandleChange}
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor={"storeId" + item._id}
                        >
                          {item.title}
                        </CLabel>
                      </CFormGroup>
                    ))}
                  </CCol>
                </CFormGroup>
              </CCardBody>
            </CCollapse>
          </CCard>
        </CCardFooter>
      </CCard>
      <CRow>
        <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
          <ConformationAlert
            button_text="Delete"
            heading="Please confirm your action"
            section="Are you sure you want to delete the Modifier?"
            buttonAction={deleteModifier}
            show_alert={showAlert}
            hideAlert={setShowAlert}
            variant="outline"
            className="btn-pill pull-right"
            color="danger"
            block={true}
          />
        </CCol>
        <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
          <CButton
            block
            variant="outline"
            className="btn-pill pull-right"
            color="danger"
            onClick={goBack}
          >
            CANCEL
          </CButton>
        </CCol>
        <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0 form-actions">
          <CButton
            block
            type="submit"
            variant="outline"
            className="btn-pill pull-right"
            color="success"
            onClick={updateModifier}
          >
            UPDATE
          </CButton>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default UpdateModifier;
