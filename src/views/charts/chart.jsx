import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol
} from "@coreui/react"
// Step 2 - Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const Charts = (props) => {

    const [chart,setChart] = useState();
    
    const [chartData,setChartData] = useState([
        {
          label: "Venezuela",
          value: "290"
        },
        {
          label: "Saudi",
          value: "260"
        },
        {
          label: "Canada",
          value: "180"
        },
        {
          label: "Iran",
          value: "140"
        },
        {
          label: "Russia",
          value: "115"
        },
        {
          label: "UAE",
          value: "100"
        },
        {
          label: "US",
          value: "30"
        },
        {
          label: "China",
          value: "30"
        }
      ]);

      const [chartConfigs,setChartConfigs] = useState(// Create a JSON object to store the chart configurations
        {
          type: "area2d", // The chart type
          width: "100%",
          renderAt: 'chart-container',
          height: "400",
          dataFormat: "json", // Data type
          dataSource: {
            // Chart Configuration
            chart: {
              caption: "Countries With Most Oil Reserves [2017-18]",    //Set the chart caption
              subCaption: "In MMbbl = One Million barrels",             //Set the chart subcaption
              xAxisName: "Country",           //Set the x-axis name
              yAxisName: "Reserves (MMbbl)",  //Set the y-axis name
              numberSuffix: "K",
              theme: "fusion"                 //Set the theme for your chart
            },
            // Chart Data - from step 2
            data: chartData
          }
        });

    useEffect(()=>{
        let chart = ""

        // ... chart code goes here ...
    
        setChart(chart)
    },[])
  
  return (
    <CRow> 
      <div id="chart-container">
        <ReactFC {...chartConfigs} />
      </div>
    </CRow>
  )
}

export default Charts
