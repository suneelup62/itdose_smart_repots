import React from "react";

const GraphBox = ({
  data,
  width,
  options,
  component: Component,
  height,
  headName,
  handleGraphChange,
  value,
}) => {
  return (
    <>
      <div className={`mainBox1`} style={{ width: width, height: height }}>
        <div className="mainHeader">
          <h4>{headName}</h4>
          <select
            name="defaultChart"
            id="multipleCharts"
            value={value}
            onChange={handleGraphChange}
          >
            <option value="Bar chart">Bar chart</option>
            <option value="Line chart">Line chart</option>
            <option value="Pie chart">Pie chart</option>
            <option value="Curve Line chart">Curve Line chart</option>
            <option value="Polar Area chart">Polar Area chart</option>
            <option value="Stacked Bar Chart">Stacked Bar Chart</option>
          </select>
        </div>
        {Component && (
          <div className="chart-container">
            <Component data={data} options={options} />
          </div>
        )}
      </div>
    </>
  );
};

export default GraphBox;
