import React from "react";
import {
  CNav,
  CNavItem,
  CSidebar,
  CSidebarClose,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  toggle_receipt_sideBar,
  cancel_receipt,
} from "../../../actions/reports/salesReceiptActions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { groupBy, sumBy, orderBy } from "lodash";
import authAxios from "../../../constants/authAxios";
import Amount from "../../../components/utils/Amount";

const CancelReceipt = (props) => {
  const show = useSelector(
    (state) => state.reports.salesReceiptReducer.show_receipt_detail
  );
  const sales_receipt_data = useSelector(
    (state) => state.reports.salesReceiptReducer.sales_receipt_data
  );
  const darkMode = useSelector((state) => state.settings.darkMode);

  const dispatch = useDispatch();
  const closeReceiptDetail = () => {
    dispatch(toggle_receipt_sideBar(false));
  };

  const cancelReceiptFunc = () => {
    const type = sales_receipt_data?.[0]?.receipt_type;
    if (type === "REFUND") {
      showAlert({
        button_text: "Disbale",
        heading: "Cancel receipt",
        section:
          "Receipt will not be accounted in reports. Are you sure you want to continue?",
      });
    } else if (type === "SALE") {
      const data = {
        receipt_number:
          (sales_receipt_data || [])[0] !== undefined &&
          (sales_receipt_data || [])[0] !== null
            ? (sales_receipt_data || [])[0].receipt_number
            : "",
        sale_id:
          (sales_receipt_data || [])[0] !== undefined &&
          (sales_receipt_data || [])[0] !== null
            ? (sales_receipt_data || [])[0]._id
            : "",
      };
      // dispatch(check_if_refunded(data))
      
      authAxios({
        method: "GET",
        url: `sales/check/${data.sale_id}`,
      })
        .then((res) => {
          if (res.data.refund) {
            showAlert({
              button_text: "Disbale",
              heading: "Cancel receipt",
              section:
                "Unable to cancel receipt that was fully or partially refunded. Please cancel refund receipt first: " +
                data.receipt_number,
              refund: true,
            });
          } else {
            showAlert({
              button_text: "Disbale",
              heading: "Cancel receipt",
              section: (
                <div>
                  <ul>
                    <li>Receipt will not be accounted in reports</li>
                    <li>Items will be returned to stock</li>
                  </ul>
                  Are you sure you want to continue?
                </div>
              ),
              refund: false,
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const cancelReceiptConfirm = () => {
    const data = {
      receipt_number:
        (sales_receipt_data || [])[0] !== undefined &&
        (sales_receipt_data || [])[0] !== null
          ? (sales_receipt_data || [])[0].receipt_number
          : "",
      storeId:
        (sales_receipt_data || [])[0] !== undefined &&
        (sales_receipt_data || [])[0] !== null
          ? (sales_receipt_data || [])[0].store !== undefined &&
            (sales_receipt_data || [])[0].store !== null
            ? (sales_receipt_data || [])[0].store._id || ""
            : ""
          : "",
      cancelled_at: new Date(),
    };
    dispatch(cancel_receipt(data));
  };

  const showAlert = (param) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h3>{param.heading}</h3>
            <p>{param.section}</p>
            <CRow>
              <CCol sm xs="6" md="6" lg="6" className="text-center mt-3">
                <CButton
                  color="secondary"
                  block
                  className="btn-pill pull-right"
                  outline="outline"
                  onClick={() => {
                    onClose();
                  }}
                >
                  {param.refund ? "OK" : "No"}
                </CButton>
              </CCol>
              {param.refund ? (
                ""
              ) : (
                <CCol sm xs="6" md="6" lg="6" className="text-center mt-3">
                  <CButton
                    color="danger"
                    block
                    className="btn-pill pull-right"
                    outline="outline"
                    onClick={() => {
                      cancelReceiptConfirm();
                      onClose();
                    }}
                  >
                    Yes
                  </CButton>
                </CCol>
              )}
            </CRow>
          </div>
        );
      },
    });
  };
  const ShowTaxes = ({ items }) => {
    const taxes = [];
    items.map((ite) =>
      ite.taxes.map((tax) =>
        taxes.push({
          _id: tax._id,
          title: tax.title + " " + tax.tax_rate + "%",
          type: tax.tax_type == "Included in the price" ? "(included)" : "",
          // price: parseFloat((tax.tax_rate/100)*ite.total_price).toFixed(2)
          price: parseFloat(tax.tax_total).toFixed(2),
        })
      )
    );
    let group = groupBy(orderBy(taxes, "type", "desc"), "_id");
    let keys = Object.keys(group);

    return keys.map((key) => {
      return (
        <>
          <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
            <p className="d-flex justify-content-between">
              {group[key][0].title} {group[key][0].type}
              <span style={{ textAlign: "right" }}>
                -
                {
                  <Amount
                    value={sumBy(group[key]?.map((p) => parseFloat(p?.price)))}
                  />
                }
              </span>
            </p>
          </CCol>
        </>
      );
    });
  };
  const ShowPercentDiscounts = ({ items }) => {
    const discounts = [];
    items.map((ite) =>
      ite.discounts.map((dis) =>
        discounts.push({
          _id: dis._id,
          title: dis.title,
          percent: dis.type == "Percentage" ? dis.value + "%" : "",
          type: dis.type,
          price: parseFloat(dis.discount_total).toFixed(2),
        })
      )
    );

    let group = groupBy(discounts, "_id");
    let keys = Object.keys(group);

    return keys.map((key) => {
      return (
        <>
          <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
            <p className="d-flex justify-content-between">
              {group[key][0].title} {group[key][0].percent}
              <span style={{ textAlign: "right" }}>
                -
                {
                  <Amount
                    value={sumBy(group[key]?.map((p) => parseFloat(p?.price)))}
                  />
                }
              </span>
            </p>
          </CCol>
        </>
      );
    });
  };
  const ShowAmountDiscounts = ({ receipt }) => {
    const discounts = [];
    receipt.discounts.map((ite) =>
      discounts.push({
        _id: ite._id,
        title: ite.title,
        percent: ite.type == "Percentage" ? ite.value + "%" : "",
        type: ite.type,
        price: parseFloat(ite.value).toFixed(2),
      })
    );

    let group = groupBy(discounts, "_id");
    let keys = Object.keys(group);

    return keys.map((key) => {
      return (
        <>
          <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
            <p className="d-flex justify-content-between">
              {group[key][0].title} {group[key][0].percent}
              <span style={{ textAlign: "right" }}>
                -
                {
                  <Amount
                    value={sumBy(group[key]?.map((p) => parseFloat(p?.price)))}
                  />
                }
              </span>
            </p>
          </CCol>
        </>
      );
    });
  };

  return (
    <CSidebar
      aside
      colorScheme="light"
      size="xl"
      unfoldable
      show={show}
      onShowChange={closeReceiptDetail}
    >
      <CNav
        variant="tabs"
        className="nav-underline nav-underline-primary ml-auto "
      >
        <CNavItem>
          <CSidebarClose onClick={closeReceiptDetail} style={{ left: "0" }} />
        </CNavItem>

        <CNavItem>
          <CDropdown inNav className="c-header-nav-item mx-2">
            <CDropdownToggle caret={false}>
              {sales_receipt_data?.[0]?.cancelled_at ? (
                ""
              ) : (
                <CIcon name="cil-options" />
              )}
            </CDropdownToggle>
            {sales_receipt_data?.[0]?.cancelled_at ? (
              ""
            ) : (
              <CDropdownMenu placement="bottom-end" className="pt-0">
                <CDropdownItem onClick={cancelReceiptFunc}>
                  <CIcon name="cil-basket" className="mr-2" /> Cancel Receipt
                </CDropdownItem>
              </CDropdownMenu>
            )}
          </CDropdown>
        </CNavItem>
      </CNav>
      {(sales_receipt_data || []).map((item, index) => (
        <CCard style={{ overflowY: "hidden" }}>
          {typeof item?.cancelled_by !== "undefined" && item?.cancelled_by ? (
            <CRow className="">
              <CCol
                sm="12"
                md="12"
                lg="12"
                style={{
                  textAlign: "center",
                  backgroundColor: "#fff9c4",
                  color: "black",
                }}
              >
                <p className="cancel-alert">
                  Cancelled by {item?.cancelled_by?.name} on{" "}
                  {moment(item?.cancelled_at).format("MMM D, YYYY")} at{" "}
                  {moment(item?.cancelled_at).format("h:mm A")}
                </p>
              </CCol>
            </CRow>
          ) : (
            ""
          )}
          <CCardBody style={{ overflowY: "scroll" }}>
            <CRow className="p-3">
              <CCol sm="12" md="12" lg="12" style={{ textAlign: "center" }}>
                <h2>{<Amount value={item?.total_price} />}</h2>
                <h6>Total</h6>
              </CCol>
            </CRow>
            <hr />
            <CRow>
              <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
                <h6>
                  Cashier:{" "}
                  {item.cashier !== undefined && item.cashier !== null
                    ? item.cashier.name !== undefined &&
                      item.cashier.name !== null
                      ? item.cashier.name || ""
                      : ""
                    : ""}
                </h6>
                <h6>
                  Store:{" "}
                  {item.store !== undefined && item.store !== null
                    ? item.store.name !== undefined && item.store.name !== null
                      ? item.store.name || ""
                      : ""
                    : ""}
                </h6>
                <h6>
                  POS:{" "}
                  {item.device !== undefined && item.device !== null
                    ? item.device.name !== undefined && item.device.name !== null
                      ? item.device.name || ""
                      : ""
                    : ""}
                </h6>
              </CCol>
            </CRow>
            {item.customer !== undefined && item.customer !== null ? (
              item.customer.name !== undefined &&
              item.customer.name !== null ? (
                <>
                  <hr />
                  <CRow>
                    <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
                      <h6>Customer: {item.customer.name}</h6>
                      <h6>
                        {item.customer.email !== undefined &&
                        item.customer.email !== null
                          ? item.customer.email || ""
                          : ""}
                      </h6>
                    </CCol>
                  </CRow>
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {item.dining_option !== undefined && item.dining_option !== null
              ? item.dining_option.name !== undefined &&
                item.dining_option.name !== null
                ? (
                    <>
                      <hr />
                      <CRow>
                        <CCol
                          sm="12"
                          md="12"
                          lg="12"
                          style={{ textAlign: "left" }}
                        >
                          <h6>
                            <b> {item.dining_option.name}</b>
                          </h6>
                        </CCol>
                      </CRow>
                    </>
                  ) || ""
                :  <>
                <hr />
                <CRow>
                  <CCol
                    sm="12"
                    md="12"
                    lg="12"
                    style={{ textAlign: "left" }}
                  >
                    <h6>
                      <b> Dine In</b>
                    </h6>
                  </CCol>
                </CRow>
              </>
              :  <>
              <hr />
              <CRow>
                <CCol
                  sm="12"
                  md="12"
                  lg="12"
                  style={{ textAlign: "left" }}
                >
                  <h6>
                    <b> Dine In</b>
                  </h6>
                </CCol>
              </CRow>
            </>}
            <hr />
            <CRow>
              {(item.items || []).map((ite) => (
                <React.Fragment>
                  <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
                    <h6 className="d-flex justify-content-between">
                      <b>{ite.name}</b>
                      <span style={{ textAlign: "right" }}>
                        <h6>
                          <b>{<Amount value={ite?.total_price} />}</b>
                        </h6>
                      </span>
                    </h6>
                    <span style={darkMode ? {} : { color: "rgba(0,0,0,.54)" }}>
                      {ite.quantity} x {<Amount value={ite?.price} />}
                    </span>
                    <br />
                    {(ite.modifiers || []).map((mod) => {
                      return (mod.options || []).map((op) => {
                        return (
                          <>
                            <span
                              style={
                                darkMode ? {} : { color: "rgba(0,0,0,.54)" }
                              }
                            >
                              + {op.option_name} (
                              {<Amount value={op?.price * ite?.quantity} />})
                            </span>
                            <br />
                          </>
                        );
                      });
                    })}
                    <span style={darkMode ? {} : { color: "rgba(0,0,0,.54)" }}>
                      <i>{ite.comment}</i>
                    </span>
                    <br />
                  </CCol>
                </React.Fragment>
              ))}
            </CRow>
            {item.total_discount > 0 ? <hr /> : ""}
            <CRow>
              <ShowAmountDiscounts receipt={item} />
              <ShowPercentDiscounts items={item.items} />
            </CRow>
            <hr />
            {item.customer !== undefined && item.customer !== null ? (
              item.customer.name !== undefined &&
              item.customer.name !== null ? (
                <>
                  <CRow>
                    <CCol
                      sm="12"
                      md="12"
                      lg="12"
                      style={{ textAlign: "left", color: "#5baf41" }}
                    >
                      <p className="d-flex justify-content-between">
                        Points earned
                        <span style={{ textAlign: "right" }}>
                          {<Amount value={item.customer.points_earned} />}
                        </span>
                      </p>
                    </CCol>
                    <CCol
                      sm="12"
                      md="12"
                      lg="12"
                      style={{ textAlign: "left", color: "#5baf41" }}
                    >
                      <p className="d-flex justify-content-between">
                        Points balance
                        <span style={{ textAlign: "right" }}>
                          {<Amount value={item.customer.points_balance} />}
                        </span>
                      </p>
                    </CCol>
                  </CRow>
                  <hr />
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}

            <CRow>
              <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
                <h6 className="d-flex justify-content-between">
                  <b>Subtotal</b>
                  <span style={{ textAlign: "right" }}>
                    <b>
                      {
                        <Amount
                          value={
                            sumBy(item.items, "total_price") -
                            parseFloat(item.total_discount)
                          }
                        />
                      }
                    </b>
                  </span>
                </h6>
              </CCol>
            </CRow>
            <CRow>
              <ShowTaxes items={item.items} />
            </CRow>
            <hr />
            <CRow>
              <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
                <h6 className="d-flex justify-content-between">
                  <b>Total</b>
                  <span style={{ textAlign: "right" }}>
                    <b>{<Amount value={item?.total_price} />}</b>
                  </span>
                </h6>
              </CCol>
              <br />
              {item.payments.length > 0
                ? item.payments.map((pay) => {
                    return (
                      <>
                        <CCol
                          sm="12"
                          md="12"
                          lg="12"
                          style={{ textAlign: "left" }}
                        >
                          <p className="d-flex justify-content-between">
                            Amount due
                            <span style={{ textAlign: "right" }}>
                              {<Amount value={pay?.amount} />}
                            </span>
                          </p>
                        </CCol>
                        {pay.paymentType && pay.paymentType !== "" ? (
                          <CCol
                            sm="12"
                            md="12"
                            lg="12"
                            style={{ textAlign: "left", marginTop: "-15px" }}
                          >
                            <p className="d-flex justify-content-between">
                              {pay?.paymentType}
                              <span style={{ textAlign: "right" }}>
                                {
                                  <Amount
                                    value={pay?.amount + pay?.changeAmount}
                                  />
                                }
                              </span>
                            </p>
                          </CCol>
                        ) : (
                          ""
                        )}
                        {pay.changeAmount && pay.changeAmount !== 0 ? (
                          <CCol
                            sm="12"
                            md="12"
                            lg="12"
                            style={{ textAlign: "left", marginTop: "-15px" }}
                          >
                            <p className="d-flex justify-content-between">
                              Change
                              <span style={{ textAlign: "right" }}>
                                {<Amount value={pay?.changeAmount} />}
                              </span>
                            </p>
                          </CCol>
                        ) : (
                          ""
                        )}
                        <br />
                      </>
                    );
                  })
                : ""}

              {item.payments.length <= 0 && item?.cash_return > 0 ? (
                <>
                  <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
                    <p className="d-flex justify-content-between">
                      Change{" "}
                      <span style={{ textAlign: "right" }}>
                        {<Amount value={item?.cash_return} />}
                      </span>
                    </p>
                  </CCol>
                </>
              ) : (
                ""
              )}
            </CRow>
            <hr />
            <CRow>
              <CCol sm="6" md="6" lg="6" style={{ textAlign: "left" }}>
                <h6>
                  <b>
                    {moment(item.sale_timestamp).format("MMM Do YYYY, h:mm A")}
                  </b>
                </h6>
              </CCol>
              <CCol sm="6" md="6" lg="6" style={{ textAlign: "right" }}>
                <h6>
                  <b>
                    {item.receipt_number !== undefined &&
                    item.receipt_number !== null
                      ? item.receipt_number || ""
                      : ""}
                  </b>
                </h6>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      ))}
    </CSidebar>
  );
};
export default CancelReceipt;
