import { useEffect, useState, useRef } from "react";

export const useFetch = url => {
    const [state, setState] = useState({ data: null, loading: true });
    const isLive = useRef(true);

    useEffect(() => {
        return () => {
          // get called when the component is going to unmount
          isLive.current = false;
        };
      }, []);

    useEffect(() => {
        setState(state => ({ data: state.data, loading: true }));

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setState({ data: data.title, loading: false });

                // a component that calls useFetch and unmount during this time, useRef to check
                // 'Cannot perform state update on an unmounted component.'
                // setTimeout(() => {
                //     if (isLive.current) {
                //       setState({ data: data.title, loading: false });
                //     }
                // }, 1000);
            });
    }, [url]);

  return state;
};