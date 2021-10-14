import React, { useState } from "react";
import { Scatter } from "react-chartjs";
import HomePageStyle from "./HomePage.module.scss";

const HomePage = () => {
  const [datasets, setDatasets] = useState([]);
  const [sampleSize, setSampleSize] = useState(10);
  const [confidenceLevel, setConfidenceLevel] = useState(0.95);
  const [sampleParameter, setSampleParameter] = useState(0);
  const [intervalType, setIntervalType] = useState("proportions");

  const randColor = () => {
    const r = Math.floor(Math.random() * (255 + 1));
    const g = Math.floor(Math.random() * (255 + 1));
    const b = Math.floor(Math.random() * (255 + 1));

    return `${r}, ${g}, ${b}`;
  };

  const qnorm = (p) => {
    p = parseFloat(p);
    var split = 0.42;

    var a0 = 2.50662823884;
    var a1 = -18.61500062529;
    var a2 = 41.39119773534;
    var a3 = -25.44106049637;
    var b1 = -8.4735109309;
    var b2 = 23.08336743743;
    var b3 = -21.06224101826;
    var b4 = 3.13082909833;
    var c0 = -2.78718931138;
    var c1 = -2.29796479134;
    var c2 = 4.85014127135;
    var c3 = 2.32121276858;
    var d1 = 3.54388924762;
    var d2 = 1.63706781897;

    var q = p - 0.5;

    var r, ppnd;

    if (Math.abs(q) <= split) {
      r = q * q;
      ppnd =
        (q * (((a3 * r + a2) * r + a1) * r + a0)) /
        ((((b4 * r + b3) * r + b2) * r + b1) * r + 1);
    } else {
      r = p;
      if (q > 0) r = 1 - p;
      if (r > 0) {
        r = Math.sqrt(-Math.log(r));
        ppnd = (((c3 * r + c2) * r + c1) * r + c0) / ((d2 * r + d1) * r + 1);
        if (q < 0) ppnd = -ppnd;
      } else {
        ppnd = 0;
      }
    }

    return ppnd;
  };

  const getStandardError = (sampleParameter, sampleSize) => {
    var stdError;

    if (intervalType === "proportions") {
      stdError = Math.sqrt(
        (sampleParameter * (1 - sampleParameter)) / sampleSize
      );
    } else {
      stdError = 0;
    }

    return stdError;
  };

  const data = {
    datasets: datasets,
  };

  const getConfidenceScore = (confidenceLevel) => {
    const alpha = 1 - confidenceLevel;

    return qnorm(1 - alpha / 2);
  };

  const getNewDataset = (sampleParameter, confidenceScore, stdError) => {
    const letfBound = sampleParameter - confidenceScore * stdError;
    const rightBound = sampleParameter + confidenceScore * stdError;

    return {
      label: "Graph",
      data: [
        { x: sampleParameter, y: 0 },
        { x: rightBound, y: 0 },
        { x: letfBound, y: 0 },
      ],
      backgroundColor: `rgb(${randColor()})`,
    };
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
  };

  return (
    <div class={HomePageStyle.container}>
      <h1> Confidence Interval Visualizer </h1>
      <form>
        <div>
          <h1> Sample Size (n): </h1>
          <input
            placeholder={sampleSize}
            onChange={(e) => {
              setSampleSize(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <h1> Confidence Level </h1>
          <input
            placeholder={confidenceLevel}
            onChange={(e) => {
              setConfidenceLevel(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <h1> Sample Parameter: </h1>
          <input
            placeholder={sampleParameter}
            onChange={(e) => {
              setSampleParameter(e.target.value);
            }}
          ></input>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();

            const stdError = getStandardError(sampleParameter, sampleSize);
            const confidenceScore = getConfidenceScore(confidenceLevel);

            setDatasets([
              ...datasets,
              getNewDataset(sampleParameter, confidenceScore, stdError),
            ]);
          }}
        >
          Create Interval
        </button>
      </form>

      <Scatter height={400} width={400} data={data} options={options} />
    </div>
  );
};

export default HomePage;
