import React from "react";
import { CWidgetDropdown, CRow, CCol } from "@coreui/react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";
import Amount from "../../../components/utils/Amount";

const DashboardCard = (props) => {
  // render
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <CRow>
      <CCol sm="4" onClick={() => props.handleOnChangeSales("Gross sales")}>
        <CWidgetDropdown
          color="gradient-success"
          header={<Amount value={props.grossSales} />}
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

      <CCol sm="4" onClick={() => props.handleOnChangeSales("Refunds")}>
        <CWidgetDropdown
          color="gradient-danger"
          header={<Amount value={props.refunds} />}
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

      <CCol sm="4" onClick={() => props.handleOnChangeSales("Discounts")}>
        <CWidgetDropdown
          color="gradient-warning"
          header={<Amount value={props.discounts} />}
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

      <CCol sm="4" onClick={() => props.handleOnChangeSales("Net Sales")}>
        <CWidgetDropdown
          color="gradient-info"
          header={<Amount value={props.netSales} />}
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
      <CCol sm="4" onClick={() => props.handleOnChangeSales("Cost Of Goods")}>
        <CWidgetDropdown
          color="gradient-dark"
          header={<Amount value={props.CostOfGoods} />}
          text="Cost Of Goods"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="light"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>
      <CCol sm="4" onClick={() => props.handleOnChangeSales("Gross profit")}>
        <CWidgetDropdown
          color="gradient-primary"
          header={<Amount value={props.grossProfit} />}
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
        ></CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

export default DashboardCard;
