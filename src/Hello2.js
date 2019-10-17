import React, { useRef } from "react";

// only render one time
export const Hello2 = React.memo(({ increment }) => {
    const renders = useRef(0);
    console.log("hello2 renders: ", renders.current++);

    return <button onClick={increment}>hello2 add cnt</button>;
});