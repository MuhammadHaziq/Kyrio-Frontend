import React from "react";
import {
  CNav,
  CNavItem,
  CSidebar,
  CSidebarClose,
  CDropdown,
  CDropdownToggle,
  CCard,
  CCardBody,
  CRow,
  CCol,
} from "@coreui/react";
import { toggle_shift_sidebar } from "../../../actions/reports/salesShiftActions";
import { useSelector, useDispatch } from "react-redux";
import { sumBy } from "lodash";
import Amount from "../../../components/utils/Amount";
import dateFormat from "dateformat";

const CancelReceipt = (props) => {
  const show = useSelector(
    (state) => state.reports.salesShiftReducer.show_shift_detail
  );
  const sales_shift_data = useSelector(
    (state) => state.reports.salesShiftReducer.sales_shift_data
  );

  const dispatch = useDispatch();

  const closeShiftDetail = () => {
    dispatch(toggle_shift_sidebar(false));
  };
  console.log(sales_shift_data);
  return (
    <CSidebar
      aside
      colorScheme="light"
      size="xl"
      unfoldable
      show={show}
      onShowChange={closeShiftDetail}
    >
      <CNav
        variant="tabs"
        className="nav-underline nav-underline-primary ml-auto "
      >
        <CNavItem>
          <CSidebarClose onClick={closeShiftDetail} style={{ left: "0" }} />
        </CNavItem>

        <CNavItem>
          <CDropdown inNav className="c-header-nav-item mx-2">
            <CDropdownToggle caret={false}></CDropdownToggle>
          </CDropdown>
        </CNavItem>
      </CNav>
      <CCard style={{ overflowY: "hidden" }}>
        <CCardBody style={{ overflowY: "scroll" }}>
          <CRow className="p-3">
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "center" }}>
              <h6>SHIFT REPORT</h6>
            </CCol>
          </CRow>
          <hr />
          <CRow>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              <p className="d-flex justify-content-between">
                Shift number: {sales_shift_data?.shift_number}
              </p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              <p className="d-flex justify-content-between">
                Store: {sales_shift_data?.store?.title}
              </p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              <p className="d-flex justify-content-between">
                POS: {sales_shift_data?.pos_device?.title}
              </p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              <p className="d-flex justify-content-between">
                Shift opened: {sales_shift_data?.opened_by_employee?.name}
                <span style={{ textAlign: "right" }}>
                  {dateFormat(
                    sales_shift_data?.opened_at,
                    "mmm dd, yyyy, hh:mm TT"
                  )}
                </span>
              </p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              <p className="d-flex justify-content-between">
                Shift closed: {sales_shift_data?.closed_by_employee?.name}
                <span style={{ textAlign: "right" }}>
                  {dateFormat(
                    sales_shift_data?.closed_at,
                    "mmm dd, yyyy, hh:mm TT"
                  )}
                </span>
              </p>
            </CCol>
          </CRow>
          <hr />
          <CRow>
            <CCol
              sm="12"
              md="12"
              lg="12"
              style={{ textAlign: "left", color: "#689f38" }}
            >
              <p className="d-flex justify-content-between">Cash drawer</p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              <p className="d-flex justify-content-between">
                Starting cash
                <span style={{ textAlign: "right" }}>
                  <Amount value={sales_shift_data?.starting_cash} />
                </span>
              </p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              <p className="d-flex justify-content-between">
                Cash payments
                <span style={{ textAlign: "right" }}>
                  <Amount value={sales_shift_data?.cash_payments} />
                </span>
              </p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              <p className="d-flex justify-content-between">
                Cash refunds
                <span style={{ textAlign: "right" }}>
                  <Amount value={sales_shift_data?.cash_refunds} />
                </span>
              </p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              <p className="d-flex justify-content-between">
                Paid in
                <span style={{ textAlign: "right" }}>
                  <Amount value={sales_shift_data?.paid_in} />
                </span>
              </p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              <p className="d-flex justify-content-between">
                Paid out
                <span style={{ textAlign: "right" }}>
                  <Amount value={sales_shift_data?.paid_out} />
                </span>
              </p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              <p className="d-flex justify-content-between">
                Expected cash amount
                <span style={{ textAlign: "right" }}>
                  <Amount value={sales_shift_data?.expected_cash} />
                </span>
              </p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              <p className="d-flex justify-content-between">
                Actual cash amount
                <span style={{ textAlign: "right" }}>
                  <Amount value={sales_shift_data?.actual_cash} />
                </span>
              </p>
            </CCol>
            <CCol
              sm="12"
              md="12"
              lg="12"
              style={{ textAlign: "left", fontWeight: "bold" }}
            >
              <p className="d-flex justify-content-between">
                Differencee
                <span style={{ textAlign: "right" }}>
                  <Amount
                    value={
                      sales_shift_data?.expected_cash -
                      sales_shift_data?.actual_cash
                    }
                  />
                </span>
              </p>
            </CCol>
          </CRow>
          <hr />
          <CRow>
            <CCol
              sm="12"
              md="12"
              lg="12"
              style={{ textAlign: "left", color: "#689f38" }}
            >
              <p className="d-flex justify-content-between">Sales summary</p>
            </CCol>
            <CCol
              sm="12"
              md="12"
              lg="12"
              style={{ textAlign: "left", fontWeight: "bold" }}
            >
              <p className="d-flex justify-content-between">
                Gross sales
                <span style={{ textAlign: "right" }}>
                  <Amount value={sales_shift_data?.gross_sales} />
                </span>
              </p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              <p className="d-flex justify-content-between">
                Refunds
                <span style={{ textAlign: "right" }}>
                  <Amount value={sales_shift_data?.refunds} />
                </span>
              </p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              <p className="d-flex justify-content-between">
                Discounts
                <span style={{ textAlign: "right" }}>
                  <Amount value={sales_shift_data?.discounts} />
                </span>
              </p>
            </CCol>
            <CCol
              sm="12"
              md="12"
              lg="12"
              style={{ textAlign: "left", fontWeight: "bold" }}
            >
              <p className="d-flex justify-content-between">
                Net sales
                <span style={{ textAlign: "right" }}>
                  <Amount value={sales_shift_data?.net_sales} />
                </span>
              </p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              <p className="d-flex justify-content-between">
                Taxes
                <span style={{ textAlign: "right" }}>
                  <Amount
                    value={sumBy(sales_shift_data?.taxes, "money_amount")}
                  />
                </span>
              </p>
            </CCol>
            <CCol
              sm="12"
              md="12"
              lg="12"
              style={{ textAlign: "left", fontWeight: "bold" }}
            >
              <p className="d-flex justify-content-between">
                Total tendered
                <span style={{ textAlign: "right" }}>
                  <Amount
                    value={sumBy(sales_shift_data?.payments, "money_amount")}
                  />
                </span>
              </p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              {sales_shift_data?.payments.map((pay) => {
                return (
                  <p className="d-flex justify-content-between">
                    {pay?._id?.title}
                    <span style={{ textAlign: "right" }}>
                      <Amount value={pay?.money_amount} />
                    </span>
                  </p>
                );
              })}
            </CCol>
          </CRow>
          <hr />
          <CRow>
            <CCol
              sm="12"
              md="12"
              lg="12"
              style={{ textAlign: "left", color: "#689f38" }}
            >
              <p className="d-flex justify-content-between">Pay in / Pay out</p>
            </CCol>
            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
              {sales_shift_data?.cash_movements.map((cash) => {
                return (
                  <p className="d-flex justify-content-between">
                    {dateFormat(cash.created_at, "hh:mm TT")}{" "}
                    {cash?.employee_id?.name}{" "}
                    {cash?.comment ? ` - ${cash?.comment}` : ""}
                    <span style={{ textAlign: "right" }}>
                      <Amount value={cash?.amount} />
                    </span>
                  </p>
                );
              })}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CSidebar>
  );
};
export default CancelReceipt;
