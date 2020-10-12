import React from 'react'
// import ApexCharts from 'apexcharts'
import Chart from "react-apexcharts";

const Charts = (props) => {

  
  return (
    <>
        <Chart
            options={{
                chart: {
                id: "basic-bar"
                },
                xaxis: {
                    categories: ['Sep 10', 'Sep 11', 'Sep 12', 'Sep 13', 'Sep 14', 'Sep 15', 'Sep 16', 'Sep 17', 'Sep 18']
                },
                theme: {
                    palette: 'palette3' // upto palette10
                }
                }}
                
            series={[
                {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
                }
            ]}
            type={props.type}
            width="1000"
            height="200"
            />
    </>
  )
}

export default Charts
