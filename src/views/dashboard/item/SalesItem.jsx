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
  get_item_sale_summary,
  delete_item_sale,
} from "../../../actions/reports/salesItemActions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import SalesItemDatatableNew from "../../../datatables/reports/SalesItemDatatableNew";
import ConformationAlert from "../../../components/conformationAlert/ConformationAlert";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import $ from "jquery";
const SalesItem = () => {
  $(".dropdown-menu a").on("click", function (event) {
    console.log("Event", event);
    // event.stopPropagation();

    // $(this).parent().toggleClass("open");
  });
  const dispatch = useDispatch();
  const filterComponent = useSelector(
    (state) => state.dashBoard.filterComponentReducer
  );

  const [columns, setColumns] = useState([
    { name: "item", title: "Item", isHidden: false },
    { name: "category", title: "Category", isHidden: false },
    { name: "item_sold", title: "Items sold", isHidden: false },
    { name: "sku", title: "SKU", isHidden: true },
    { name: "gross_sale", title: "Gross sales", isHidden: false },
    { name: "item_refunded", title: "Items refunded", isHidden: false },
    { name: "refund", title: "Refunds", isHidden: true },
    { name: "discount", title: "Discounts", isHidden: true },
    { name: "net_sale", title: "Net Sales", isHidden: true },
    { name: "cost_of_good", title: "Cost of goods", isHidden: true },
    { name: "gross_profit", title: "Gross profit", isHidden: false },
    { name: "margin", title: "Margin", isHidden: true },
    { name: "taxes", title: "Taxes", isHidden: true },
  ]);
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

  const deleteSalesItem = () => {
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
                  {true ? (
                    <React.Fragment>
                      <ConformationAlert
                        button_text="Delete"
                        heading="Delete Sales"
                        section={`Are you sure you want to delete the Sales Summary?`}
                        buttonAction={deleteSalesItem}
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
              <SalesItemDatatableNew item_sale_summary={[]} columns={columns} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default SalesItem;
