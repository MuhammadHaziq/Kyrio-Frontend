import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
  CInputCheckbox,
} from "@coreui/react";
// fake data generator

import { connect } from "react-redux";

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
  background: isDragging ? "#80808024" : "#80808024",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver
    ? "rgb(128 128 128 / 6%)"
    : "rgb(128 128 128 / 6%)",
  padding: grid,
  // width: 250,
});

class ModifireList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [false, false],
      fadeModifireOption: true,
      fadeAddModifireOption: false,
      fadeUpdateModifireOption: false,
      items: [],
      selectedStoreId: "",
      checkAll: false,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.modifiers_list !== this.props.modifiers_list) {
      const data = this.props.modifiers_list.map((item, index) => ({
        id: item._id,
        content: item.title,
        options: (item.options || [])
          .map((item) => {
            return item.name;
          })
          .join(","),
      }));
      // isActive: item.isActive,
      this.setState({
        ...this.state,
        items: data,
      });
    }
    if (prevState.selectedStoreId !== this.state.selectedStoreId) {
      const data = {
        storeId: this.state.selectedStoreId,
      }; // this.props.get_store_dining(data);
    }
    if (
      prevProps.redirect_update !== this.props.redirect_update &&
      this.props.redirect_update === true
    ) {
      this.setState({
        fadeModifireOption: false,
        fadeAddModifireOption: false,
        fadeUpdateModifireOption: true,
      });
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
    console.log("onDragEnd", data);
    this.setState({
      items,
    });
  }
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  addDiningOpt = () => {
    this.setState({
      fadeModifireOption: false,
      fadeAddModifireOption: true,
      fadeUpdateModifireOption: false,
    });
    this.props.redirect_back_dining(false);
  };
  goBack = () => {
    this.setState({
      fadeModifireOption: true,
      fadeAddModifireOption: false,
      fadeUpdateModifireOption: false,
    });
    this.props.redirect_back_dining(true);
  };
  storeHandleChange = (e) => {
    this.setState({
      ...this.state,
      selectedStoreId: e.target.value,
    });
  };
  diningHandleCheck = (id) => {
    const items = this.state.items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isActive: !item.isActive,
        };
      }
      return item;
    });
    this.setState({
      ...this.state,
      items,
    });
    const data = {
      data: JSON.stringify(items),
    };
    console.log(data);
  };
  render() {
    return (
      <React.Fragment>
        <CRow style={{ marginBottom: "1%" }}>
          <CCol xs="12">
            <CFormGroup inline className="pull-right">
              <CInputCheckbox
                name="checkAll"
                id={"checkAll"}
                value={0}
                checked={this.state.checkAll}
                style={{
                  marginTop: "24px",
                  marginLeft: "25px",
                }}
              />
            </CFormGroup>
            <h4
              style={{
                fontWeight: "500",
                color: "rgba(0,0,0,0.54)",
                marginLeft: "50px",
              }}
            >
              {" "}
              Modifire
            </h4>
          </CCol>
        </CRow>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                        <CRow onClick={() => console.log(item)}>
                          <CCol sm="12">
                            <CFormGroup
                              inline
                              key={index}
                              className="pull-right"
                            >
                              <CInputCheckbox
                                name="modifer_id"
                                id={"modifer_id" + item.id}
                                value={item.id}
                                checked={item.isActive}
                                style={{ marginTop: "20px", marginLeft: "0px" }}
                              />
                            </CFormGroup>
                            <p style={{ marginLeft: "25px" }}>
                              <b>{item.content}</b>
                              <span>
                                <small
                                  style={{
                                    display: "grid",
                                    marginLeft: "10px",
                                    marginTop: "0px",
                                  }}
                                >
                                  {item.options}
                                </small>
                              </span>
                            </p>
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
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dining_option_list:
      state.settingReducers.diningOptionReducer.dining_option_list,
    redirect_update: state.settingReducers.diningOptionReducer.redirect_update,
    update_data: state.settingReducers.diningOptionReducer.update_data,
    store: state.settingReducers.storeReducer.stores_list,
  };
};
export default connect(mapStateToProps, null)(ModifireList);
