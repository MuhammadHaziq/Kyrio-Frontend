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
  get_sales_category_summary
} from "../../../actions/reports/salesCategoryActions";
import { useSelector, useDispatch } from "react-redux";
import SalesCategoryDatatable from "../../../datatables/reports/SalesCategoryDatatable";
import ConformationAlert from "../../../components/conformationAlert/ConformationAlert";
import ReportsFilters from "../../../components/reportFilters/ReportsFilters";
import dateformat from "dateformat";
import { CSVLink } from "react-csv";

const Categories = () => {
  const dispatch = useDispatch();

  const category_sales_summary = useSelector((state) => state.reports.salesCategoryReducer.category_sales_summary)
  const [columns, setColumns] = useState([
    { key: "category",      label: "Category",       filter: true, isShow: true,  disabled: true },
    { key: "ItemsSold",     label: "Items sold",     filter: true, isShow: true,  disabled: false },
    { key: "GrossSales",    label: "Gross sales",    filter: true, isShow: true,  disabled: false },
    { key: "ItemsRefunded", label: "Items refunded", filter: true, isShow: true,  disabled: false },
    { key: "Refunds",       label: "Refunds",        filter: true, isShow: true,  disabled: false },
    { key: "discounts",     label: "Discount",       filter: true, isShow: true,  disabled: false },
    { key: "NetSales",      label: "Net sales",      filter: true, isShow: true,  disabled: false },
    { key: "CostOfGoods",   label: "Cost of goods",  filter: true, isShow: true,  disabled: false },
    { key: "GrossProfit",   label: "Gross profit",   filter: true, isShow: true,  disabled: false },
    { key: "Margin",        label: "Margin",         filter: true, isShow: true,  disabled: false },
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
    if(!itm.disabled){
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
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow>
              {typeof category_sales_summary !== "undefined" && category_sales_summary.length > 0 ?
                <CCol xs="12" sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                <CSVLink data={category_sales_summary.length > 0 ? category_sales_summary.map(itm => {
                    return {
                      ["Category"]: itm.category,
                      ["No. of Items Sold"]: itm.ItemsSold,
                      ["Gross Sales"]: itm.GrossSales,
                      ["Total Items Refunded"]: itm.ItemsRefunded,
                      ["Refunds"]: itm.Refunds,
                      ["Discounts"]: itm.discounts,
                      ["Net Sales"]: itm.NetSales,
                      ["Cost of Goods"]: itm.CostOfGoods,
                      ["Gross Profit"]: itm.GrossProfit,
                      ["Margin"]: itm.Margin+"%"
                    }
                  }) : []}
                  filename={"SalesByItem"+dateformat(new Date)+".csv"}
                  target="_blank"
                  >
                  <CButton
                    color="success"
                    className="btn-square"
                    variant="outline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="c-icon c-icon-sm "
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
                  </CSVLink>
                </CCol>
                : ""}
                {/* <CCol xs="12" sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
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
                </CCol> */}
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
