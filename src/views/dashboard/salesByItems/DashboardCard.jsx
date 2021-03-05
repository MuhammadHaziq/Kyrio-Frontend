import React from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";

const DashboardCard = (props) => {
  // render
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <CRow>
      <CCol
        sm="6"
        lg="3"
        onClick={() => props.handleOnChangeSales("Gross sales")}
      >
        <CWidgetDropdown
          color="gradient-success"
          header={formatter.format(props.grossSales)}
          text="Gross Sales"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="success"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="2" onClick={() => props.handleOnChangeSales("Refunds")}>
        <CWidgetDropdown
          color="gradient-danger"
          header={formatter.format(props.refunds)}
          text="Refunds"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="danger"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>

      <CCol
        sm="6"
        lg="2"
        onClick={() => props.handleOnChangeSales("Discounts")}
      >
        <CWidgetDropdown
          color="gradient-warning"
          header={formatter.format(props.discounts)}
          text="Discounts"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{ height: "70px" }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>

      <CCol
        sm="6"
        lg="2"
        onClick={() => props.handleOnChangeSales("Net Sales")}
      >
        <CWidgetDropdown
          color="gradient-info"
          header={formatter.format(props.netSales)}
          text="Net Sales"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="info"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>
      <CCol
        sm="6"
        lg="3"
        onClick={() => props.handleOnChangeSales("Gross profit")}
      >
        <CWidgetDropdown
          color="gradient-primary"
          header={formatter.format(props.grossProfit)}
          text="Gross Profit"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="primary"
              label="Members"
              labels="months"
            />
          }
        >
          {/*<CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>*/}
        </CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

export default DashboardCard;
