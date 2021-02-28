import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CFormGroup,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CLabel,
  CButton,
} from "@coreui/react";
import { get_employee_list } from "../../actions/employee/employeeListActions";
import { get_stores } from "../../actions/settings/storeActions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import dateFormat from "dateformat";
import DatetimeRangePicker from "react-bootstrap-datetimerangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import TimePicker from "react-bootstrap-time-picker";
import {
  MdPerson,
  MdStoreMallDirectory,
  MdDateRange,
  MdAvTimer,
} from "react-icons/md";
import {
  change_in_date_time,
  change_in_time,
  stores_change,
  employee_change,
} from "../../actions/dashboard/filterComponentActions";
import $ from "jquery";
const FilterComponent = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const employee = useSelector(
    (state) => state.employeeReducers.employeeListReducer
  );
  const [fields, setFields] = useState({
    checkAll: true,
    checkAllEmployee: true,
    time_filter: 0,
  });
  const [storeId, setStoreId] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);
  const [toggleDropDown, setToggleDropDown] = useState([false, false, false]);
  const [timeRange, setTimeRange] = useState({
    startTime: "0",
    endTime: "0",
  });
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
  const usePrevious = (data) => {
    const ref = React.useRef();
    useEffect(() => {
      ref.current = data;
    }, [data]);
    return ref.current;
  };

  var prevStartTime = usePrevious(timeRange.startTime);
  var prevEndTime = usePrevious(timeRange.endTime);

  var prevStartDate = usePrevious(dateRange.startDate);
  var prevEndDate = usePrevious(dateRange.endDate);

  // var prevCheckAll = usePrevious(fields.checkAll);
  // console.log(prevCheckAll);
  // console.log(fields.checkAll);

  useEffect(() => {
    dispatch(get_stores());
    dispatch(get_employee_list());
  }, [dispatch]);

  useEffect(() => {

    if (prevStartDate !== undefined && prevEndDate !== undefined) {
      console.log(dateRange);
      console.log(prevStartDate, "prevStartDate");
      console.log(prevEndDate, "prevEndDate");
      dispatch(change_in_date_time(dateRange));
    }
  }, [
    (dateRange.startDate !== prevStartDate &&
      dateRange.startDate !== undefined &&
      dateRange.startDate !== null) ||
      (dateRange.endDate !== prevEndDate &&
        dateRange.endDate !== undefined &&
        dateRange.endDate !== null),
  ]);

  // useEffect(() => {
  //   if (prevCheckAll !== fields.checkAll) {
  //     console.log(storeId);
  //   }
  // }, [prevCheckAll, fields.checkAll]);

  useEffect(() => {
    if (store.stores_list !== undefined && store.stores_list.length > 0) {
      const stores = store.stores_list.slice().map((item) => {
        return {
          ...item,
          isSelected: true,
        };
      });
      setStoreId(stores);
      dispatch(
        stores_change(
          store.stores_list.map((item) => {
            return item._id;
          })
        )
      );
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
      dispatch(
        employee_change(
          employee.employee_list.map((item) => {
            return item._id;
          })
        )
      );
      setEmployeeId(employees);
    }
  }, [employee.employee_list]);

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
      dispatch(
        stores_change(
          selectedStore.map((item) => {
            return item._id;
          })
        )
      );
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
      dispatch(
        stores_change(
          selectedStore
            .filter((item) => item.isSelected === true)
            .map((item) => {
              return item._id;
            })
        )
      );
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
    // dispatch(
    //   stores_change(
    //     selectedStore.filter((item) => item.isSelected === true).length ===
    //       store.stores_list.length && store.stores_list.length > 0
    //       ? "0"
    //       : selectedStore
    //           .filter((item) => item.isSelected === true)
    //           .map((item) => item._id)
    //   )
    // );
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
      dispatch(
        employee_change(
          selectedEmployees.map((item) => {
            return item._id;
          })
        )
      );
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
      console.log("selectedEmployees", selectedEmployees);
      dispatch(
        employee_change(
          selectedEmployees
            .filter((item) => item.isSelected === true)
            .map((item) => {
              return item._id;
            })
        )
      );
    }
    setFields({
      ...fields,
      checkAllEmployee:
        selectedEmployees.filter((item) => item.isSelected === true).length ===
          employee.employee_list.length && employee.employee_list.length > 0
          ? true
          : false,
    });

    setEmployeeId(selectedEmployees);
    // dispatch(
    //   employee_change(
    //     selectedEmployees.filter((item) => item.isSelected === true).length ===
    //       employee.employee_list.length && employee.employee_list.length > 0
    //       ? "0"
    //       : selectedEmployees
    //           .filter((item) => item.isSelected === true)
    //           .map((item) => item._id)
    //   )
    // );
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

  const handleOnChange = (e) => {
    setFields({
      ...fields,
      time_filter: e,
    });
  };
  const toggleDropdown = (tab) => {
    const state = toggleDropDown.map((x, index) => (tab === index ? !x : x));
    setToggleDropDown(state);
  };

  const handleOnChangeStartTime = (e) => {
    setTimeRange({
      ...timeRange,
      startTime: e,
    });
  };

  const handleOnChangeEndTime = (e) => {
    setTimeRange({
      ...timeRange,
      endTime: e,
    });
  };

  var startHours =
    Math.floor(timeRange.startTime / 60 / 60) < 10 &&
    Math.floor(timeRange.startTime / 60 / 60) !== 0
      ? "0" + Math.floor(timeRange.startTime / 60 / 60)
      : Math.floor(timeRange.startTime / 60 / 60) === 0
      ? "12"
      : Math.floor(timeRange.startTime / 60 / 60) > 12
      ? Math.floor(timeRange.startTime / 60 / 60) % 12 || 12
      : Math.floor(timeRange.startTime / 60 / 60);
  var endHours =
    Math.floor(timeRange.endTime / 60 / 60) < 10
      ? Math.floor(timeRange.endTime / 60 / 60) === 0
        ? "12"
        : "0" + Math.floor(timeRange.endTime / 60 / 60)
      : Math.floor(timeRange.endTime / 60 / 60) === 0
      ? "12"
      : Math.floor(timeRange.endTime / 60 / 60) > 12
      ? Math.floor(timeRange.endTime / 60 / 60) % 12 || 12
      : Math.floor(timeRange.endTime / 60 / 60);

  var startTimeZone =
    Math.floor(timeRange.startTime / 60 / 60) >= 12 ? "PM" : "AM";
  var endTimeZone = Math.floor(timeRange.endTime / 60 / 60) >= 12 ? "PM" : "AM";

  const resetFilters = () => {
    setFields({
      checkAll: true,
      checkAllEmployee: true,
      time_filter: 0,
    });
    const stores = store.stores_list.slice().map((item) => {
      return {
        ...item,
        isSelected: true,
      };
    });
    setStoreId(stores);
    dispatch(
      stores_change(
        store.stores_list.map((item) => {
          return item._id;
        })
      )
    );
    const employees = employee.employee_list.slice().map((item) => {
      return {
        ...item,
        isSelected: true,
      };
    });
    dispatch(
      employee_change(
        employee.employee_list.map((item) => {
          return item._id;
        })
      )
    );
    setEmployeeId(employees);
    setToggleDropDown([false, false, false]);
    setTimeRange({
      startTime: "0",
      endTime: "0",
    });
    setDateRange({
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
    props.handleOnChangeSales();
  };
  return (
    <>
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
              <span>
                <MdDateRange />
                {label}
              </span>
            </CButton>
          </DatetimeRangePicker>
        </CCol>
        <CCol sm="12" md="2" lg="2" xs="12">
          <CDropdown style={{ backgroundColor: "white" }}>
            <CDropdownToggle
              caret
              color="default  btn-block"
              onClick={() => toggleDropdown(0)}
            >
              <MdAvTimer />{" "}
              {fields.time_filter === 0
                ? "All Day"
                : startHours + startTimeZone + "-" + endHours + endTimeZone}
            </CDropdownToggle>

            <CDropdownMenu style={{ width: "max-content" }} id="dropdown0">
              {/*// show={toggleDropDown[0]}*/}
              <CDropdownItem onClick={() => handleOnChange(0)}>
                <CInputGroup variant="custom-radio" inline>
                  <CInputRadio
                    id="time_filter"
                    name="time_filter"
                    value={0}
                    checked={fields.time_filter === 0}
                    divider={true}
                    style={{ marginLeft: "0px" }}
                  />
                  <CLabel htmlFor="time_filter" style={{ marginLeft: "20px" }}>
                    All Day
                  </CLabel>
                </CInputGroup>
              </CDropdownItem>
              <CDropdownItem onClick={() => handleOnChange(1)}>
                <CInputGroup variant="custom-radio" inline>
                  <CInputRadio
                    id="time_filter"
                    name="time_filter"
                    value={1}
                    checked={fields.time_filter === 1}
                    style={{ marginLeft: "0px" }}
                  />
                  <CLabel htmlFor="time_filter" style={{ marginLeft: "20px" }}>
                    Custome Period
                  </CLabel>
                </CInputGroup>
              </CDropdownItem>
              {fields.time_filter === 1 ? (
                <CDropdownItem>
                  <CFormGroup inline>
                    <CLabel htmlFor="start_time">Start Time</CLabel>
                    <CInputGroup variant="custom-radio" inline>
                      <TimePicker
                        start="00:00"
                        end="23:59"
                        step={60}
                        name="startTime"
                        value={timeRange.startTime}
                        onChange={handleOnChangeStartTime}
                      />
                    </CInputGroup>
                  </CFormGroup>
                  <CFormGroup inline>
                    <CLabel htmlFor="start_time">End Time</CLabel>
                    <CInputGroup variant="custom-radio" inline>
                      <TimePicker
                        start="00:00"
                        end="23:59"
                        step={60}
                        name="endTime"
                        value={timeRange.endTime}
                        onChange={handleOnChangeEndTime}
                      />
                    </CInputGroup>
                  </CFormGroup>
                </CDropdownItem>
              ) : (
                ""
              )}
            </CDropdownMenu>
          </CDropdown>
        </CCol>
        <CCol sm="12" md="2" lg="2" xs="12">
          <CDropdown style={{ backgroundColor: "white" }}>
            <CDropdownToggle
              caret
              color="default  btn-block"
              onClick={() => toggleDropdown(1)}
            >
              <MdStoreMallDirectory />
              {storeId.filter((item) => item.isSelected !== true).length === 0
                ? "All Stores"
                : storeId.filter((item) => item.isSelected === true).length +
                  " Stores"}
            </CDropdownToggle>
            <CDropdownMenu style={{ width: "max-content" }}>
              {/* show={toggleDropDown[1]} */}

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
                  <CFormGroup variant="custom-checkbox" inline key={index}>
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
            <CDropdownToggle
              caret
              color="default btn-block"
              onClick={() => toggleDropdown(2)}
            >
              <MdPerson />{" "}
              {employeeId.filter((item) => item.isSelected !== true).length ===
              0
                ? "All Employees"
                : employeeId.filter((item) => item.isSelected === true).length +
                  " Employee"}
            </CDropdownToggle>
            <CDropdownMenu>
              {/*// show={toggleDropDown[2]}*/}
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
                  <CFormGroup variant="custom-checkbox" inline key={index}>
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
        <CCol sm="12" md="2" lg="2" xs="12">
          <CButton
            color="success"
            className="btn-square pull right"
            onClick={resetFilters}
          >
            Reset
          </CButton>
        </CCol>
      </CRow>
    </>
  );
};

export default FilterComponent;
