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
  update_modifire_postion,
  update_row_data,
  update_modifier_props_postion,
} from "../../../actions/items/modifiresActions";
import { connect } from "react-redux";
import { CIcon } from "@coreui/icons-react";

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
  background:
    that.props.settings.darkMode === true
      ? isDragging
        ? "rgb(128 128 128 / 0%"
        : "rgb(128 128 128 / 0%"
      : // : "rgb(19 18 18 / 42%)"
      isDragging
      ? "rgb(255 255 255)"
      : "rgb(255 255 255)",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background:
    that.props.settings.darkMode === true
      ? isDraggingOver
        ? "rgb(128 128 128 / 0%"
        : "rgb(128 128 128 / 0%"
      : // : "rgb(76 73 73)"
      isDraggingOver
      ? "rgb(255 255 255)"
      : "rgb(255 255 255)",
  padding: grid,
  // width: 250,
});
var that;

class ModifireList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: (this.props.modifiers_list || []).map((item, index) => ({
        id: item._id,
        content: item.title,
        options: (item.options || [])
          .map((item) => {
            return item.name;
          })
          .join(","),
        isDeleted: item.isDeleted ? item.isDeleted : false,
        position: item.position,
      })),
      checkAll:
        (this.props.modifiers_list || []).filter((item) => {
          return item.isDelected !== false && item.isDeleted;
        }).length === this.props.modifiers_list.length &&
        this.props.modifiers_list.length > 0
          ? true
          : false,
      allModifier: this.props.modifiers_list.map((item, index) => ({
        position: item.position,
        accountId: item.accountId,
        created_at: item.created_at,
        created_by: item.created_by,
        deleted: item.deleted,
        deleted_at: item.deleted_at,
        options: item.options,
        stores: item.stores,
        title: item.title,
        type: item.type,
        updated_at: item.updated_at,
        __v: item._v,
        _id: item._id,
      })),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    that = this;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.modifiers_list !== this.props.modifiers_list) {
      const data = (this.props.modifiers_list || []).map((item, index) => ({
        id: item._id,
        content: item.title,
        options: (item.options || [])
          .map((item) => {
            return item.name;
          })
          .join(","),
        isDeleted: item.isDeleted ? item.isDeleted : false,
        position: item.position,
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
        allModifier: (this.props.modifiers_list || []).map((item, index) => ({
          position: item.position,
          accountId: item.accountId,
          created_at: item.created_at,
          created_by: item.created_by,
          deleted: item.deleted,
          deleted_at: item.deleted_at,
          options: item.options,
          stores: item.stores,
          title: item.title,
          type: item.type,
          updated_at: item.updated_at,
          __v: item._v,
          _id: item._id,
        })),
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
    const allModifiers = reorder(
      this.state.allModifier,
      result.source.index,
      result.destination.index
    );
    console.log(items);
    const data = {
      data: JSON.stringify(
        items.map((item, index) => {
          return { id: item.id, position: index, title: item.content };
        })
      ),
    };
    this.props.update_modifire_postion(data);
    this.props.update_modifier_props_postion(allModifiers);
    this.setState({
      // this.state.items
      ...this.state,
      items: items.map((item, index) => {
        return {
          ...item,
          position: index,
        };
      }),
      allModifier: allModifiers.map((item, index) => {
        return {
          ...item,
          position: index,
        };
      }),
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

  get_row_data = (id) => {
    console.log(id);
    this.props.update_row_data(id);
  };
  modifireCheckHandle = (id) => {
    console.log(id);
    const row = this.props.modifiers_list.filter((item) => {
      return item._id === id;
    })[0];

    this.props.toggle_modifire_single_select(row);
  };
  render() {
    console.log("items", this.state.items);
    return (
      <React.Fragment>
        <CRow>
          <CCol xs="12">
            <CFormGroup inline className="pull-left">
              <CInputCheckbox
                name="checkAll"
                id={"checkAll"}
                value={0}
                checked={this.state.checkAll}
                onChange={this.selectAll}
                style={{
                  marginTop: "24px",
                  marginLeft: "29px",
                  bottom: "12px",
                }}
              />
            </CFormGroup>
            <h4
              style={{
                fontWeight: "500",
                color:
                  this.props.settings.darkMode === true
                    ? "rgb(236 236 245 / 82%)"
                    : "rgba(0,0,0,0.54)",
                marginLeft: "50px",
              }}
            >
              {" "}
              Modifier
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
                                  <CCol sm="12">
                                    <CInputCheckbox
                                      name="modifer_id"
                                      id={"modifer_id" + item.id}
                                      value={item.id}
                                      checked={item.isDeleted}
                                      onChange={() =>
                                        this.modifireCheckHandle(item.id)
                                      }
                                      style={{
                                        marginLeft: "0px",
                                      }}
                                    />
                                    <div
                                      onClick={() => this.get_row_data(item.id)}
                                    >
                                      <h6
                                        className="d-flex w-100  justify-content-between"
                                        style={{
                                          marginBottom: "0px",
                                          marginLeft: "29px",
                                          color:
                                            this.props.settings.darkMode ===
                                            true
                                              ? "rgb(236 236 245 / 82%)"
                                              : "#20202a",
                                          marginTop: "-12px",
                                        }}
                                      >
                                        <b>{item.content}</b>
                                      </h6>

                                      <small
                                        className="mb-1"
                                        style={{
                                          marginLeft: "45px",
                                          color:
                                            this.props.settings.darkMode ===
                                            true
                                              ? "rgb(236 236 245 / 82%)"
                                              : "#20202ad1",
                                        }}
                                      >
                                        {item.options}
                                      </small>
                                      <CIcon
                                        style={{
                                          float: "right",
                                        }}
                                        name={"cil-align-center"}
                                      />
                                    </div>
                                  </CCol>
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
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    modifiers_list: state.items.modifiresReducer.modifiers_list,
    settings: state.settings,
  };
};
export default connect(mapStateToProps, {
  toggle_modifire_all_select,
  toggle_modifire_single_select,
  update_modifire_postion,
  update_row_data,
  update_modifier_props_postion
})(ModifireList);
