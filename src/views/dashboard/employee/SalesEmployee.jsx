import React, { useState, useEffect } from "react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from "@coreui/react";
import { unmount_filter } from "../../../actions/dashboard/filterComponentActions";
import {
  get_sales_employee_summary,
  delete_employee_sales_summary,
} from "../../../actions/reports/salesEmployeeActions";
import { useSelector, useDispatch } from "react-redux";
import SalesEmployeeDatatable from "../../../datatables/reports/SalesEmployeeDatatable";
import ConformationAlert from "../../../components/conformationAlert/ConformationAlert";
import ReportsFilters from "../../../components/reportFilters/ReportsFilters";

const SalesEmployee = () => {
  const dispatch = useDispatch();
  const employee_sales_summary = useSelector((state) => state.reports.salesEmployeeReducer.employee_sales_summary)

  const [filterReset, setFilterReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [daysFilter, setDaysFilter] = useState([
    { days: 0, name: "Hours", disable: true },
    { days: 1, name: "Days", disable: true },
    { days: 6, name: "Weeks", disable: true },
    { days: 28, name: "Months", disable: true },
    { days: 120, name: "Quaters", disable: true },
    { days: 365, name: "Years", disable: true },
  ]);

  // Sales by Day full month

  useEffect(() => {
    console.log(employee_sales_summary)
    return () => {
      setLoading(false);
      dispatch(unmount_filter());
    };
  }, []);


  const deleteSalesEmployee = () => {
    console.log("Delete");
    setShowAlert(!showAlert);
  };

  return (
    <>
      <ReportsFilters
        daysFilter={daysFilter}
        resetFilter={filterReset}
        filter={false}
        get_filter_record={get_sales_employee_summary}
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs="12" sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                  <CButton
                    color="success"
                    className="btn-square"
                    variant="outline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="c-icon c-icon-sm"
                      role="img"
                      style={{
                        width: "1rem",
                        height: "1rem",
                        fontSize: "1rem",
                      }}
                    >
                      <polygon
                        fill="var(--ci-primary-color, currentColor)"
                        points="440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240"
                        className="ci-primary"
                      ></polygon>
                    </svg>
                    Export
                  </CButton>
                  {/* {true ? (
                    <React.Fragment>
                      <ConformationAlert
                        button_text="Delete"
                        heading="Delete Sales"
                        section={`Are you sure you want to delete the Sales Summary?`}
                        buttonAction={deleteSalesEmployee}
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
                  )} */}
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <SalesEmployeeDatatable sales_by_employee_detail={employee_sales_summary} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default SalesEmployee;
