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
import { unmount_filter } from "../../../actions/dashboard/filterComponentActions";
import {
  get_sales_category_summary,
  toggle_loading,
} from "../../../actions/reports/salesCategoryActions";
import { useSelector, useDispatch } from "react-redux";
import SalesCategoryDatatable from "../../../datatables/reports/SalesCategoryDatatable";
import ReportsFilters from "../../../components/reportFilters/ReportsFilters";
import dateformat from "dateformat";
import { CSVLink } from "react-csv";
import { amountFormat } from "../../../utils/helpers";

const Categories = () => {
  const dispatch = useDispatch();

  const category_sales_summary = useSelector(
    (state) => state.reports.salesCategoryReducer.category_sales_summary
  );
  const loadingFilter = useSelector(
    (state) => state.reports.salesCategoryReducer.loading
  );
  const decimal = useSelector((state) => state.auth.user.decimal);

  const [columns, setColumns] = useState([
    {
      key: "category",
      label: "Category",
      filter: true,
      isShow: true,
      disabled: true,
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
      label: "Discount",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "NetSales",
      label: "Net sales",
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
  const [daysFilter, setDaysFilter] = useState([
    { days: 0, name: "Hours", disable: false, active: true },
    { days: 1, name: "Days", disable: true, active: false },
    { days: 6, name: "Weeks", disable: true, active: false },
    { days: 28, name: "Months", disable: true, active: false },
    { days: 120, name: "Quaters", disable: true, active: false },
    { days: 365, name: "Years", disable: true, active: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [filterReset, setFilterReset] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(false);
      dispatch(unmount_filter());
    };
  }, []);

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
        get_filter_record={get_sales_category_summary}
        toggle_loading={toggle_loading}
        loading={loadingFilter}
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs="12" sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                  {typeof category_sales_summary !== "undefined" &&
                  category_sales_summary.length > 0 ? (
                    <CSVLink
                      data={
                        category_sales_summary.length > 0
                          ? category_sales_summary.map((itm) => {
                              return {
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
                      filename={
                        "SalesByCategories" + dateformat(new Date()) + ".csv"
                      }
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
                                    disabled={item.disabled}
                                    checked={item.isShow}
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
              <SalesCategoryDatatable
                category_sales_summary={category_sales_summary}
                columns={columns}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Categories;
// <FilterComponent handleOnChangeSales={() => console.log("No Function")} />
