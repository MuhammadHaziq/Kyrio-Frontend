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
const reorder = (data, startIndex, endIndex, storeId) => {
  const result = data;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  // result.map((item) => {
  //   if (item.storeId === storeId) {
  //     console.log("splice", item.data.splice(startIndex, 1)[0]);
  //     return item.data.splice(startIndex, 1);
  //     // return removed.push(item.data.splice(startIndex, 1)[0]);
  //     // return removed;
  //   }
  //   return item;
  //   return item.data.splice(startIndex, 1);
  // });
  // result.map((item) => {
  //   if (item.storeId === storeId) {
  //     return {
  //       ...item,
  //       data: item.data.splice(endIndex, 0, removed),
  //     };
  //   }
  //   return item;
  //   // return item.data.splice(endIndex, 0, removed);
  // });

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
      selectedStoreId: "0",
      click_Check: false,
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.props.get_dining_options();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.dining_option_list !== this.props.dining_option_list &&
      this.props.dining_option_list !== undefined
    ) {
      let result = [];
      // new Set(
      // const storeIds = this.props.dining_option_list.map((item) => {
      //   return item.data.map((ite) => {
      //     ite.stores.map((stor) => {
      //       return stor.storeId;
      //     });
      //   });
      // });
      // console.log(storeIds);
      // );
      this.props.dining_option_list.map((item, index) => {
        return result.push({
          storeId: item.storeId,
          storeName: item.storeName,
          data: item.data.map((ite) =>
            ite.stores.filter((str) => str.storeId === item.storeId).length > 0
              ? {
                  id: ite._id,
                  content: ite.title,
                  isActive: ite.stores
                    .filter((str) => str.storeId === item.storeId)
                    .map((ites) => {
                      return ites.isActive ? ites.isActive : false;
                    })[0],
                  position: ite.stores
                    .filter((str) => str.storeId === item.storeId)
                    .map((ites) => {
                      return ites.position ? ites.position : ite.stores.length;
                    })[0],
                }
              : ""
          ),
        });
      });
      this.setState({
        ...this.state,
        items: result.map((item) => {
          return {
            ...item,
            data: item.data.sort(this.comparePostion),
          };
        }),
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

  comparePostion = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const bandA = a.position;
    const bandB = b.position;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  };

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const storeDinings = this.state.items
      .filter((item) => item.storeId === result.source.droppableId)
      .map((item) => {
        return item.data;
      })[0];
    const items = reorder(
      storeDinings,
      result.source.index,
      result.destination.index,
      result.source.droppableId
    );

    const data = {
      data: JSON.stringify(
        items.map((item, index) => {
          return { id: item.id, position: index, title: item.content };
        })
      ),
      storeId: result.source.droppableId,
    };

    const reorderedDinings = this.state.items.slice().map((item) => {
      if (item.storeId === result.source.droppableId) {
        return {
          ...item,
          data: items,
        };
      }
      return item;
    });

    this.props.update_dining_option_postion(data);
    this.setState({
      ...this.state,
      items: reorderedDinings,
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

  diningHandleCheck = (id, storeId) => {
    let items = this.state.items.slice().map((item) => {
      if (item.storeId === storeId) {
        return {
          ...item,
          data: item.data.map((ite) => {
            if (ite.id === id) {
              return {
                ...ite,
                isActive: !ite.isActive,
              };
            }
            return ite;
          }),
        };
      }
      return item;
    });

    const reorderCheck = items
      .filter((item) => item.storeId === storeId)
      .map((item) => {
        return item.data;
      })[0];
    reorderCheck.sort(this.compare);

    items = items.map((item) => {
      if (item.storeId === storeId) {
        return {
          ...item,
          data: reorderCheck,
        };
      }
      return item;
    });

    this.setState({
      ...this.state,
      items,
    });
    const data = {
      storeId: storeId,
      data: JSON.stringify(
        items
          .filter((item) => item.storeId === storeId)
          .map((item) => {
            return item.data;
          })[0]
      ),
    };
    // const data = {
    //   data: JSON.stringify(items),
    // };
    this.props.update_dining_availablity(data);
  };

  dining_row = (storeId, dining_id) => {
    const data = this.props.dining_option_list
      .filter((item) => item.storeId === storeId)
      .map((item) => {
        return item.data.filter((ite) => ite._id === dining_id);
      })[0][0];
    this.props.update_dining_row_data(data);
  };

  render() {
    console.log(this.state.items);
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
              select_store_id={this.state.selectedStoreId}
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
                  {this.state.items.map((dinings, index) =>
                    (dinings.data || []).length > 0 ? (
                      <React.Fragment>
                        <CCardBody key={index}>
                          <CRow>
                            <CCol>
                              <h4>{dinings.storeName}</h4>
                            </CCol>
                          </CRow>
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
                                <Droppable droppableId={dinings.storeId}>
                                  {(provided, snapshot) => (
                                    <div
                                      {...provided.droppableProps}
                                      ref={provided.innerRef}
                                      style={getListStyle(
                                        snapshot.isDraggingOver
                                      )}
                                    >
                                      <CListGroup>
                                        {dinings.data.map((item, index) =>
                                          item !== "" ? (
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
                                                    provided.draggableProps
                                                      .style
                                                  )}
                                                >
                                                  <CRow>
                                                    <CListGroupItem
                                                      action
                                                      key={index}
                                                    >
                                                      <CCol
                                                        sm="4"
                                                        style={{
                                                          float: "left",
                                                        }}
                                                        onClick={() =>
                                                          this.dining_row(
                                                            dinings.storeId,
                                                            item.id
                                                          )
                                                        }
                                                      >
                                                        {item.content}
                                                      </CCol>
                                                      <CCol
                                                        sm="4"
                                                        style={{
                                                          float: "left",
                                                        }}
                                                      >
                                                        <CInputCheckbox
                                                          name="diningId"
                                                          id={
                                                            "diningId" + item.id
                                                          }
                                                          value={item.id}
                                                          checked={
                                                            item.isActive
                                                          }
                                                          onChange={() =>
                                                            this.diningHandleCheck(
                                                              item.id,
                                                              dinings.storeId
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
                                                        {item.isActive ===
                                                        true ? (
                                                          <CIcon
                                                            style={{
                                                              float: "right",
                                                            }}
                                                            name={
                                                              "cil-align-center"
                                                            }
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
                                          ) : (
                                            ""
                                          )
                                        )}
                                      </CListGroup>

                                      {provided.placeholder}
                                    </div>
                                  )}
                                </Droppable>
                              </DragDropContext>
                            </CCol>
                          </CRow>{" "}
                        </CCardBody>{" "}
                      </React.Fragment>
                    ) : (
                      ""
                    )
                  )}
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
