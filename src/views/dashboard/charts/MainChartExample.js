import React from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils/src";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";

const MainChartExample = (attributes) => {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const defaultDatasets = (() => {
    return attributes.sales;
  })();

  const defaultOptions = (() => {
    let data = [];
    (attributes.sales || []).map((item) => {
      return data.push(...item.data);
    });
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
              // stepSize: Math.ceil(Math.max(...(data || [])) / 10),
              // max: Math.max(...(data || [])) + 100,
              stepSize: 8,
              max: parseInt(Math.max(...(data || [])) + 60),
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
      labels={attributes.labels}
    />
  );
};

export default MainChartExample;
