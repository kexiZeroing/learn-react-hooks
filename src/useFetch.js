import { useEffect, useState } from "react";

export const useFetch = url => {
    const [state, setState] = useState({ data: null, loading: true });

    useEffect(() => {
        setState(state => ({ data: state.data, loading: true }));

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setState({ data: data.title, loading: false });
            });
    }, [url]);

  return state;
};