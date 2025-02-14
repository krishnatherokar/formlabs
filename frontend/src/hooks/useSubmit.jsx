import { useEffect, useState } from "react";

const useSubmit = (pathToFetch) => {
  const [url, setUrl] = useState(null);
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    document.activeElement.blur();
    setReadyToSubmit(true);
  };

  useEffect(() => {
    if (readyToSubmit) {
      setUrl(`${import.meta.env.VITE_APP_API_URL}${pathToFetch}`);
      setReadyToSubmit(false);
    }
  }, [readyToSubmit]);

  return { url, handleSubmit };
};
export default useSubmit;
