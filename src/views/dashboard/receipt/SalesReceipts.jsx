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
import CIcon from "@coreui/icons-react";
import dateformat from "dateformat";
import FilterComponent from "../FilterComponent";
import { unmount_filter } from "../../../actions/dashboard/filterComponentActions";
import {
  get_receipt_summary,
  delete_receipt_summary,
} from "../../../actions/reports/salesReceiptActions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import SalesReceiptDatatableNew from "../../../datatables/reports/SalesReceiptDatatableNew";
import ConformationAlert from "../../../components/conformationAlert/ConformationAlert";

const SalesReceipts = () => {
  const dispatch = useDispatch();
  const filterComponent = useSelector(
    (state) => state.dashBoard.filterComponentReducer
  );
  const user = useSelector((state) => state.auth.user);

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
  const usePrevious = (data) => {
    const ref = React.useRef();
    useEffect(() => {
      ref.current = data;
    }, [data]);
    return ref.current;
  };
  // Sales by Day full month
  const [sales, setSales] = useState([]);
  const [orginalSale, setOrginalSale] = useState([]);
  var prevDateRange = usePrevious(filterComponent.filterDate);
  var changeInFilter = usePrevious(filterComponent);

  const getNatural = (num) => {
    return parseFloat(num.toString().split(".")[0]);
  };

  useEffect(() => {
    return () => {
      setLoading(false);
      dispatch(unmount_filter());
    };
  }, []);

  useEffect(() => {
    if (filterComponent !== changeInFilter && changeInFilter !== undefined) {
      console.log(changeInFilter, "PrevchangeInFilter");
      console.log(filterComponent, "vchangeInFilter");
    }
  }, [filterComponent, changeInFilter]);

  const deleteSalesReceipt = () => {
    console.log("Delete");
    setShowAlert(!showAlert);
  };

  return (
    <>
      <FilterComponent handleOnChangeSales={() => console.log("No Function")} />
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
                  {user._id === user.owner_id ? (
                    <React.Fragment>
                      <ConformationAlert
                        button_text="Delete"
                        heading="Delete Sales"
                        section={`Are you sure you want to delete the Sales Summary?`}
                        buttonAction={deleteSalesReceipt}
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
              <SalesReceiptDatatableNew sale_receipt_sumary={[]} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default SalesReceipts;
