import React from "react";

import Statistic from "./Statistic";
import { directive } from "@babel/types";

const Statistics = props => {
  const all = props.good + props.neutral + props.bad;
  const average = (props.good + props.bad * -1) / all;
  const positive = props.good / all;

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text={"good"} value={props.good} />
          <Statistic text={"neutral"} value={props.neutral} />
          <Statistic text={"bad"} value={props.bad} />
          <Statistic text={"all"} value={all} />
          <Statistic text={"average"} value={average} />
          <Statistic text={"positive"} value={positive * 100 + "%"} />
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
