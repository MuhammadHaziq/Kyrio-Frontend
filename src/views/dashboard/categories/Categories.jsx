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
import CIcon from "@coreui/icons-react";
import dateformat from "dateformat";
import FilterComponent from "../FilterComponent";
import { unmount_filter } from "../../../actions/dashboard/filterComponentActions";
import {
  get_sales_category_summary,
  delete_sales_summary,
} from "../../../actions/reports/salesCategoryActions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import SalesCategoryDatatableNew from "../../../datatables/reports/SalesCategoryDatatableNew";
import ConformationAlert from "../../../components/conformationAlert/ConformationAlert";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import ReportsFilters from "../../../components/reportFilters/ReportsFilters";
const Categories = () => {
  const dispatch = useDispatch();

  const [columns, setColumns] = useState([
    { name: "item_sold", title: "Item Sold", isHidden: false },
    { name: "gross_sales", title: "Gross Sales", isHidden: false },
    { name: "item_refund", title: "Item Refund", isHidden: false },
    { name: "refunds", title: "Refunds", isHidden: false },
    { name: "total_price", title: "Total Price", isHidden: false },
    { name: "discount", title: "Discount", isHidden: false },
    { name: "net_sales", title: "Net Sales", isHidden: false },
    { name: "cost_of_good", title: "Cost Of Good", isHidden: false },
    { name: "gross_profit", title: "Gross Profit", isHidden: false },
    { name: "margin", title: "Margin", isHidden: false },
    { name: "taxes", title: "Taxes", isHidden: true },
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
  const [showAlert, setShowAlert] = useState(false);
  const [filterReset, setFilterReset] = useState(false);
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

  const getNatural = (num) => {
    return parseFloat(num.toString().split(".")[0]);
  };

  useEffect(() => {
    return () => {
      setLoading(false);
      dispatch(unmount_filter());
    };
  }, []);

  const deleteSalesCategory = () => {
    console.log("Delete");
    setShowAlert(!showAlert);
  };

  const handleOnChangeCheck = (title) => {
    setColumns(
      columns.slice().map((item) => {
        if (item.title.trim() === title.trim()) {
          return {
            ...item,
            isHidden: !item.isHidden,
          };
        }
        return item;
      })
    );
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
                  {true ? (
                    <React.Fragment>
                      <ConformationAlert
                        button_text="Delete"
                        heading="Delete Sales"
                        section={`Are you sure you want to delete the Sales Summary?`}
                        buttonAction={deleteSalesCategory}
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
                                onClick={() => handleOnChangeCheck(item.title)}
                              >
                                <CFormGroup variant="custom-checkbox" inline>
                                  <CInputCheckbox
                                    custom
                                    name="datatableColumn"
                                    id={"datatableColumn" + index}
                                    value={index}
                                    checked={!item.isHidden}
                                  />
                                  <CLabel
                                    variant="custom-checkbox"
                                    id={"datatableColumn" + index}
                                  >
                                    {item.title}
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
              <SalesCategoryDatatableNew
                category_sales_summary={[]}
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
