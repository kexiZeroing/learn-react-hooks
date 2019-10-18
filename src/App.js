import React, { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo, useReducer } from 'react';
import { useForm } from "./useForm";
import { Hello } from './Hello';
import { useFetch } from "./useFetch";
import { Hello2 } from './Hello2';
import { Increment } from "./Increment";

// not call every render
function expensiveInitialState() {
  return 10;
}

// return the new state based on different action, (state, action) -> state
// create new state (immutable)
function reducer(state, action) {
  switch(action.type) {
    case "INC":
      return state + 1;
    case "DEC":
      return state - 1;
    default:
      return state;
  }
}

function reducer2(state, action) {
  switch (action.type) {
    case "add-todo":
      return {
        todos: [...state.todos, { text: action.text, completed: false }],
        todoCount: state.todoCount + 1
      };
    case "toggle-todo":  
      return {
        todos: state.todos.map((t, idx) =>
          idx === action.idx ? { ...t, completed: !t.completed } : t
        ),
        todoCount: state.todoCount
      };
    default:
      return state;
  }
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

  // get measure data
  const divRef = useRef();
  useLayoutEffect(() => {
    console.log(`textWidth: ${divRef.current.getBoundingClientRect().width}`);
  }, [data])

  // prevent create function every time
  // useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.
  const [cnt, setCnt] = useState(0);
  const increment = useCallback(() => {
      setCnt(c => c + 1);
    }, [setCnt]);

  const favoriteNums = [10, 20, 30];
  const [cnt2, setCnt2] = useState(0);
  const increment2 = useCallback(n => {
      setCnt2(c => c + n);
    }, [setCnt2]);


  const postData = useFetch("https://jsonplaceholder.typicode.com/posts/1");
  const data2 = postData.data;

  // By default, it will get called in every render
  const computeLongestWord = (sentence) => {
    if(!sentence) return "";
    
    console.log('computing longest word get called');
    let longestWord = "";
    sentence.split(" ").forEach(word => {
      if(word.length > longestWord.length) {
        longestWord = word;
      }
    });

    return longestWord;
  }

  // useMemo returns a memoized value. Only recompute the memoized value when one of the dependencies has changed. Remember that the function passed to useMemo runs during rendering. 
  // useMemo does nothing when called with only one argument (function). Did you forget to pass an array of dependencies?  
  // useCallback(fn, deps) is equivalent to useMemo(() => fn, deps)
  const longestWord = useMemo(() => computeLongestWord(data2), [data2]);
 
  // similar to redux, pass in the reducer fucntion and initial value
  // An alternative to useState. Accepts a reducer of type (state, action) => newState, and returns the current state paired with a dispatch method. useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values.
  const [cnt3, dispatch] = useReducer(reducer, 0);

  // todos example using reducer
  const [{ todos, todoCount }, dispatch2] = useReducer(reducer2, {todos: [], todoCount: 0});
  const [text, setText] = useState("");

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
          // DOMRect {x: 8, y: 167, width: 132, height: 21, top: 167, …}
          console.log(inputRef.current.getBoundingClientRect());
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

      <div style={{display: 'flex'}}>
        <div ref={divRef}>{loading ? 'loading...' : data}</div>
      </div>
      <button onClick={() => setIdx(id => id + 1)}>change URL</button> 
      <br />

      {/* It will create the function every single render, so the props always change which causes re-render even if using React.memo */}
      {/* <Hello2 increment={() => setCnt(cnt + 1)} /> */}
      <Hello2 increment={increment} />
      <div>cnt: {cnt}</div>

      {favoriteNums.map(n => {
        return <Increment key={n} increment={increment2} num={n} />;
      })}
      <div>cnt2: {cnt2}</div>

      <div>{longestWord}</div>

      <div>cnt3: {cnt3}</div>
      <button onClick={() => dispatch({type: "INC"})}>+</button>
      <button onClick={() => dispatch({type: "DEC"})}>-</button>
      <br />

      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch2({type: "add-todo", text});
          setText("");
        }}
      >
        <input value={text} onChange={e => setText(e.target.value)} />
      </form>
      <div># of todos: {todoCount}</div>
      {todos.map((t, idx) => (
        <div
          key={t.text}
          onClick={() => dispatch2({ type: "toggle-todo", idx })}
          style={{textDecoration: t.completed ? "line-through" : ""}}
        >
          {t.text}
        </div>
      ))}

    </div>
  )
}

export default App;
