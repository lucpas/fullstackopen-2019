import React from "react";

import Button from "./Button";

const Feedback = props => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={props.onGoodClick} title={"good"} />
      <Button onClick={props.onNeutralClick} title={"neutral"} />
      <Button onClick={props.onBadClick} title={"bad"} />
    </div>
  );
};

export default Feedback;
