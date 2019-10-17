import React from "react";

export const Increment = React.memo(({ increment, num }) => {
  console.log("square renders");

  return <button onClick={() => increment(num)}>+{num}</button>;
});