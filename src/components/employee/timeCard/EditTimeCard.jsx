import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInvalidFeedback,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CLink,
  CCollapse,
  CSelect,
  CFormText,
  CInputGroupAppend,
} from "@coreui/react";
import { MdPermContactCalendar } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { update_timeCard } from "../../../actions/employee/timeCardActions";
import validator from "validator";
import $ from "jquery";
import moment from "moment";
import dateFormat from "dateformat";
import DatetimeRangePicker from "react-bootstrap-datetimerangepicker-updated";
import "bootstrap-daterangepicker/daterangepicker.css";
import TimePicker from "react-time-picker";
import TimeCardDetailDatatable from "../../../datatables/employee/timeCardDetail/TimeCardDetailDatatable";
const EditTimeCard = (props) => {
  const [fields, setFields] = useState({
    employeeId: "0",
    storeId: "0",
  });
  const [errors, setErrors] = useState({
    employeeId: false,
    storeId: false,
  });
  const [dateRange, setDateRange] = useState({
    startDate: moment(),
    endDate: moment(),
  });
  const [dateErrors, setDateErrors] = useState({
    startDate: false,
    endDate: false,
  });
  const [timeRange, setTimeRange] = useState({
    startTime: "00:00",
    endTime: "00:00",
  });
  const [timeErrors, setTimeErrors] = useState({
    startTime: false,
    endTime: false,
  });
  const [totalWorkingHour, setTolalHour] = useState(0);

  const [stores, setStores] = useState([]);
  const [employees, setEmployees] = useState([]);
  const dispatch = useDispatch();
  const employee = useSelector(
    (state) => state.employeeReducers.employeeListReducer
  );
  const timeCard = useSelector(
    (state) => state.employeeReducers.timeCardReducer
  );

  useEffect(() => {
    if (
      timeCard.redirect_timeCard !== undefined &&
      timeCard.redirect_timeCard === true
    ) {
      props.goBack();
    }
  }, [timeCard.redirect_timeCard]);

  useEffect(() => {
    $(".react-time-picker__wrapper").css("display", "contents");
  }, []);
  useEffect(() => {
    if (props.store !== undefined && props.store.length > 0) {
      setStores(props.store);
    }
  }, [props.store]);

  useEffect(() => {
    if (
      employee.employee_list !== undefined &&
      employee.employee_list.length > 0
    ) {
      setEmployees(employee.employee_list);
    }
  }, [employee.employee_list]);

  useEffect(() => {
    if (
      props.time_card_row_data !== undefined &&
      props.store !== undefined &&
      employee.employee_list !== undefined
    ) {
      setFields({
        ...fields,
        employeeId:
          props.time_card_row_data.employee !== undefined
            ? props.time_card_row_data.employee.id
            : "1",
        storeId:
          props.time_card_row_data.store !== undefined
            ? props.time_card_row_data.store.id
            : "0",
      });
      setDateRange({
        ...dateRange,
        startDate:
          props.time_card_row_data.timeDetail !== undefined &&
          props.time_card_row_data.timeDetail.length !== 0
            ? props.time_card_row_data.timeDetail[0].clockInDate
            : moment(),
        endDate:
          props.time_card_row_data.timeDetail !== undefined &&
          props.time_card_row_data.timeDetail.length !== 0
            ? props.time_card_row_data.timeDetail[0].clockOutDate
            : moment(),
      });
      setTimeRange({
        ...timeRange,
        startTime:
          props.time_card_row_data.timeDetail !== undefined &&
          props.time_card_row_data.timeDetail.length !== 0
            ? props.time_card_row_data.timeDetail[0].clockInTime
            : "00:00",
        endTime:
          props.time_card_row_data.timeDetail !== undefined &&
          props.time_card_row_data.timeDetail.length !== 0
            ? props.time_card_row_data.timeDetail[0].clockOutTime
            : "00:00",
      });
    }
  }, [props.time_card_row_data || employee.employee_list || props.store]);

  const goBack = () => {
    props.goBack();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    if (
      e.target.name === "storeId" &&
      (e.target.value === "" ||
        e.target.value === "0" ||
        e.target.value === undefined ||
        e.target.value === null)
    ) {
      setErrors({
        ...errors,
        role: true,
      });
      return true;
    }
    if (
      e.target.name === "employeeId" &&
      (e.target.value === "" ||
        e.target.value === "0" ||
        e.target.value === undefined ||
        e.target.value === null)
    ) {
      setErrors({
        ...errors,
        employeeId: true,
      });
      return true;
    }
    setErrors({
      ...errors,
      [name]: validator.isEmpty(value),
    });
  };

  const saveTimeCard = () => {
    if (
      fields.employeeId === "" ||
      fields.employeeId === "0" ||
      fields.employeeId === undefined ||
      fields.employeeId === null
    ) {
      setErrors({
        ...errors,
        employeeId: true,
      });
      return false;
    } else if (
      fields.storeId === "" ||
      fields.storeId === "0" ||
      fields.storeId === undefined ||
      fields.storeId === null
    ) {
      setErrors({
        ...errors,
        storeId: true,
      });
      return false;
    } else if (
      dateRange.startDate === "" ||
      dateRange.startDate === undefined ||
      dateRange.startDate === null
    ) {
      setDateErrors({
        ...dateErrors,
        startDate: true,
      });
      return false;
    } else if (
      dateRange.endDate === "" ||
      dateRange.endDate === undefined ||
      dateRange.endDate === null
    ) {
      setDateErrors({
        ...dateErrors,
        endDate: true,
      });
      return false;
    } else if (
      timeRange.startTime === "" ||
      timeRange.startTime === undefined ||
      timeRange.startTime === null
    ) {
      setTimeErrors({
        ...timeErrors,
        startTime: true,
      });
      return false;
    } else if (
      timeRange.endTime === "" ||
      timeRange.endTime === undefined ||
      timeRange.endTime === null
    ) {
      setTimeErrors({
        ...timeErrors,
        endTime: true,
      });
      return false;
    } else {
      const data = {
        store: JSON.stringify(
          (stores || [])
            .filter((item) => item._id === fields.storeId)
            .map((item) => {
              return {
                id: item._id,
                name: item.title,
              };
            })[0]
        ),
        employee: JSON.stringify(
          (employees || [])
            .filter((item) => item._id === fields.employeeId)
            .map((item) => {
              return {
                id: item._id,
                name: item.name,
              };
            })[0]
        ),
        clockInDate: dateFormat(dateRange.startDate, "yyyy-mm-dd"),
        clockOutDate: dateFormat(dateRange.endDate, "yyyy-mm-dd"),
        clockInTime: timeRange.startTime,
        clockOutTime: timeRange.endTime,
        id: props.time_card_row_data._id,
        totalWorkingHour: totalHour === "0:0" ? 0 : totalHour,
      };
      dispatch(update_timeCard(data));
    }
  };
  let start = dateFormat(dateRange.startDate, "yyyy-mm-dd");

  const handleEventStart = (event, picker) => {
    setDateRange({
      ...dateRange,
      startDate: picker.startDate,
    });
  };
  const handleEventEnd = (event, picker) => {
    setDateRange({
      ...dateRange,
      endDate: picker.endDate,
    });
  };

  const onStartTimeChange = (event) => {
    setTimeRange({
      ...timeRange,
      startTime: event,
    });
  };

  const onEndTimeChange = (event) => {
    setTimeRange({
      ...timeRange,
      endTime: event,
    });
  };
  /**'
   *  Time Management
   *
   */
  const timeDiff = moment
    .duration(moment(dateRange.endDate).diff(moment(dateRange.startDate)))
    .asDays();

  const getNatural = (num) => {
    return parseFloat(num.toString().split(".")[0]) * 24;
  };
  let totalHour = 0;
  const startHours =
    timeRange.startTime !== null && timeRange.startTime !== undefined
      ? timeRange.startTime.split(":")[0] == 12
        ? 24
        : timeRange.startTime.split(":")[0]
      : 0;
  const startMins =
    timeRange.startTime !== null && timeRange.startTime !== undefined
      ? timeRange.startTime.split(":")[1]
      : 0;
  const endHours =
    timeRange.endTime !== null && timeRange.endTime !== undefined
      ? timeRange.endTime.split(":")[0] == 12
        ? 24
        : timeRange.endTime.split(":")[0]
      : 0;
  const endMins =
    timeRange.endTime !== null && timeRange.endTime !== undefined
      ? timeRange.endTime.split(":")[1]
      : 0;
  if (parseFloat(startHours) > parseFloat(endHours)) {
    let diffStartHour = 0;
    let diffEndMin = 0;
    diffStartHour = parseFloat(startHours) - parseFloat(endHours);
    diffEndMin = parseFloat(startMins) - parseFloat(endMins);
    totalHour = diffStartHour + getNatural(timeDiff);
    totalHour = totalHour + ":" + Math.abs(diffEndMin);
    // setTolalHour(totalHour === "0:0" ? 0 : totalHour);
  } else {
    let diffEndHour = 0;
    let diffEndMin = 0;
    diffEndHour = parseFloat(endHours) - parseFloat(startHours);
    diffEndMin = parseFloat(startMins) - parseFloat(endMins);
    totalHour = diffEndHour + getNatural(timeDiff);
    totalHour = totalHour + ":" + Math.abs(diffEndMin);
    // setTolalHour(totalHour === "0:0" ? 0 : totalHour);
  }
  return (
    <React.Fragment>
      <CRow className="justify-content-left">
        <CCol md="10" lg="10" xl="10">
          <CCard>
            <CCardBody className="p-2">
              <CRow>
                <CCol sm="12" md="6" lg="6">
                  <CFormGroup>
                    <CLabel>Employee</CLabel>
                    <CInputGroup className="mb-3">
                      <CSelect
                        className={
                          errors.employeeId === true
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        size="md"
                        name="employeeId"
                        id="employeeId"
                        value={fields.employeeId}
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                        invalid={errors.employeeId}
                        disabled
                      >
                        <option value="0">Select Employee</option>
                        {employees.map((item, index) => {
                          return (
                            <option value={item._id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </CSelect>

                      <CInvalidFeedback>
                        {errors.employeeId === true
                          ? "Please Enter Select Employee"
                          : ""}
                      </CInvalidFeedback>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
                {stores.length > 1 ? (
                <CCol sm="12" md="6" lg="6">
                  <CFormGroup>
                    <CLabel> Store </CLabel>
                    <CInputGroup className="mb-3">
                      <CSelect
                        className={
                          errors.storeId === true
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        size="md"
                        name="storeId"
                        id="storeId"
                        value={fields.storeId}
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                        invalid={errors.storeId}
                        disabled
                      >
                        <option value="0">All Store</option>
                        {stores.map((item, index) => {
                          return (
                            <option value={item._id} key={index}>
                              {item.title}
                            </option>
                          );
                        })}
                      </CSelect>

                      <CInvalidFeedback>
                        {errors.storeId === true
                          ? "Please Enter Select Store"
                          : ""}
                      </CInvalidFeedback>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
                ) : ""}
              </CRow>
              <CRow>
                <CCol sm="12" md="6" lg="6">
                  <CLabel>Clock in date</CLabel>
                  <DatetimeRangePicker
                    startDate={dateRange.startDate}
                    singleDatePicker
                    onEvent={handleEventStart}
                  >
                    <CFormGroup>
                      <CInputGroup className="mb-3">
                        <CInput
                          id="startDate"
                          name="startDate"
                          placeholder="Start Date"
                          value={dateFormat(dateRange.startDate, "yyyy-mm-dd")}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>
                            <MdPermContactCalendar />
                          </CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CFormGroup>
                  </DatetimeRangePicker>
                </CCol>
                <CCol sm="12" md="6" lg="6">
                  <CLabel>Clock out date</CLabel>
                  <DatetimeRangePicker
                    endDate={dateRange.endDate}
                    singleDatePicker
                    onEvent={handleEventEnd}
                  >
                    <CFormGroup>
                      <CInputGroup className="mb-3">
                        <CInput
                          id="endDate"
                          name="endDate"
                          placeholder="End Date"
                          value={dateFormat(dateRange.endDate, "yyyy-mm-dd")}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>
                            <MdPermContactCalendar />
                          </CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CFormGroup>
                  </DatetimeRangePicker>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="12" md="6" lg="6">
                  <CFormGroup>
                    <CLabel>Clock in time</CLabel>
                    <CInputGroup className="mb-3">
                      <TimePicker
                        name="startTime"
                        onChange={onStartTimeChange}
                        value={timeRange.startTime}
                        disableClock={true}
                        className="form-control"
                        style={{ padding: "0px" }}
                      />
                      <CInputGroupAppend>
                        <CInputGroupText>
                          <MdPermContactCalendar />
                        </CInputGroupText>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
                <CCol sm="12" md="6" lg="6">
                  <CFormGroup>
                    <CLabel>Clock out time</CLabel>
                    <CInputGroup className="mb-3">
                      <TimePicker
                        name="endTime"
                        onChange={onEndTimeChange}
                        value={timeRange.endTime}
                        disableClock={true}
                        className="form-control"
                        style={{ padding: "0px" }}
                      />
                      <CInputGroupAppend>
                        <CInputGroupText>
                          <MdPermContactCalendar />
                        </CInputGroupText>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="12">
                  <p>
                    <b>Total hours:</b>
                    {totalHour === "0:0" ? 0 : totalHour}
                  </p>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          {/**
           *
           *  Time Card Detail
           *
           */}
          <CCard>
            <CCardHeader>
              <h2>History</h2>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm="12" xs="12">
                  <TimeCardDetailDatatable
                    timeCard_detail={props.time_card_row_data || []}
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          {/**
           *
           *  End Time Card Detail
           *
           */}
          <CRow>
            <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
              <CButton
                block
                variant="outline"
                className="btn-pill pull-right"
                color="danger"
                onClick={goBack}
              >
                CANCEL
              </CButton>
            </CCol>
            <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0 form-actions">
              <CButton
                block
                type="submit"
                variant="outline"
                className="btn-pill pull-right"
                color="success"
                onClick={saveTimeCard}
              >
                SAVE
              </CButton>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default EditTimeCard;
