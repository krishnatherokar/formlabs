import { useParams } from "react-router-dom";
import { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import FormBody from "../../components/form/FormBody";
import { UserContext } from "../../context/UserContext";
import Error from "../../components/error/Error";
import FormSkeleton from "../../components/loading/FormSkeleton";
import FullScreen from "../../components/containers/FullScreen";

const ViewForm = () => {
  const { id } = useParams();

  // get the current user
  const { user } = useContext(UserContext);

  // get the form data
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/form/${id}`
  );

  const props = {
    data,
    readonly: false,
    isLogged: user ? true : false,
  };

  if (error)
    return (
      <FullScreen>
        <Error>{error}</Error>
      </FullScreen>
    );
  if (loading) return <FormSkeleton />;

  return <FormBody {...props} />;
};

export default ViewForm;
