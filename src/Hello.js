import React from "react";

export const Hello = () => {
    // componentWillUnmount
    React.useEffect(() => {
        console.log("render");
        
        return () => console.log("unmount");
    }, []);

    return <div>hello</div>;
};