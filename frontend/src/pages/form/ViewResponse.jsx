import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import FormBody from "../../components/form/FormBody";
import { useEffect } from "react";

const ViewForm = () => {
  const { id } = useParams();
  const {
    data: response,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_APP_API_URL}/form/r/${id}`);

  const {
    data: formdata,
    loading: dataloading,
    error: dataerror,
  } = useFetch(
    response
      ? `${import.meta.env.VITE_APP_API_URL}/form/${response.formId}`
      : null
  );

  if (error || dataerror) return <div>{error}</div>;
  if (loading || dataloading) return <div>Loading...</div>;

  return <FormBody data={formdata} ans={response.answers} readonly={true} />;
};

export default ViewForm;
