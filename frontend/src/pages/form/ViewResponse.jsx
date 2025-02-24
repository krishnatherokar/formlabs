import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import FormBody from "../../components/form/FormBody";
import Error from "../../components/error/Error";
import FormSkeleton from "../../components/loading/FormSkeleton";
import FullScreen from "../../components/containers/FullScreen";

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

  const props = {
    data: formdata,
    ans: response?.answers,
    readonly: true,
  };

  if (error || dataerror)
    return (
      <FullScreen>
        <Error>{error || dataerror}</Error>
      </FullScreen>
    );
  if (loading || dataloading) return <FormSkeleton />;

  return <FormBody {...props} />;
};

export default ViewForm;
