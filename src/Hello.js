import React, { useRef } from "react";

export const Hello = () => {
    const renders = useRef(0);
    // At first show 0, 1, 2 because setState 3 times in useFetch 
    console.log("hello renders: ", renders.current++);

    React.useEffect(() => {
        console.log("render");
        
        return () => console.log("unmount");
    }, []);

    return <div>hello</div>;
};