import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  CCol,
  CRow,
  CFormGroup,
  CListGroup,
  CListGroupItem,
  CInputCheckbox,
} from "@coreui/react";
// fake data generator
import {
  toggle_modifire_all_select,
  toggle_modifire_single_select,
} from "../../actions/items/modifiresActions";
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
      items: [],
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
        isDeleted: item.isDeleted,
      }));
      this.setState({
        ...this.state,
        items: data,
        checkAll:
          this.props.modifiers_list.filter((item) => {
            return item.isDelected !== false && item.isDeleted;
          }).length === this.props.modifiers_list.length &&
          this.props.modifiers_list.length > 0
            ? true
            : false,
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

  selectAll = (e) => {
    this.setState({
      ...this.state,
      checkAll: !this.state.checkAll,
    });
    this.props.toggle_modifire_all_select(!this.state.checkAll);
  };
  modifireCheckHandle = (e) => {
    const row = this.props.modifiers_list.filter((item) => {
      return item._id === e.target.value;
    })[0];

    this.props.toggle_modifire_single_select(row);
  };

  render() {
    return (
      <React.Fragment>
        <CRow>
          <CCol xs="12">
            <CFormGroup inline className="pull-right">
              <CInputCheckbox
                name="checkAll"
                id={"checkAll"}
                value={0}
                checked={this.state.checkAll}
                onChange={this.selectAll}
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
                <CRow>
                  <CCol sm="12">
                    <CListGroup>
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
                              <CListGroupItem action key={index}>
                                <CFormGroup
                                  inline
                                  key={index}
                                  className="pull-right"
                                >
                                  <CInputCheckbox
                                    name="modifer_id"
                                    id={"modifer_id" + item.id}
                                    value={item.id}
                                    checked={item.isDeleted}
                                    style={{
                                      marginTop: "18px",
                                      marginLeft: "5px",
                                    }}
                                    onChange={this.modifireCheckHandle}
                                  />
                                </CFormGroup>
                                <h6
                                  className="d-flex w-100  justify-content-between"
                                  style={{
                                    marginBottom: "0px",
                                    marginLeft: "29px",
                                    color: "#20202a",
                                  }}
                                >
                                  <b>{item.content}</b>
                                </h6>
                                <small
                                  className="mb-1"
                                  style={{
                                    marginLeft: "45px",
                                    color: "#20202ad1",
                                  }}
                                >
                                  {item.options}
                                </small>
                              </CListGroupItem>
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
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return null;
};
export default connect(mapStateToProps, {
  toggle_modifire_all_select,
  toggle_modifire_single_select,
})(ModifireList);