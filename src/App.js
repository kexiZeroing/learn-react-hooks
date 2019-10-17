import React, { useState } from 'react';
import { useForm } from "./useForm";

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
        value={values.firstName} 
        onChange={handleChange} 
      />
      <input
        name="lastName"
        value={values.lastName}
        onChange={handleChange}
      />
    </div>
  )
}

export default App;
