import React, { useState } from "react";
import { Scatter } from "react-chartjs";
import IntervalTypeToggleButton from "./IntervalTypeToggleButton/IntervalTypeToggleButton";
import ProportionsIntervalForm from "./ProportionsIntervalForm/ProportionsIntervalForm";
import MeansIntervalForm from "./MeansIntervalForm/MeansIntervalForm";
import HomePageStyle from "./HomePage.module.scss";
import { options } from "./chartOptions";

const HomePage = () => {
  const [intervalType, setIntervalType] = useState("proportions");
  const [datasets, setDatasets] = useState([]);

  const data = {
    datasets: datasets,
  };

  return (
    <div class={HomePageStyle.container}>
      <h1 class={HomePageStyle.title}> Confidence Interval Visualizer </h1>

      <IntervalTypeToggleButton
        class={HomePageStyle.intervalTypeButton}
        type={intervalType}
        setType={setIntervalType}
      />

      {intervalType === "proportions" ? (
        <ProportionsIntervalForm
          datasets={datasets}
          setDatasets={setDatasets}
        />
      ) : (
        <MeansIntervalForm datasets={datasets} setDatasets={setDatasets} />
      )}

      <div class={HomePageStyle.chart}>
        <Scatter
          class={HomePageStyle.chart_scatter}
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default HomePage;
