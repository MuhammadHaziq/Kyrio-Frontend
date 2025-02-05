import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CInputCheckbox,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormGroup,
  CLabel,
} from "@coreui/react";
// import CIcon from "@coreui/icons-react";
import dateformat from "dateformat";
// import FilterComponent from "../FilterComponent";
import { unmount_filter } from "../../../actions/dashboard/filterComponentActions";
import {
  get_item_sale_summary,
  toggle_loading,
} from "../../../actions/reports/salesItemActions";
import ReportsFilters from "../../../components/reportFilters/ReportsFilters";
import { useSelector, useDispatch } from "react-redux";
// import moment from "moment";
import SalesItemDatatableNew from "../../../datatables/reports/SalesItemDatatableNew";
import { CSVLink } from "react-csv";
import { amountFormat } from "../../../utils/helpers";

const SalesItem = () => {
  const decimal = useSelector((state) => state.auth.user.decimal);

  const item_sales_summary = useSelector(
    (state) => state.reports.salesItemReducer.item_sales_summary
  );
  const loadingFilter = useSelector(
    (state) => state.reports.salesItemReducer.loading
  );

  const dispatch = useDispatch();
  const filterComponent = useSelector(
    (state) => state.dashBoard.filterComponentReducer
  );

  const [columns, setColumns] = useState([
    { key: "name", label: "Item", filter: true, isShow: true, disabled: true },
    { key: "sku", label: "SKU", filter: true, isShow: true, disabled: false },
    {
      key: "category",
      label: "Category",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "ItemsSold",
      label: "Items sold",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "GrossSales",
      label: "Gross sales",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "ItemsRefunded",
      label: "Items refunded",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "Refunds",
      label: "Refunds",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "discounts",
      label: "Discounts",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "NetSales",
      label: "Net Sales",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "CostOfGoods",
      label: "Cost of goods",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "GrossProfit",
      label: "Gross profit",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "Margin",
      label: "Margin",
      filter: true,
      isShow: true,
      disabled: false,
    },
    { key: "Tax", label: "Taxes", filter: true, isShow: true, disabled: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [filterReset, setFilterReset] = useState(false);
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
    }
  }, [filterComponent, changeInFilter]);

  const deleteSalesItem = () => {
    setShowAlert(!showAlert);
  };

  const handleOnChangeCheck = (itm) => {
    if (!itm.disabled) {
      setColumns(
        columns.slice().map((item) => {
          if (item.key.trim() === itm.key.trim()) {
            return {
              ...item,
              isShow: !item.isShow,
            };
          }
          return item;
        })
      );
    }
  };

  return (
    <>
      <ReportsFilters
        daysFilter={daysFilter}
        resetFilter={filterReset}
        filter={false}
        get_filter_record={get_item_sale_summary}
        toggle_loading={toggle_loading}
        loading={loadingFilter}
      />
      <CRow>
        <CCol>
          {/* <CCard>
            <CCardBody>

            </CCardBody>
          </CCard> */}
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs="12" sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                  {typeof item_sales_summary.itemsReport !== "undefined" &&
                  item_sales_summary.itemsReport.length > 0 ? (
                    <CSVLink
                      data={
                        item_sales_summary.itemsReport.length > 0
                          ? item_sales_summary.itemsReport.map((itm) => {
                              return {
                                ["Name"]: itm.name,
                                ["SKU"]: itm.sku,
                                ["Category"]: itm.category,
                                ["No. of Items Sold"]: itm.ItemsSold,
                                ["Gross Sales"]: amountFormat(
                                  itm?.GrossSales,
                                  parseInt(decimal)
                                ),
                                ["Total Items Refunded"]: itm.ItemsRefunded,
                                ["Refunds"]: amountFormat(
                                  itm?.Refunds,
                                  parseInt(decimal)
                                ),
                                ["Discounts"]: amountFormat(
                                  itm?.discounts,
                                  parseInt(decimal)
                                ),
                                ["Net Sales"]: amountFormat(
                                  itm?.NetSales,
                                  parseInt(decimal)
                                ),
                                ["Cost of Goods"]: amountFormat(
                                  itm?.CostOfGoods,
                                  parseInt(decimal)
                                ),
                                ["Gross Profit"]: amountFormat(
                                  itm?.GrossProfit,
                                  parseInt(decimal)
                                ),
                                ["Margin"]:
                                  amountFormat(itm?.Margin, parseInt(decimal)) +
                                  "%",
                                ["Taxes"]: amountFormat(
                                  itm?.Tax,
                                  parseInt(decimal)
                                ),
                              };
                            })
                          : []
                      }
                      filename={"SalesByItem" + dateformat(new Date()) + ".csv"}
                      target="_blank"
                    >
                      <CButton color="secondary" className="btn-square">
                        EXPORT
                      </CButton>
                    </CSVLink>
                  ) : (
                    ""
                  )}
                </CCol>
                <CCol xs="12" sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                  <CCol
                    xs="12"
                    sm="4"
                    md="4"
                    xl="xl"
                    className="mb-3 mb-xl-0 float-right"
                  >
                    <CDropdown style={{ backgroundColor: "white" }}>
                      <CDropdownToggle caret color="default  btn-block">
                        Select Column
                      </CDropdownToggle>
                      <CDropdownMenu style={{ width: "max-content" }}>
                        {columns.map((item, index) => {
                          return (
                            <React.Fragment>
                              <CDropdownItem
                                onClick={() => handleOnChangeCheck(item)}
                              >
                                <CFormGroup variant="custom-checkbox" inline>
                                  <CInputCheckbox
                                    custom
                                    name="datatableColumn"
                                    id={"datatableColumn" + index}
                                    value={index}
                                    checked={item.isShow}
                                    disabled={item.disabled}
                                  />
                                  <CLabel
                                    variant="custom-checkbox"
                                    id={"datatableColumn" + index}
                                  >
                                    {item.label}
                                  </CLabel>
                                </CFormGroup>
                              </CDropdownItem>
                            </React.Fragment>
                          );
                        })}
                      </CDropdownMenu>
                    </CDropdown>
                  </CCol>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              {typeof item_sales_summary.itemsReport !== "undefined" &&
              item_sales_summary.itemsReport.length > 0 ? (
                <SalesItemDatatableNew
                  item_sale_summary={item_sales_summary.itemsReport}
                  columns={columns}
                />
              ) : (
                <SalesItemDatatableNew
                  item_sale_summary={[]}
                  columns={columns}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default SalesItem;
