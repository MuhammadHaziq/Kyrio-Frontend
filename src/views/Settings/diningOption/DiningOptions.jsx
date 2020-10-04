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
import {
  get_dining_options,
  update_dining_option,
  get_store_dining,
  redirect_back_dining,
  update_dining_row_data,
  update_dining_option_postion,
} from "../../../actions/settings/diningOptionActions";
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
          return { id: item.id, position: index, title:item.content };
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
    this.props.update_dining_option(data);
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
                        <CRow style={{ marginBottom: "1%" }}>
                          <CCol
                            xs="6"
                            className=" mt-3"
                            style={{
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "rgba(0,0,0,0.54)",
                            }}
                          >
                            Name
                          </CCol>
                          <CCol
                            xs="4"
                            className=" mt-3"
                            style={{
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "rgba(0,0,0,0.54)",
                              marginLeft: "-1.75rem !important",
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
                                        <CRow
                                          onClick={() =>
                                            this.props.update_dining_row_data(
                                              this.props.dining_option_list.filter(
                                                (ite) => ite._id === item.id
                                              )[0]
                                            )
                                          }
                                        >
                                          <CCol sm="6" className="pull-left">
                                            {item.content}
                                          </CCol>
                                          <CCol sm="4">
                                            <CFormGroup
                                              inline
                                              key={index}
                                              className="pull-right"
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
})(DiningOptions);
