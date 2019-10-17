import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "./useForm";
import { Hello } from './Hello';
import { useFetch } from "./useFetch";

// not call every render
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

  // multipe useEffect fire orderly
  // componentDidMount
  useEffect(() => {
    console.log("componentDidMount");
  }, []);

  // dependency array
  useEffect(() => {
    console.log("after render");
  }, [values.firstName, count]);

  // clean-up work when old value changes
  useEffect(() => {    
    return () => console.log("clean-up");
  }, [count2]);

  // add listener once, and remove listener in the return function
  useEffect(() => {    
    const onMouseMove = e => {
      // console.log({x: e.x, y: e.y});
    }
    
    window.addEventListener('mousemove', onMouseMove);

    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [])

  // fetch data
  const [idx, setIdx] = useState(1);
  const {data, loading} = useFetch(`https://jsonplaceholder.typicode.com/todos/${idx}`);

  // pass to any component to refer it
  const inputRef = useRef();
  const hiRef = useRef(() => console.log("hi"));

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
        ref={inputRef}
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
      <button onClick={() => {
          // console.log(inputRef.current);
          inputRef.current.focus();
          hiRef.current();
      }}>
          focus username
      </button>
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

      <div>{loading ? 'loading...' : data}</div>
      <button onClick={() => setIdx(id => id + 1)}>change URL</button>
      <br />  

    </div>
  )
}

export default App;
