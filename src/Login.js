import React, { useContext } from "react";
import { UserContext } from "./UserContext";

// emulate request to login and get the user data
const login = async () => {
  return {
    id: 3,
    username: "bob",
    email: "bob@rice.edu"
  }
}

export function Login() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h4>Home</h4>
      {/* all the components that use the user data will change */}
      {user ? 
        <button onClick={() => setUser(null)}>logout</button> 
        :
        <button onClick={async () => setUser(await login())}>login</button>}
      <pre>{JSON.stringify(user)}</pre>
    </div>
  );
}