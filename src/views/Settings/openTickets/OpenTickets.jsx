import React, { useState, useEffect } from "react";
import  { Redirect } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CFade,
  CSelect,
  CSwitch,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroupAppend,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import {
  add_new_open_ticket,
  redirect_back_ticket,
  get_store_open_ticket,
  delete_open_ticket,
} from "../../../actions/settings/openTicketActions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import validator from "validator";

const OpenTickets = () => {

  const [redirect, setRedirect] = useState(false);
  const [fadeOpenTicket, setFadeOpenTicket] = useState(true);
  const [timeout] = useState(300);
  const [sChecked, setChecked] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState("0");
  const [selectedStoreObject, setSelectedStoreObject] = useState({});
  const [items, setItems] = useState([]);
  const [values, setValues] = useState([]);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const store_tickets = useSelector(
    (state) => state.settingReducers.openTicketReducer.store_ticket
  );
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const auth = useSelector((state) => state.auth);

  const goBack = () => {
    dispatch(redirect_back_ticket(true));
    setItems([]);
    setValues([]);
    setErrors([]);
    setFadeOpenTicket(true);
    setChecked(false);
  };
  useEffect(() => {
    if (store.stores_list !== undefined && store.stores_list.length > 0) {
      const storeObject = store.stores_list.filter((item) => {
        return item._id === auth.user.stores[0]._id;
      });
      const storeId = {
        id: storeObject[0]._id,
        name: storeObject[0].title,
      };
      setSelectedStoreObject(storeId);
      setSelectedStoreId(auth.user.stores[0]._id);
      dispatch(get_store_open_ticket(auth.user.stores[0]._id));
    }
  }, [auth && store.stores_list]);
  useEffect(() => {
    if (Object.keys(store_tickets).length > 0) {
      setChecked(store_tickets.checked);
      setItems(store_tickets.items);
      setValues(store_tickets.values);
      setErrors(store_tickets.errors);
    }
  }, [store_tickets]);
  useEffect(() => {
    let feature = auth.user.features.filter(ftr => ftr.feature.name == "Open tickets")[0].enable
    if(!feature){
      setRedirect(true)
    }
}, []);
  // useEffect(() => {
  //   dispatch(get_store_open_ticket("0"));
  // }, [dispatch]);

  const storeHandleChange = (e) => {
    const storeObject = store.stores_list.filter((item) => {
      return item._id === e.target.value;
    });
    let storeId = {};
    if (e.target.value !== "0") {
      storeId = {
        id: storeObject[0]._id,
        name: storeObject[0].title,
      };
    }

    setSelectedStoreObject(storeId);
    setSelectedStoreId(e.target.value);

    dispatch(get_store_open_ticket(e.target.value));
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...isDragging,
  });
  const getListStyle = (isDraggingOver) => ({
    //background: isDraggingOver ? 'lightblue' : 'lightgrey',
  });

  const getItems = (count) => {
    let data = [1, 2, 3].map((k) => ({
      id: `item-${k}`,
      primary: `item ${k}`,
      secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined,
    }));
    return data;
  };

  const addTicket = (index) => {
    if (index !== 0) {
      for (let id = 1; id < index; id++) {
        if (validator.isEmpty(document.getElementById("ticket" + id).value)) {
          document.getElementById("ticket" + id).focus();
          let errorIndex = id - 1;
          let list = items.map((itm, index) => {
            return index == errorIndex ? true : false;
          });
          setErrors(list);
          return;
        }
      }
    }
    let itemList = items;

    itemList.push({
      id: `item-${itemList.length + 1}`,
      value: "",
    });
    let newTicket = itemList.map((k, index) => ({
      id: `item-${index + 1}`,
      value: k.value,
      ticketId: k.ticketId,
    }));

    let list = newTicket.map((itm) => {
      return false;
    });
    let values = newTicket.map((itm) => {
      return itm.value;
    });
    setValues(values);
    setErrors(list);
    setItems(newTicket);
  };

  // const deleteTicket = (selectedItem, index) => {
  //   let itemList = items;
  //   for (var i = 0; i < itemList.length; i++) {
  //     if (itemList[i].id === selectedItem.id) {
  //       itemList.splice(i, 1);
  //     }
  //   }
  //   setItems(items);
  // };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    const data = reorder(items, result.source.index, result.destination.index);
    const dataValues = reorder(
      values,
      result.source.index,
      result.destination.index
    );
    setItems(data);
    setValues(dataValues);
    for (let id = 1; id <= items.length; id++) {
      if (validator.isEmpty(document.getElementById("ticket" + id).value)) {
        document.getElementById("ticket" + id).focus();
        let errorIndex = id - 1;
        let list = items.map((itm, index) => {
          return index === errorIndex ? true : false;
        });
        const dataError = reorder(
          list,
          result.source.index,
          result.destination.index
        );
        setErrors(dataError);
        return;
      }
    }
  };

  const handleChange = (e, index) => {
    let values = items.map((itm, i) => {
      return i === index ? e.target.value : itm.value;
    });
    let itemList = items.map((itm, i) => {
      return i === index
        ? {
            id: itm.id,
            value:
              e.target.value !== undefined &&
              e.target.value !== null &&
              e.target.value !== ""
                ? e.target.value.trim()
                : "",
            ticketId: itm.ticketId,
          }
        : {
            id: itm.id,
            value: itm.value,
            ticketId: itm.ticketId,
          };
    });
    setItems(itemList);
    setValues(values);
  };

  const saveOpenTicket = () => {
    const sendData = {
      ticket_name: values,
      store: selectedStoreId,
    };
    dispatch(add_new_open_ticket(sendData));
  };
  const deleteSingleOpenTicket = (id, index, selectItemId) => {
    const item = items.filter((item) => {
      return item.id !== selectItemId;
    });
    // setItems(item);
    const data = {
      ticket_id: id,
      ticket_name: (item || []).map((item) => {
        return item.value;
      }),
      store: selectedStoreId,
      selectItemId: selectItemId,
      index: index,
    };
    dispatch(delete_open_ticket(data));
  };
  return (
    <>
    {redirect ? <Redirect to="/" /> : 
    <React.Fragment>
      <div className="animated fadeIn">
        <CFade timeout={timeout} in={fadeOpenTicket}>
          <CRow>
            <CCol xs="12" lg="12">
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                      <h2>Open tickets</h2>
                    </CCol>
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
                  <CRow>
                    <CCol sm="12">
                      <h6 style={{ display: "block" }}>
                        Use predefined tickets
                      </h6>
                      <span>
                        <small>
                          This feature allows you to quickly assign names to
                          open tickets. For example, Table 1, Table 2, etc.
                        </small>
                      </span>
                      <CSwitch
                        shape="pill"
                        className={"mx-1 float-right"}
                        color={"success"}
                        size="sm"
                        checked={sChecked}
                        onChange={() => setChecked(!sChecked)}
                      />
                    </CCol>
                    {sChecked ? (
                      <CCol xs="12" lg="12">
                        {/* Dragable Component */}
                        <DragDropContext onDragEnd={onDragEnd}>
                          <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                              >
                                {items.map((item, index) => (
                                  <Draggable
                                    key={item.id}
                                    draggableId={"draggableID"+item.id}
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
                                          <CCol sm="12" className="mt-2">
                                            <CFormGroup key={index}>
                                              <CInputGroup>
                                                <CInputGroupPrepend>
                                                  <CInputGroupText>
                                                    <CIcon
                                                      name={"cil-align-center"}
                                                    />
                                                  </CInputGroupText>
                                                </CInputGroupPrepend>
                                                <CInput
                                                  type="text"
                                                  invalid={errors[index]}
                                                  id={"ticket" + (index + 1)}
                                                  name={"ticket" + (index + 1)}
                                                  value={values[index]}
                                                  onChange={(e) =>
                                                    handleChange(e, index)
                                                  }
                                                />
                                                <CInputGroupAppend
                                                  onClick={() =>
                                                    deleteSingleOpenTicket(
                                                      item.ticketId,
                                                      index,
                                                      item.id
                                                    )
                                                  }
                                                >
                                                  <CInputGroupText>
                                                    <CIcon name="cil-trash" />
                                                  </CInputGroupText>
                                                </CInputGroupAppend>
                                              </CInputGroup>
                                            </CFormGroup>
                                          </CCol>
                                        </CRow>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                        {/* END Dragable Component */}
                      </CCol>
                    ) : (
                      ""
                    )}
                  </CRow>
                  <CRow>
                    {sChecked ? (
                      <CCol sm xs="12" className="text-center mt-3">
                        <CButton
                          color="info"
                          block
                          className="btn-pill pull-right"
                          variant="outline"
                          onClick={() => addTicket(items.length)}
                        >
                          ADD PREDEFINED TICKET
                        </CButton>
                      </CCol>
                    ) : (
                      ""
                    )}
                    <CCol sm xs="12" className="text-center mt-3">
                      <CButton
                        color="danger"
                        block
                        className="btn-pill pull-right"
                        variant="outline"
                        onClick={goBack}
                      >
                        {sChecked ? "CANCEL" : "BACK"}
                      </CButton>
                    </CCol>
                    <CCol sm xs="12" className="text-center mt-3">
                      <CButton
                        color="success"
                        block
                        className="btn-pill pull-right"
                        variant="outline"
                        onClick={saveOpenTicket}
                      >
                        SAVE
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CFade>
      </div>
    </React.Fragment>
  }</>
  );
};
export default OpenTickets;
