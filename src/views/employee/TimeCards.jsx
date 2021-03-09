import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CFormGroup,
  CCardHeader,
  CCardBody,
  CFade,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CInputCheckbox,
  CLabel,
  CButton,
} from "@coreui/react";
import TimeCardDatatable from "../../datatables/employee/TimeCardDatatable.jsx";
import ConformationAlert from "../../components/conformationAlert/ConformationAlert";
import AddEmployeeTime from "../../components/employee/timeCard/AddEmployeeTime.jsx";
import EditTimeCard from "../../components/employee/timeCard/EditTimeCard.jsx";
import { get_employee_list } from "../../actions/employee/employeeListActions";
import {
  redirect_back_timeCard,
  get_timeCards,
  delete_timeCard,
} from "../../actions/employee/timeCardActions";
import { get_stores } from "../../actions/settings/storeActions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import dateFormat from "dateformat";
import DatetimeRangePicker from "react-bootstrap-datetimerangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

const TimeCards = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const employee = useSelector(
    (state) => state.employeeReducers.employeeListReducer
  );
  const timeCard = useSelector(
    (state) => state.employeeReducers.timeCardReducer
  );
  const [showAlert, setShowAlert] = useState(false);
  const [fadeTimeCard, setFadeTimeCard] = useState(true);
  const [fadeTimeCardUpdate, setTimeCardUpdate] = useState(false);
  const [fadeAddTimeCard, setFadeAddTimeCard] = useState(false);
  const [timeout] = useState(300);
  const [storeId, setStoreId] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: moment(),
    endDate: moment(),
    ranges: {
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Last 7 Days": [moment().subtract(6, "days"), moment()],
      "Last 30 Days": [moment().subtract(29, "days"), moment()],
      "This Month": [moment().startOf("month"), moment().endOf("month")],
      "Last Month": [
        moment().subtract(1, "month").startOf("month"),
        moment().subtract(1, "month").endOf("month"),
      ],
    },
  });
  const [fields, setFields] = useState({
    checkAll: true,
    checkAllEmployee: true,
  });

  // useEffect(() => {
  //   if (store.stores_list.length === 0) {
  //   }
  // }, [dispatch, store.stores_list.length === 0]);
  // useEffect(() => {
  //   if (employee.employee_list.length === 0) {
  //   }
  // }, [dispatch, employee.employee_list.length === 0]);
  useEffect(() => {
    dispatch(get_stores());
    dispatch(get_employee_list());
    dispatch(get_timeCards());
  }, [dispatch]);

  useEffect(() => {
    if (store.stores_list !== undefined && store.stores_list.length > 0) {
      const stores = store.stores_list.slice().map((item) => {
        return {
          ...item,
          isSelected: true,
        };
      });
      setStoreId(stores);
    }
  }, [store.stores_list]);

  useEffect(() => {
    if (
      employee.employee_list !== undefined &&
      employee.employee_list.length > 0
    ) {
      const employees = employee.employee_list.slice().map((item) => {
        return {
          ...item,
          isSelected: true,
        };
      });
      setEmployeeId(employees);
    }
  }, [employee.employee_list]);

  useEffect(() => {
    if (
      timeCard.redirect_update !== undefined &&
      timeCard.redirect_update === true
    ) {
      setFadeTimeCard(false);
      setFadeAddTimeCard(false);
      setTimeCardUpdate(true);
    }
  }, [timeCard.redirect_update]);

  const deleteTimeCard = () => {
    const timeCard_id = timeCard.timeCard_list
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_timeCard(JSON.stringify(timeCard_id)));
    setShowAlert(!showAlert);
  };

  const storeHandleChange = (e) => {
    let selectedStore = [];
    if (e === "0") {
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
        if (item._id === e) {
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
          store.stores_list.length && store.stores_list.length > 0
          ? true
          : false,
    });

    setStoreId(selectedStore);
  };

  const employeeHandleChange = (e) => {
    let selectedEmployees = [];
    if (e === "0") {
      setFields({
        ...fields,
        checkAllEmployee: !fields.checkAllEmployee,
      });
      selectedEmployees = employeeId.slice().map((item) => {
        return {
          ...item,
          isSelected: !fields.checkAllEmployee === true ? true : false,
          // !item.isSelected,
        };
      });
    } else {
      selectedEmployees = employeeId.slice().map((item) => {
        if (item._id === e) {
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
      checkAllEmployee:
        selectedEmployees.filter((item) => item.isSelected === true).length ===
          store.stores_list.length && store.stores_list.length > 0
          ? true
          : false,
    });

    setEmployeeId(selectedEmployees);
  };

  const addTimeCard = () => {
    setFadeTimeCard(false);
    setFadeAddTimeCard(true);
    setTimeCardUpdate(false);
    dispatch(redirect_back_timeCard(false));
  };

  const goBack = () => {
    setFadeTimeCard(true);
    setFadeAddTimeCard(false);
    setTimeCardUpdate(false);
    dispatch(redirect_back_timeCard(true));
    dispatch(get_timeCards());
  };

  let start = dateFormat(dateRange.startDate, "yyyy-mm-dd");
  let end = dateFormat(dateRange.endDate, "yyyy-mm-dd");
  let label = start + " - " + end;
  if (start === end) {
    label = start;
  }

  const handleEvent = (event, picker) => {
    setDateRange({
      ...dateRange,
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
  };

  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeTimeCardUpdate ? (
          <CFade timeout={timeout} in={fadeTimeCardUpdate}>
            <EditTimeCard
              store={store.stores_list}
              goBack={goBack}
              time_card_row_data={timeCard.timeCard_row_data}
            />
          </CFade>
        ) : (
          ""
        )}
        {fadeAddTimeCard ? (
          <CFade timeout={timeout} in={fadeAddTimeCard}>
            <AddEmployeeTime store={store.stores_list} goBack={goBack} />
          </CFade>
        ) : (
          ""
        )}
        {fadeTimeCard ? (
          <React.Fragment>
            <CRow className="mb-3">
              <CCol sm="12" md="2" lg="2">
                <DatetimeRangePicker
                  startDate={dateRange.startDate}
                  endDate={dateRange.endDate}
                  ranges={dateRange.ranges}
                  onEvent={handleEvent}
                  autoApply={true}
                >
                  <CButton style={{ backgroundColor: "white", width: "100%" }}>
                    <span>{label}</span>
                  </CButton>
                </DatetimeRangePicker>
              </CCol>
              <CCol sm="12" md="2" lg="2" xs="12">
                <CDropdown style={{ backgroundColor: "white" }}>
                  <CDropdownToggle caret color="default  btn-block">
                    {" "}
                    {storeId.filter((item) => item.isSelected !== true)
                      .length === 0
                      ? "All Stores"
                      : storeId.filter((item) => item.isSelected === true)
                          .length + " Stores"}
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => storeHandleChange("0")}>
                      {" "}
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox
                          custom
                          name="checkAll"
                          id={"checkAll"}
                          value={0}
                          checked={fields.checkAll}
                        />
                        <CLabel variant="custom-checkbox" htmlFor={"checkAll"}>
                          All Stores
                        </CLabel>
                      </CFormGroup>
                    </CDropdownItem>
                    {(storeId || []).map((item, index) => (
                      <CDropdownItem
                        key={index}
                        onClick={() => storeHandleChange(item._id)}
                      >
                        <CFormGroup
                          variant="custom-checkbox"
                          inline
                          key={index}
                        >
                          <CInputCheckbox
                            custom
                            name="storeId"
                            id={"storeId" + item._id}
                            value={item._id}
                            checked={item.isSelected}
                          />
                          <CLabel
                            variant="custom-checkbox"
                            htmlFor={"storeId" + item._id}
                          >
                            {item.title}
                          </CLabel>
                        </CFormGroup>
                      </CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
              <CCol sm="12" md="2" lg="2" xs="12">
                <CDropdown style={{ backgroundColor: "white" }}>
                  <CDropdownToggle caret color="default btn-block">
                    {" "}
                    {employeeId.filter((item) => item.isSelected !== true)
                      .length === 0
                      ? "All Employees"
                      : employeeId.filter((item) => item.isSelected === true)
                          .length + " Employee"}
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => employeeHandleChange("0")}>
                      {" "}
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox
                          custom
                          name="checkAllEmployee"
                          id={"checkAllEmployee"}
                          value={0}
                          checked={fields.checkAllEmployee}
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor={"checkAllEmployee"}
                        >
                          All Employees
                        </CLabel>
                      </CFormGroup>
                    </CDropdownItem>
                    {(employeeId || []).map((item, index) => (
                      <CDropdownItem
                        key={index}
                        onClick={() => employeeHandleChange(item._id)}
                      >
                        <CFormGroup
                          variant="custom-checkbox"
                          inline
                          key={index}
                        >
                          <CInputCheckbox
                            custom
                            name="employeeId"
                            id={"employeeId" + item._id}
                            value={item._id}
                            checked={item.isSelected}
                          />
                          <CLabel
                            variant="custom-checkbox"
                            htmlFor={"employeeId" + item._id}
                          >
                            {item.name}
                          </CLabel>
                        </CFormGroup>
                      </CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" sm="12">
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol
                        xs="12"
                        sm="4"
                        md="4"
                        xl="xl"
                        className="mb-3 mb-xl-0"
                      >
                        <CButton
                          color="success"
                          className="btn-square pull right"
                          onClick={addTimeCard}
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
                          ADD TIMECARD
                        </CButton>

                        {timeCard.timeCard_list.filter(
                          (item) => item.isDeleted === true
                        ).length > 0 ? (
                          <React.Fragment>
                            <ConformationAlert
                              button_text="Delete"
                              heading="Delete Time Card"
                              section={`Are you sure you want to delete the Time Card?`}
                              buttonAction={deleteTimeCard}
                              show_alert={showAlert}
                              hideAlert={setShowAlert}
                              variant="outline"
                              className="ml-2 btn-square"
                              color="danger"
                              block={false}
                            />
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <TimeCardDatatable
                      timeCard_list={timeCard.timeCard_list}
                      store={store.stores_list}
                    />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default TimeCards;
