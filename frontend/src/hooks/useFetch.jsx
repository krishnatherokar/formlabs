import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, { body = null, ...options } = {}, method = "GET") => {
  const [state, setstate] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const config = {
      ...options,
      withCredentials: true,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    };

    async function fetchData() {
      setstate({ data: null, loading: true, error: null });
      try {
        let response;

        switch (method) {
          case "GET":
            response = await axios.get(url, config);
            break;
          case "POST":
            response = await axios.post(url, body, config);
            break;
          case "DELETE":
            response = await axios.delete(url, config);
        }
        let data = response.data;
        setstate({ data: data, loading: false, error: null });
      } catch (err) {
        setstate({
          data: null,
          loading: false,
          error:
            err.response &&
            !err.response.headers["content-type"].includes("text/html")
              ? err.response.data
              : err.message,
        });
      }
    }

    if (url) fetchData();
    else setstate({ data: null, loading: false, error: null });
    return () => controller.abort();
  }, [url]);

  return state;
};
export default useFetch;
