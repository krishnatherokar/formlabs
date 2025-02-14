import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, { body = null, ...options} = {}, method = "GET") => {
  const [state, setstate] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const config = {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      }
    }

    async function fetchData() {
      setstate({ data: null, loading: true, error: null });
      try {
        let response = method == "GET"? await axios.get(url, config): await axios.post(url, body, config);
        let data = response.data;
        setstate({ data: data, loading: false, error: null });
      } catch (err) {
        setstate({
          data: null,
          loading: false,
          error: err.response
            ? `Error ${err.response.status}: ${err.response.data}`
            : err.message,
        });
      }
    }

    if (url) fetchData();
    return () => controller.abort();
  }, [url]);

  return state;
};
export default useFetch;
