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
import ReportsFilters from "../../../components/reportFilters/ReportsFilters";
import {
  get_modifier_category_summary
} from "../../../actions/reports/salesModifierActions";
import { unmount_filter } from "../../../actions/dashboard/filterComponentActions";
import { useSelector, useDispatch } from "react-redux";
import SalesModifierDatatableNew from "../../../datatables/reports/SalesModifierDatatableNew";
import dateformat from "dateformat";
import { CSVLink } from "react-csv";

const SalesModifier = () => {
  const dispatch = useDispatch();

  const sale_modifier_summary = useSelector((state) => state.reports.salesModifierReducer.sale_modifier_summary)

  const [loading, setLoading] = useState(false);
  const [filterReset, setFilterReset] = useState(false);
  const [exportData, setExportData] = useState([])
  const [daysFilter, setDaysFilter] = useState([
    { days: 0, name: "Hours", disable: false, active: true },
    { days: 1, name: "Days", disable: true, active: false },
    { days: 6, name: "Weeks", disable: true, active: false },
    { days: 28, name: "Months", disable: true, active: false },
    { days: 120, name: "Quaters", disable: true, active: false },
    { days: 365, name: "Years", disable: true, active: false },
  ]);

  useEffect(() => {
    return () => {
      setLoading(false);
      dispatch(unmount_filter());
    };
  }, []);

  useEffect(() => {
    if(sale_modifier_summary.length > 0){
      let exortData = []
      sale_modifier_summary.map(itm => {
        return itm.options.map(op => {
          exortData.push({
            ["Modifier name"]: itm.Modifier,
            ["Option name"]: op.Option,
            ["Quantity Sold"]: op.quantitySold,
            ["Gross Sales"]: op.grossSales,
            ["Quantity Refunded"]: op.refundQuantitySold,
            ["Refunds"]: op.refundGrossSales,
            ["Net Sales"]: parseFloat(op.grossSales - op.refundQuantitySold).toFixed(2),
            ["H"]: "",
          })
        })
      })
      setExportData(exortData)
    }
  }, [sale_modifier_summary]);

  const [columns, setColumns] = useState([
    { key: "Modifier",           label: "Modifier",          filter: true, isShow: true, disabled: true },
    { key: "quantitySold",       label: "Quantity Sold",     filter: true, isShow: true, disabled: false },
    { key: "grossSales",         label: "Gross Sales",       filter: true, isShow: true, disabled: false },
    { key: "refundQuantitySold", label: "Quantity Refunded", filter: true, isShow: true, disabled: false },
    { key: "refundGrossSales",   label: "Refunds",           filter: true, isShow: true, disabled: false },
    { key: "net_sales",          label: "Net sales",         filter: true, isShow: true, disabled: false }
  ]);

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
        get_filter_record={get_modifier_category_summary}
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs="12" sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                {typeof sale_modifier_summary !== "undefined" && sale_modifier_summary.length > 0 ?
                <CSVLink data={exportData}
                  filename={"SalesByModifier"+dateformat(new Date)+".csv"}
                  target="_blank"
                  >
                    <CButton
                      color="secondary"
                      className="btn-square"
                    >
                      EXPORT
                    </CButton>
                  </CSVLink>
                  : ""}
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
              <SalesModifierDatatableNew
                sale_modifier_summary={sale_modifier_summary}
                columns={columns}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default SalesModifier;
