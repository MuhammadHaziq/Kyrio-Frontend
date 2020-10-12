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
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
// fake data generator
import {
  get_dining_options,
  update_dining_option,
  get_store_dining,
  redirect_back_dining,
  update_dining_row_data,
  update_dining_option_postion,
  update_dining_availablity,
} from "../../../actions/settings/diningOptionActions";
import { CIcon } from "@coreui/icons-react";
import { connect } from "react-redux";
import AddDiningOption from "../../../components/settings/diningOption/AddDiningOption";
import UpdateDiningOption from "../../../components/settings/diningOption/UpdateDiningOption";
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
  margin: `-20px 0px 0px`,

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

class DiningOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [false, false],
      fadeDiningOption: true,
      fadeAddDiningOption: false,
      fadeUpdateDiningOption: false,
      items: [],
      selectedStoreId: "",
      click_Check: false,
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
        isActive: item.isActive,
        position: item.position,
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
      };
      this.props.get_store_dining(data);
    }
    if (
      prevProps.redirect_update !== this.props.redirect_update &&
      this.props.redirect_update === true
    ) {
      this.setState({
        fadeDiningOption: false,
        fadeAddDiningOption: false,
        fadeUpdateDiningOption: true,
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
      data: JSON.stringify(
        items.map((item, index) => {
          return { id: item.id, position: index, title: item.content };
        })
      ),
    };
    this.props.update_dining_option_postion(data);
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
      fadeUpdateDiningOption: false,
    });
    this.props.redirect_back_dining(false);
  };
  goBack = () => {
    this.setState({
      fadeDiningOption: true,
      fadeAddDiningOption: false,
      fadeUpdateDiningOption: false,
    });
    this.props.redirect_back_dining(true);
  };
  storeHandleChange = (e) => {
    this.setState({
      ...this.state,
      selectedStoreId: e.target.value,
    });
  };

  compare = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const bandA = a.isActive;
    const bandB = b.isActive;

    let comparison = 0;
    if (bandA > bandB) {
      // comparison = 1;
      comparison = -1;
    } else if (bandA < bandB) {
      comparison = 1;
      // comparison = -1;
    }
    return comparison;
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
    items.sort(this.compare);
    this.setState({
      ...this.state,
      items,
    });
    const data = {
      data: JSON.stringify(items),
    };
    this.props.update_dining_availablity(data);
  };
  render() {
    const {
      timeout,
      fadeDiningOption,
      fadeAddDiningOption,
      fadeUpdateDiningOption,
    } = this.state;
    return (
      <React.Fragment>
        {fadeUpdateDiningOption ? (
          <CFade timeout={timeout} in={fadeUpdateDiningOption}>
            <UpdateDiningOption
              goBack={this.goBack}
              store={this.props.store}
              update_data={this.props.update_data}
            />
          </CFade>
        ) : (
          ""
        )}
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
                          color="success"
                          className="btn-square pull right"
                          onClick={this.addDiningOpt}
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
                          DINING OPTION
                        </CButton>
                      </CCol>
                      <CCol xs="6" lg="6">
                        <CFormGroup>
                          <CSelect
                            custom
                            size="md"
                            name="selectedStoreId"
                            id="selectStore"
                            value={this.state.selectedStoreId}
                            onChange={this.storeHandleChange}
                          >
                            <option value="0">All Stores</option>
                            {this.props.store.map((item, index) => {
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
                      <CCol xs="12" lg="12">
                        <CRow style={{ marginBottom: "2px" }}>
                          <CCol
                            xs="4"
                            style={{
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "rgba(0,0,0,0.54)",
                              marginLeft: "30px",
                              display: "flex",
                            }}
                          >
                            Name
                          </CCol>
                          <CCol
                            xs="4"
                            style={{
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "rgba(0,0,0,0.54)",
                              display: "flex",
                              marginLeft: "-50px",
                            }}
                          >
                            Available
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
                                            <CListGroupItem action key={index}>
                                              <CCol
                                                sm="4"
                                                style={{ float: "left" }}
                                                onClick={() =>
                                                  this.props.update_dining_row_data(
                                                    this.props.dining_option_list.filter(
                                                      (ite) =>
                                                        ite._id === item.id
                                                    )[0]
                                                  )
                                                }
                                              >
                                                {item.content}
                                              </CCol>
                                              <CCol
                                                sm="4"
                                                style={{ float: "left" }}
                                              >
                                                <CInputCheckbox
                                                  name="diningId"
                                                  id={"diningId" + item.id}
                                                  value={item.id}
                                                  checked={item.isActive}
                                                  onChange={() =>
                                                    this.diningHandleCheck(
                                                      item.id
                                                    )
                                                  }
                                                />
                                              </CCol>
                                              <CCol
                                                sm="4"
                                                style={{
                                                  float: "right",
                                                  fontSize: "12px",
                                                }}
                                              >
                                                {index === 0 &&
                                                item.isActive === true
                                                  ? "Default Dining Option"
                                                  : ""}
                                                {item.isActive === true ? (
                                                  <CIcon
                                                    style={{ float: "right" }}
                                                    name={"cil-align-center"}
                                                  />
                                                ) : (
                                                  ""
                                                )}
                                              </CCol>
                                            </CListGroupItem>
                                          </CRow>
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                </CListGroup>

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
    redirect_update: state.settingReducers.diningOptionReducer.redirect_update,
    update_data: state.settingReducers.diningOptionReducer.update_data,
    store: state.settingReducers.storeReducer.stores_list,
  };
};
export default connect(mapStateToProps, {
  get_dining_options,
  update_dining_option,
  get_store_dining,
  redirect_back_dining,
  update_dining_row_data,
  update_dining_option_postion,
  update_dining_availablity,
})(DiningOptions);
