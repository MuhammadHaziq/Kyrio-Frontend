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
import { get_employee_list } from "../../../actions/employee/employeeListActions";
import { get_stores } from "../../../actions/settings/storeActions";
import {
  get_grap_sales_summary,
  change_days,
} from "../../../actions/dashboard/salesSummaryActions";
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
} from "../../../actions/dashboard/filterComponentActions";
import dateformat from "dateformat";

import $ from "jquery";
const DashboardFilter = (props) => {
  const dispatch = useDispatch();
  // Start Reducer Functions
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const employee = useSelector(
    (state) => state.employeeReducers.employeeListReducer
  );
  const salesSummary = useSelector(
    (state) => state.reports.salesSummaryReducer
  );
  // End Reducer Functions
  const [fields, setFields] = useState({
    checkAll: true,
    checkAllEmployee: true,
    time_filter: 0,
  });
  const [Days, setDays] = useState([]);
  const [daysDates, setDates] = useState([]);
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
  var prevDayFilter = usePrevious(props.daysFilter);
  // Get Dayss

  const getNatural = (num) => {
    return parseFloat(num.toString().split(".")[0]);
  };

  const days_filter = (from, to, filterName) => {
    var d = from,
      a = [],
      i = 0;
    var daysDates = [];
    const daysDiff = Math.round(
      moment.duration(moment(to).diff(moment(from))).asDays()
    );
    var time = moment(to).toDate(); // This will return a copy of the Date that the moment uses
    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    const monthDiff = moment.duration(moment(to).diff(moment(from))).asMonths();
    const diff = getNatural(monthDiff) === 0 ? 1 : getNatural(monthDiff);
    if (
      (getNatural(daysDiff) === 0 || getNatural(daysDiff) === 1) &&
      filterName === "Hours"
    ) {
      const totalHours = 24;
      var i = 1;
      while (i <= totalHours) {
        daysDates.push(moment(time).format("LT"));
        a.push(moment(time).format("LT"));
        time = moment(time).add(1, "hours").format("YYYY-MM-DD HH:mm:ss");
        i++;
      }
      props.setFilter("Hours");
      setDays(a);
      setDates(daysDates);
      dispatch(change_days(a));
    } else if (getNatural(daysDiff) > 1 && filterName === "Days") {
      const dateGape =
        daysDiff >= 60 ? daysDiff / getNatural(monthDiff) : daysDiff;
      while (i < getNatural(dateGape)) {
        daysDates.push(dateformat(d, "mmm dd yyyy"));
        a.push(dateformat(d, "mmm dd"));
        d = moment(d, "DD-MM-YYYY").add(diff, "days");
        i++;
      }
      if (i === getNatural(daysDiff)) {
        // include last day
        daysDates.push(dateformat(d, "mmm dd yyyy"));
        a.push(dateformat(d, "mmm dd"));
      }
      setDays(a);
      props.setFilter("Days");
      setDates(daysDates);
      dispatch(change_days(a));
    } else if (getNatural(daysDiff) >= 7 && filterName === "Weeks") {
      let j = 0;
      let weeks = [];
      let weekDays = [];
      while (j <= daysDiff) {
        let currentDay = moment(d).day();
        if (j === 0) {
          currentDay = moment(d).day();
        }
        let weekRange = "";
        let weekRangeDays = "";
        weekRangeDays = dateformat(d, "mmm dd yyyy");
        weekRange = dateformat(d, "mmm dd");
        if (currentDay === 7) {
          weekRangeDays =
            dateformat(d, "mmm dd yyyy") + " - " + dateformat(d, "mmm dd yyyy");
          weekRange = dateformat(d, "mmm dd") + " - " + dateformat(d, "mmm dd");
          weekDays.push(weekRangeDays);
          weeks.push(weekRange);
          ++j;
        } else {
          for (; currentDay <= 7; currentDay++) {
            const startDate = dateformat(d, "dd-mm-yyyy");
            const endDate = dateformat(to, "dd-mm-yyyy");
            if (
              moment(startDate, "DD-MM-YYYY").isSame(
                moment(endDate, "DD-MM-YYYY")
              )
            ) {
              weekRangeDays += " - " + dateformat(d, "mmm dd yyyy");
              weekRange += " - " + dateformat(d, "mmm dd");
              weekDays.push(weekRangeDays);
              weeks.push(weekRange);
              return;
            } else if (currentDay === 6) {
              weekRangeDays += " - " + dateformat(d, "mmm dd yyyy");
              weekRange += " - " + dateformat(d, "mmm dd");
              weekDays.push(weekRangeDays);
              weeks.push(weekRange);
            }
            d = moment(d, "DD-MM-YYYY").add(1, "days");
            ++j;
          }
        }
        setDays(weeks);
        dispatch(change_days(weeks));
        setDates(weekDays);
      }
    } else if (getNatural(daysDiff) >= 28 && filterName === "Months") {
      let monthValues = [];
      let monthDates = [];
      // &&
      // moment(startDate).isSame(endDate, "year")
      while (moment(to).isAfter(d, "month")) {
        const startDate = dateformat(d, "yyyy-mm-dd");
        monthValues.push(dateformat(startDate, "mmm"));
        monthDates.push(dateformat(startDate, "mmm yyyy"));
        d = moment(d, "DD-MM-YYYY").add(1, "M");
      }
      if (moment(d).isSame(to, "month")) {
        const startDate = dateformat(d, "yyyy-mm-dd");
        monthValues.push(dateformat(startDate, "mmm"));
        monthDates.push(dateformat(startDate, "mmm yyyy"));
      }
      setDays(monthValues);
      setDates(monthDates);
      dispatch(change_days(monthValues));
    } else if (getNatural(daysDiff) >= 118 && filterName === "Quaters") {
      const totalQuater = Math.floor(to.diff(d, "months") / 3);
      let j = 0;
      let quaters = [];
      let quatersDates = [];
      while (j <= totalQuater) {
        let currentQuater = moment(d).month() + 1;
        if (j === 0) {
          currentQuater = moment(d).month() + 1;
        }
        let quaterRange = "";
        let quaterRangeDate = "";
        quaterRange = dateformat(d, "mmm dd");
        quaterRangeDate = dateformat(d, "mmm dd yyyy");
        if (
          (currentQuater === 3 ||
            currentQuater === 6 ||
            currentQuater === 9 ||
            currentQuater === 12) &&
          j === 0
        ) {
          quaterRange =
            moment(d).format("MMM-DD") +
            " - " +
            moment(d).endOf("month").format("MMM-DD");
          quaterRangeDate =
            moment(d).format("MMM DD YYYY") +
            " - " +
            moment(d).endOf("month").format("MMM DD YYYY");
          // dateformat(d, "mmm dd") + " - " + dateformat(d, "mmm dd");
          quaters.push(quaterRange);
          quatersDates.push(quaterRangeDate);
          d = moment(d, "DD-MM-YYYY").add(1, "M");
          ++j;
        } else {
          quaterRangeDate = moment(d).format("MMM DD YYYY");
          quaterRange = moment(d).format("MMM-DD");
          // dateformat(d, "mmm dd");
          if (
            moment(d).month() + 1 === 2 ||
            moment(d).month() + 1 === 5 ||
            moment(d).month() + 1 === 8 ||
            moment(d).month() + 1 === 11
          ) {
            d = moment(d, "DD-MM-YYYY").add(1, "M");
          } else {
            d = moment(d, "DD-MM-YYYY").add(2, "M");
          }
          //
          quaterRangeDate =
            quaterRangeDate +
            " - " +
            moment(d).endOf("month").format("MMM DD YYYY");
          quaterRange =
            quaterRange + " - " + moment(d).endOf("month").format("MMM-DD");
          // dateformat(d, "mmm dd");
          quatersDates.push(quaterRangeDate);
          quaters.push(quaterRange);
          d = moment(d, "DD-MM-YYYY").add(1, "M");
          ++j;
        }
      }
      setDays(quaters);
      dispatch(change_days(quaters));
      setDates(quatersDates);
    } else if (getNatural(daysDiff) >= 365 && filterName === "Years") {
      let endYear = moment(to).year();
      let startYear = moment(from).year();
      let years = [];
      let yearsDate = [];
      while (startYear <= endYear) {
        const yearRange = dateformat(d, "yyyy");
        years.push(yearRange);
        yearsDate.push(yearRange);
        d = moment(d, "DD-MM-YYYY").add(1, "Y");
        startYear = startYear + 1;
      }
      setDays(years);
      setDates(yearsDate);
      dispatch(change_days(years));
    }
  };

  useEffect(() => {
    dispatch(get_stores());
    dispatch(get_employee_list());
    // $(".dropdown-menu").click(function (event) {
    //   event.stopPropagation();
    //   console.log(event);
    // });
  }, [dispatch]);

  useEffect(() => {
    if (
      (dateRange.startDate !== prevStartDate &&
        dateRange.startDate !== undefined &&
        dateRange.startDate !== null) ||
      (dateRange.endDate !== prevEndDate &&
        dateRange.endDate !== undefined &&
        dateRange.endDate !== null)
    ) {
      const timeDiff = moment
        .duration(moment(dateRange.endDate).diff(moment(dateRange.startDate)))
        .asDays();
      const filter = getNatural(timeDiff) == 0 ? "Hours" : "Days";
      props.setDaysFilter(
        props.daysFilter.map((item) => {
          if (parseInt(item.days) <= getNatural(timeDiff)) {
            return {
              ...item,
              disable:
                getNatural(timeDiff) == 0
                  ? false
                  : getNatural(timeDiff) >= 0 && parseInt(item.days) === 0
                  ? true
                  : false,
              active: item.name === filter ? true : false,
            };
          } else {
            return {
              ...item,
              disable: true,
              active: false,
            };
          }
        })
      );
      props.setFilter(filter);
      //
    }
  }, [
    (dateRange.startDate !== prevStartDate &&
      dateRange.startDate !== undefined &&
      dateRange.startDate !== null) ||
      (dateRange.endDate !== prevEndDate &&
        dateRange.endDate !== undefined &&
        dateRange.endDate !== null),
  ]);
  useEffect(() => {
    if (props.daysFilter !== prevDayFilter && props.daysFilter !== undefined) {
      days_filter(dateRange.startDate, dateRange.endDate, props.filter);
    }
  }, [props.daysFilter !== prevDayFilter]);

  useEffect(() => {
    if (
      storeId !== undefined &&
      storeId.length > 0 &&
      employeeId !== undefined &&
      employeeId.length > 0
    ) {
      const data = {
        startDate: dateformat(dateRange.startDate, "yyyy-mm-dd"),
        endDate: dateformat(dateRange.endDate, "yyyy-mm-dd"),
        stores: storeId
          .filter((item) => item.isSelected === true)
          .map((item) => {
            return item._id;
          }),
        employees: employeeId
          .filter((item) => item.isSelected === true)
          .map((item) => {
            return item._id;
          }),
        divider: "Hours",
        graph: Days,
        // need this formate with year to match with date filter exactly
        matches: daysDates,
      };
      dispatch(get_grap_sales_summary(data));
    }
  }, [
    storeId !== undefined &&
      storeId.length > 0 &&
      employeeId !== undefined &&
      employeeId.length > 0,
  ]);

  useEffect(() => {
    if (
      Days !== undefined &&
      Days.length > 0 &&
      storeId !== undefined &&
      storeId.length > 0 &&
      employeeId !== undefined &&
      employeeId.length > 0
    ) {
      const data = {
        startDate: dateformat(dateRange.startDate, "yyyy-mm-dd"),
        endDate: dateformat(dateRange.endDate, "yyyy-mm-dd"),
        stores: storeId
          .filter((item) => item.isSelected === true)
          .map((item) => {
            return item._id;
          }),
        employees: employeeId
          .filter((item) => item.isSelected === true)
          .map((item) => {
            return item._id;
          }),
        divider: props.filter, //props.daysFilter,
        graph: Days,
        // need this formate with year to match with date filter exactly
        matches: daysDates,
      };
      dispatch(get_grap_sales_summary(data));
    }
  }, [Days]);

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
    const data = {
      startDate: dateformat(dateRange.startDate, "yyyy-mm-dd"),
      endDate: dateformat(dateRange.endDate, "yyyy-mm-dd"),
      stores: selectedStore
        .filter((item) => item.isSelected === true)
        .map((item) => {
          return item._id;
        }),
      employees: employeeId
        .filter((item) => item.isSelected === true)
        .map((item) => {
          return item._id;
        }),
      divider: props.filter, //props.daysFilter,
      graph: Days,
      // need this formate with year to match with date filter exactly
      matches: daysDates,
    };
    dispatch(get_grap_sales_summary(data));
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
          employee.employee_list.length && employee.employee_list.length > 0
          ? true
          : false,
    });

    setEmployeeId(selectedEmployees);
    const data = {
      startDate: dateformat(dateRange.startDate, "yyyy-mm-dd"),
      endDate: dateformat(dateRange.endDate, "yyyy-mm-dd"),
      stores: storeId
        .filter((item) => item.isSelected === true)
        .map((item) => {
          return item._id;
        }),
      employees: selectedEmployees
        .filter((item) => item.isSelected === true)
        .map((item) => {
          return item._id;
        }),
      divider: props.filter, //props.daysFilter,
      graph: Days,
      // need this formate with year to match with date filter exactly
      matches: daysDates,
    };
    dispatch(get_grap_sales_summary(data));
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
      <CRow className="mb-1">
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
            <CDropdownToggle caret color="default  btn-block">
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
            <CDropdownToggle caret color="default  btn-block">
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
            <CDropdownToggle caret color="default btn-block">
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
      </CRow>
    </>
  );
};

export default DashboardFilter;
// <CCol sm="12" md="2" lg="2" xs="12">
//   <CButton
//     color="success"
//     className="btn-square pull right"
//     onClick={resetFilters}
//   >
//     Reset
//   </CButton>
// </CCol>
