import React, { useEffect } from "react";
import * as echarts from "echarts";

function DoughnutChart({ course, index }) {
  useEffect(() => {
    if (course.studentProgress) {
      const chartDom = document.getElementById(`doughnutChart_${course.courseNameid}_${index}`);
      const myChart = echarts.init(chartDom);

      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Progress",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: course.studentProgress, name: "Uncompleted" },
            ],
          },
        ],
      };

      myChart.setOption(option);
    }
  }, [course, index]);

  return <div id={`doughnutChart_${course.courseNameid}_${index}`} style={{ width: "100%", height: "300px" }} />;
}

export default DoughnutChart;
