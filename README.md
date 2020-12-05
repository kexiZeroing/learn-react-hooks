# learn-react-hooks

- useState
- useEffect
- useRef
- useLayoutEffect
- useCallback
- useMemo
- useReducer
- useContext

## React basic questions for interview

### What is the difference between the virtual DOM and the real DOM?
The DOM represents an HTML document as a tree structure where each node represents part of the document. Using vanilla JavaScript and the DOM API, you can access any element you like and update it directly. When you do this, the browser traverses the DOM and re-renders each node even if that node hasn't changed since the previous render. This can be noticeably inefficient. Imagine a scenario where you need to update only one `tr` of 10,000 in a table. Rendering all 10,000 rows will almost certainly lead to a drop in frames, potentially causing the table to flicker and interrupt the user's experience.

This is where React's virtual DOM (VDOM) comes into play. React increases your UI's performance by building a "virtual" representation of the DOM to keep track of all the changes it needs to make to the real DOM. Every time your app's state updates, React builds a new VDOM and diffs with the previous VDOM to determine what changes are necessary before updating the DOM directly. The important thing to mention here is diffing. If you want to flex a little, you can describe this process by its technical name, which is **reconciliation** (React reconciles the newly-built VDOM with the previous one).

### What are the limitations of React?
No tool is without its limitations, and React is no exception. React is considered to be a relatively heavy dependency by comparison with Vue. For this reason, React could be considered overkill for small apps. Comparing React and Vue in file size feels fair because they're both libraries as opposed to frameworks. Compared to a framework like Angular, React doesn't enforce strong opinions about how to write and structure your code or about which libraries to use for things like data fetching - with Angular, team members will instinctively reach for Angular's built-in HttpClient, whereas with React, teams depend on additional data-fetching libraries like Axios or Fetch. 

### What is JSX?
JSX is an extension to JavaScript understood only by preprocessors like Babel. Once encountered by a preprocessor, this HTML-like text is converted into regular old function calls to `React.createElement`. Note that while JSX is HTML-like, it is not HTML. If you're tempted to answer, "JSX allows you to write HTML in your JavaScript", that would not be accurate. `React.createElement` is part of React's public top-level API. Nothing is stopping you from invoking `React.createElement` in your own code. JSX is syntactic sugar for the `React.createElement` function.

### How do you pass a value between parent and child?
Pass the value as a prop when you need to pass a value from parent to child. To pass a value from a child component to its parent, the parent must first supply a function for the child component to call with the value. An example would be a custom form component. Imagine a custom form component to select a language called `SelectLanguage`. When the language is selected, we'd like to pass that value back up to the parent for processing. To do this, the `SelectLanguage` child component would need to accept a callback function as a prop, which it can then call with the value. A likely name for this kind of function would be `onLanguageSelect`.

### What is prop drilling and the Context API ?
Prop drilling is where you pass props from some `FirstComponent` to another `SecondComponent`, which does not actually need the data and only passes it to another `ThirdComponent` and maybe beyond. Prop drilling is considered to be a slippery slope if not an anti-pattern. Imagine drilling a prop 5, 10, maybe more levels deep - that code would quickly become difficult to understand. The trap happens when you need to share data across many different components like locale preference, theme preference, or user data. While prop drilling is not inherently bad, there are normally more eloquent and maintainable solutions to explore like using React Context. The Context API affords us a central data store, which we can implicitly access to consume data from any component without needing to request it as a prop explicitly. The main downside is that every time the context changes, all components consuming the value re-render. This may have negative performance consequences. For this reason, you should only use Context for infrequently updated data like a theme preference.

### What is the difference between props and state?
Props are essentially options you initialize a child component with. These options belong to the parent component and must not be updated by the child component receiving them. Props are therefore read-only. State, on the other hand, belongs to and is managed by the component. State is always initiated with a default value, and that value can change over the lifetime of the component in response to events like user input or network responses. When state changes, the component responds by re-rendering.

### What is the component lifecycle?
React components have 4 distinct phases of life: First, the component is **initialized** and **mounted** on the DOM; Over time the component is **updated**; Eventually, the component is **unmounted** from the DOM. Using the `useEffect` Hook in a functional component, we can run code at particular times in a component's life. You can think of the `useEffect` Hook as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined.

### When does the useEffect function run?
`useEffect` takes two arguments. The first argument is a function called effect and is what gives the `useEffect` Hook its name. The second argument is an optional array called dependencies and allows you to control when exactly the effect function is run. 
- If you pass an empty array (`[]`), the effect runs when the component is mounted.
- If you pass an array of state variables (`[var]`), the effect runs when the component is mounted, and anytime the values of these variables change.
- If you omit the dependencies argument, the effect is run when the component is mounted and on each state change.

The effect function returns either nothing (`undefined`) or a function we can call cleanup. This cleanup function executes before the component is removed from the UI to prevent memory leak similar to `componentWillUnmount`. If a component renders multiple times (as they typically do), the previous effect is cleaned up before executing the next effect.

### What is the difference between refs and state variables?
Both refs and state variables provide a way to persist values between renders; however, only state variables trigger a re-render. Refs are mostly used in one of two ways. One use of refs is to access a DOM element directly to manipulate it - an example would be when integrating a third-party DOM library. Another example might be to trigger imperative animations. The second use of refs is where they are sometimes a good choice to persist values between renders without triggering the component to re-render if the value changes.

When someone is new to React, refs often feel familiar to them because they are used to freely writing imperative code. For this reason, beginners tend to overreach for refs. But we know that to get the most from React, we must think in React and ideally control every piece of our app with state and component hierarchy.

### What is a Fragment?
Fragment is a component that supports returning multiple children from a component's render method without needing an extraneous `div` element. You can either reference it using React's top-level API `React.Fragment` or using JSX syntactic sugar `<>`.

### What is a higher order component?
A higher-order component (HOC) is a function that takes a component and returns a new, modified component. While HOCs are associated with React, they aren't a React feature so much as a pattern inspired by a functional programming pattern called higher-order functions whereby you also pass functions to functions. You can write custom HOCs or import them from libraries.

### What are uncontrolled and controlled components?
More specific names would be "controlled input component" and "uncontrolled input component". A controlled component is an input component whose value is controlled by React. Conversely, an uncontrolled component manages its own state - the component is not controlled by React and is therefore uncontrolled.

Imagine if you use a textarea on the page and start typing. Anything you type will be stored in the textarea automatically and accessible through its value property. Although React can access the value with a ref, React does not control the value here. This would be an example of an uncontrolled component. To take control of this component in React, you would need to subscribe to the textareas `onChange` event and update a state variable in response. Now React is managing the textareas value, and the content of the textarea can be updated by updating state. It's easy to imagine a function called `clearTextArea` that sets the input state variable to an empty string causing the textarea to clear.
