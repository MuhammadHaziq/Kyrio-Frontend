import React from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils/src";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";
const brandWarning = getStyle("warning") || "#e1a82d";
const brandPrimary = getStyle("primary") || "#4638c2";

const MainChartExample = (attributes) => {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const defaultDatasets = (() => {
    let elements = 27;
    const data1 = [];
    const data2 = [];
    const data3 = [];
    for (let i = 0; i <= elements; i++) {
      data1.push(random(50, 200));
      data2.push(random(80, 100));
      data3.push(65);
    }
    return [
      {
        label: "Gross sales",
        backgroundColor: hexToRgba(brandSuccess, 10),
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: attributes.sales.grossSales.data,
      },
      {
        label: "Refunds",
        backgroundColor: hexToRgba(brandDanger, 10),
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 2,
        data: attributes.sales.grossSales.data2,
      },
      {
        label: "Discounts",
        backgroundColor: hexToRgba(brandWarning, 10),
        borderColor: brandWarning,
        pointHoverBackgroundColor: brandWarning,
        borderWidth: 2,
        data: attributes.sales.grossSales.data3,
      },
      {
        label: "Net Sales",
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: attributes.sales.grossSales.data4,
      },
      {
        label: "Gross profit",
        backgroundColor: hexToRgba(brandPrimary, 10),
        borderColor: brandPrimary,
        pointHoverBackgroundColor: brandPrimary,
        borderWidth: 2,
        data: attributes.sales.grossSales.data5,
      },
    ];
  })();

  const defaultOptions = (() => {
    let data = [];
    data.push(...attributes.sales.grossSales.data);
    data.push(...attributes.sales.grossSales.data2);
    data.push(...attributes.sales.grossSales.data3);
    data.push(...attributes.sales.grossSales.data4);
    data.push(...attributes.sales.grossSales.data5);

    console.log(attributes.sales.grossSales.labels);
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 10,
              stepSize: Math.ceil(Math.max(...data) / 10),
              max: Math.max(...data) + 100,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  // render
  return (
    <CChartLine
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={attributes.sales.grossSales.labels}
    />
  );
};

export default MainChartExample;
