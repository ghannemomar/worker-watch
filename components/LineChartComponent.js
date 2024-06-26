import moment from "moment";
import React from "react";
import { View } from "react-native";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from "victory-native";

const LineChartComponent = ({ data, min, max }) => {
  const formattedData = data.map((dataPoint) => ({
    date: moment(new Date(dataPoint.date)).format("DD-MM-YY HH:mm:ss"),
    value: dataPoint.value,
  }));
  return (
    <View style={{ marginLeft: -10 }}>
      <VictoryChart
        minDomain={{ y: min }}
        maxDomain={{ y: max }}
        theme={VictoryTheme.material}
        height={400}
      >
        <VictoryAxis
          style={{
            grid: { stroke: "none" }, // Remove grid lines on x-axis
          }}
          orientation="bottom"
          tickFormat={() => ""} // Hide x-axis labels
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              fontWeight: "bold",
              fontSize: 10,
              dx: 5,
              fill: "#fff",
            }, // Rotate the text vertically
          }}
        />
        <VictoryLine
          interpolation="natural"
          data={formattedData}
          animate={{ duration: 2000 }} // Set duration of animation in milliseconds
          x="date"
          y="value"
          style={{
            data: { stroke: "#ffff", strokeWidth: 4 },
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default LineChartComponent;
