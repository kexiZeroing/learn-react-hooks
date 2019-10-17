import React, { useRef } from "react";

/*
If your function component renders the same result given the same props, you can wrap it in a call to React.memo for a performance boost in some cases by memoizing the result. This means that React will skip rendering the component, and reuse the last rendered result. 
*/

/*
By default, React will always re-render this component if the parent (App) is changed, which means parent renders, this will renders. What memo does is compare the props, only re-render this when props change.
 */
export const Hello = React.memo(() => {
    const renders = useRef(0);
    console.log("hello renders: ", renders.current++);

    React.useEffect(() => {
        console.log("render");
        
        return () => console.log("unmount");
    }, []);

    return <div>hello</div>;
});