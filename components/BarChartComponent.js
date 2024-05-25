import moment from "moment";
import React from "react";
import { View } from "native-base";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from "victory-native";

const BarChartComponent = ({ data, min, max }) => {
  /*const formattedData = data.map((dataPoint) => ({
    date: moment(new Date(dataPoint.date)).format("DD-MM-YY HH:mm:ss"),
    value: dataPoint.value,
  }));*/
  const formattedData = data.map((dataPoint) => dataPoint.value).slice(-40);
  return (
    <View style={{ marginLeft: -10 }}>
      <VictoryChart
        minDomain={{ y: 34 }}
        maxDomain={{ y: 38 }}
        theme={VictoryTheme.material}
        domainPadding={{ x: -10 }} // Add padding to the domain
      >
        <VictoryAxis
          tickFormat={() => ""} // Hide x-axis labels
          style={{
            grid: { stroke: "none" }, // Remove grid lines on x-axis
          }}
        />
        <VictoryAxis
          tickFormat={(val) => val + "°C"}
          style={{
            tickLabels: {
              fontWeight: "bold",
              fontSize: 10,
              dx: 5,
              fill: "#fff",
            }, // Rotate the text vertically
            grid: { stroke: "none" }, // Remove grid lines on x-axis
          }}
          dependentAxis
        />
        <VictoryBar
          style={{
            data: {
              fill: "#ffffff", // Cycle through colors
            },
          }}
          barWidth={2}
          animate={{ duration: 1000 }}
          data={formattedData}
        />
      </VictoryChart>
    </View>
  );
};

export default BarChartComponent;
