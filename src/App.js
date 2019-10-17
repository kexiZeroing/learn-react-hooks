import React, { useState, useEffect } from 'react';
import { useForm } from "./useForm";
import { Hello } from './Hello';

function expensiveInitialState() {
  return 10;
}

const App = () => {
  const [count, setCount] = useState(1);
  const [count2, setCount2] = useState(() => expensiveInitialState());
  const [{num1, num2}, setNum] = useState({num1: 1, num2: 2});

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [values, handleChange] = useForm({ firstName: "", lastName: "" });
   
  const [showHello, setShowHello] = useState(true);

  // componentDidMount
  useEffect(() => {
    console.log("componentDidMount");
  }, []);

  // dependency array
  useEffect(() => {
    console.log("after render");
  }, [values.firstName, count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <div>{count}</div>

      <button onClick={() => setCount2(cur => cur + 1)}>+</button>
      <div>{count2}</div>

      <button onClick={() => setNum(cur => ({
            ...cur, 
            num1: cur.num1 + 1
          }))
        }>
          +
      </button>
      <div>{num1}</div>
      <div>{num2}</div>

      <input 
        name="username" 
        placeholder="username" 
        value={username} 
        onChange={e => setUsername(e.target.value)} 
      />
      <input 
        name="password" 
        placeholder="password" 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)}
      />
      <br />

      <input 
        name="firstName" 
        placeholder="firstName" 
        value={values.firstName} 
        onChange={handleChange} 
      />
      <input
        name="lastName"
        placeholder="lastName" 
        value={values.lastName}
        onChange={handleChange}
      />
      <br />

      <button onClick={() => setShowHello(!showHello)}>toggle</button>
      {showHello && <Hello />}
    </div>
  )
}

export default App;
