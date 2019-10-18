import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export function About() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h4>About</h4>
      <pre>{JSON.stringify(user)}</pre>
    </div>
  );
}