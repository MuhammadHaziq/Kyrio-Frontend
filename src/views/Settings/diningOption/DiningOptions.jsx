import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CFormGroup,
  CInput,
  CLabel,
  CFade,
  CCollapse,
  CLink,
  CListGroup,
  CListGroupItem,
  CSelect,
} from "@coreui/react";
// fake data generator
import {
  get_dining_options,
  update_dining_option,
  get_store_dining,
} from "../../../actions/settings/diningOptionActions";
import { connect } from "react-redux";
import AddDiningOption from "../../../components/settings/diningOption/AddDiningOption";
// const getItems = (data) =>
//   data.map((item, index) => ({
//     id: item._id,
//     content: item.title,
//   }));

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
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  // width: 250,
});

class DiningOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [false, false],
      fadeDiningOption: true,
      fadeAddDiningOption: false,
      items: [],
      selectedStoreId: "",
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.props.get_dining_options();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dining_option_list !== this.props.dining_option_list) {
      const data = this.props.dining_option_list.map((item, index) => ({
        id: item._id,
        content: item.title,
      }));
      this.setState({
        ...this.state,
        items: data,
      });
    }
    if (prevState.selectedStoreId !== this.state.selectedStoreId) {
      const data = {
        storeId: this.state.selectedStoreId,
      };
      console.log(data);
      this.props.get_store_dining(data);
    }
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
    const data = {
      data: JSON.stringify(items),
    };
    this.props.update_dining_option(data);
    this.setState({
      items,
    });
  }
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  addDiningOpt = () => {
    this.setState({
      fadeDiningOption: false,
      fadeAddDiningOption: true,
    });
  };
  goBack = () => {
    this.setState({
      fadeDiningOption: true,
      fadeAddDiningOption: false,
    });
  };
  storeHandleChange = (e) => {
    this.setState({
      ...this.state,
      selectedStoreId: e.target.value,
    });
  };
  render() {
    console.log("items", this.props.dining_option_list);
    const { timeout, fadeDiningOption, fadeAddDiningOption } = this.state;
    return (
      <React.Fragment>
        {fadeAddDiningOption ? (
          <CFade timeout={timeout} in={fadeAddDiningOption}>
            <AddDiningOption goBack={this.goBack} store={this.props.store} />
          </CFade>
        ) : (
          ""
        )}
        {fadeDiningOption ? (
          <CFade timeout={timeout} in={fadeDiningOption}>
            <CRow>
              <CCol xs="12" lg="12">
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol xs="6" lg="6">
                        <CButton
                          variant="outline"
                          color="primary"
                          className="float-left"
                          onClick={this.addDiningOpt}
                        >
                          DINING OPTION
                        </CButton>
                      </CCol>
                      <CCol xs="6" lg="6">
                        <CFormGroup className="float-right">
                          <CSelect
                            custom
                            size="md"
                            name="selectedStoreId"
                            id="selectStore"
                            value={this.state.selectedStoreId}
                            onChange={this.storeHandleChange}
                          >
                            <option value="0">Select Store</option>
                            {this.props.store.map((item) => {
                              return (
                                <option value={item._id}>{item.title}</option>
                              );
                            })}
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol xs="12" lg="12">
                        <DragDropContext onDragEnd={this.onDragEnd}>
                          <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                              >
                                {this.state.items.map((item, index) => (
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
                                        <CCol sm="12">{item.content}</CCol>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      </CCol>
                    </CRow>{" "}
                  </CCardBody>{" "}
                </CCard>{" "}
              </CCol>{" "}
            </CRow>{" "}
          </CFade>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dining_option_list:
      state.settingReducers.diningOptionReducer.dining_option_list,
    store: state.settingReducers.storeReducer.stores_list,
  };
};
export default connect(mapStateToProps, {
  get_dining_options,
  update_dining_option,
  get_store_dining,
})(DiningOptions);