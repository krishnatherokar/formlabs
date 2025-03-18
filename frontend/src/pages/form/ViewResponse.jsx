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

  const props = {
    data: response?.formInfo,
    ans: response?.answers,
    readonly: true,
  };

  if (error)
    return (
      <FullScreen>
        <Error>{error || dataerror}</Error>
      </FullScreen>
    );
  if (loading) return <FormSkeleton />;

  return <FormBody {...props} />;
};

export default ViewForm;
