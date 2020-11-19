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
import { CIcon } from "@coreui/icons-react";
import { get_employee_list } from "../../actions/employee/employeeListActions";
import { get_stores } from "../../actions/settings/storeActions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import dateFormat from "dateformat";
import DatetimeRangePicker from "react-bootstrap-datetimerangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import TotalHoursWorkedDatatable from "../../datatables/employee/TotalHoursWorkedDatatable";
const TotalHoursWorked = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const employee = useSelector(
    (state) => state.employeeReducers.employeeListReducer
  );
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

  useEffect(() => {
    if (store.stores_list.length === 0) {
      dispatch(get_stores());
    }
    if (employee.employee_list.length === 0) {
      dispatch(get_employee_list());
    }
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

  // useEffect(() => {
  //   dispatch(get_employee());
  // }, []);

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
    // console.log(e.target.value);
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

  let start = dateFormat(dateRange.startDate, "yyyy-mm-dd");
  let end = dateFormat(dateRange.endDate, "yyyy-mm-dd");
  let label = start + " - " + end;
  if (start === end) {
    label = start;
  }

  const handleEvent = (event, picker) => {
    setDateRange({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
  };

  return (
    <React.Fragment>
      <CRow className="mb-3">
        <CCol sm="12" md="2" lg="2">
          <DatetimeRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            ranges={dateRange.ranges}
            onEvent={handleEvent}
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
              {storeId.filter((item) => item.isSelected !== true).length === 0
                ? "All Stores"
                : storeId.filter((item) => item.isSelected === true).length +
                  " Stores"}
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
                  index={item._id}
                  onClick={() => storeHandleChange(item._id)}
                >
                  <CFormGroup variant="custom-checkbox" inline key={index}>
                    <CInputCheckbox
                      custom
                      name="storeId"
                      id={"storeId" + item._id}
                      value={item._id}
                      checked={item.isSelected}
                      // onChange={storeHandleChange}
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
              {employeeId.filter((item) => item.isSelected !== true).length ===
              0
                ? "All Employees"
                : employeeId.filter((item) => item.isSelected === true).length +
                  " Employee"}
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
                  index={item._id}
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
      <CRow>
        <CCol xs="12" sm="12">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs="12" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                  <CButton color="success" className="btn-square pull right">
                    Export
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <TotalHoursWorkedDatatable
                timeCard_list={[]}
                store={store.stores_list}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default TotalHoursWorked;
