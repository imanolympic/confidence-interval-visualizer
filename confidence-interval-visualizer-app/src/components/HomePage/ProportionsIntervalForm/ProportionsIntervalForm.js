import React, { useState } from "react";
import ProportionsIntervalFormStyle from "./ProportionsIntervalForm.module.scss";

const ProportionsIntervalForm = ({ datasets, setDatasets }) => {
  const [sampleProportion, setSampleProportion] = useState(0.634);
  const [sampleSize, setSampleSize] = useState(415);
  const [confidenceLevel, setConfidenceLevel] = useState(0.95);

  const libR = require("lib-r-math.js");
  const { Normal } = libR;
  const { qnorm } = Normal();

  const getStandardError = (sampleProportion, sampleSize) => {
    return Math.sqrt((sampleProportion * (1 - sampleProportion)) / sampleSize);
  };

  const getConfidenceScore = (confidenceLevel) => {
    const alpha = 1 - confidenceLevel;
    const p = alpha / 2;

    return qnorm(1 - p);
  };

  const randColor = () => {
    const r = Math.floor(Math.random() * (255 + 1));
    const g = Math.floor(Math.random() * (255 + 1));
    const b = Math.floor(Math.random() * (255 + 1));

    return `${r}, ${g}, ${b}`;
  };

  const getNewDataset = (sampleProportion, confidenceScore, stdError) => {
    const letfBound = sampleProportion - confidenceScore * stdError;
    const rightBound = sampleProportion + confidenceScore * stdError;

    return {
      label: "Graph",
      data: [
        { x: sampleProportion, y: 0 },
        { x: rightBound, y: 0 },
        { x: letfBound, y: 0 },
      ],
      backgroundColor: `rgb(${randColor()})`,
      pointStyle: "triangle",
      radius: 10,
    };
  };

  return (
    <>
      <form class={ProportionsIntervalFormStyle.form}>
        <div class={ProportionsIntervalFormStyle.form_sampleProportion}>
          <h1
            class={ProportionsIntervalFormStyle.form_sampleProportion_heading}
          >
            Sample Proportion
          </h1>
          <input
            class={ProportionsIntervalFormStyle.form_sampleProportion_input}
            type="number"
            step="0.01"
            min="0"
            placeholder="0.634"
            onChange={(e) => {
              e.target.value =
                e.target.value < 0 ? Math.abs(e.target.value) : e.target.value;
              setSampleProportion(e.target.value);
            }}
          ></input>
        </div>
        <div class={ProportionsIntervalFormStyle.form_sampleSize}>
          <h1 class={ProportionsIntervalFormStyle.form_sampleSize_heading}>
            Sample Size (n)
          </h1>
          <input
            class={ProportionsIntervalFormStyle.form_sampleSize_input}
            type="number"
            step="1"
            placeholder="415"
            onChange={(e) => {
              e.target.value =
                e.target.value < 0 ? Math.abs(e.target.value) : e.target.value;
              setSampleSize(e.target.value);
            }}
          ></input>
        </div>
        <div class={ProportionsIntervalFormStyle.form_confidenceLevel}>
          <h1 class={ProportionsIntervalFormStyle.form_confidenceLevel_heading}>
            Confidence Level
          </h1>
          <input
            class={ProportionsIntervalFormStyle.form_confidenceLevel_input}
            type="number"
            step="0.95"
            placeholder={confidenceLevel}
            onChange={(e) => {
              e.target.value =
                e.target.value < 0 ? Math.abs(e.target.value) : e.target.value;
              setConfidenceLevel(e.target.value);
            }}
          ></input>
        </div>
        <button
          class={ProportionsIntervalFormStyle.form_submitButton}
          onClick={(e) => {
            e.preventDefault();

            const stdError = getStandardError(sampleProportion, sampleSize);
            const confidenceScore = getConfidenceScore(confidenceLevel);
            const newDataset = getNewDataset(
              parseFloat(sampleProportion),
              confidenceScore,
              stdError
            );

            setDatasets([...datasets, newDataset]);
          }}
        >
          Create Interval
        </button>
      </form>
    </>
  );
};

export default ProportionsIntervalForm;
