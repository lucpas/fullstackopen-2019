import React, { useState } from "react";

import Feedback from "./components/Feedback";
import Statistics from "./components/Statistics";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Feedback
        onGoodClick={() => setGood(good + 1)}
        onNeutralClick={() => setNeutral(neutral + 1)}
        onBadClick={() => setBad(bad + 1)}
      />
      {good | neutral | bad ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : null}
    </div>
  );
};

export default App;
