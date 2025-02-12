import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setdata] = useState("Loading");

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        let data = await response.json();
        setdata(data);
      } catch (err) {
        setdata(err.message);
      }
    }
    fetchData();
  }, [url]);

  return data;
};
export default useFetch;
