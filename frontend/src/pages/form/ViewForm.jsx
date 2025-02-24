import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import FormBody from "../../components/form/FormBody";
import { deleteLocalAns } from "../../utils/handleLocalSync";
import { UserContext } from "../../context/UserContext";
import Error from "../../components/error/Error";
import FormSkeleton from "../../components/loading/FormSkeleton";
import FullScreen from "../../components/containers/FullScreen";

const ViewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // get the current user
  const { user } = useContext(UserContext);

  const [url, setUrl] = useState(null);

  // get the form data
  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    const r = user?.responses?.find((r) => r.formId === id);
    if (r) {
      // if the user has already responded to this form, redirect to the response page
      deleteLocalAns(r.formId);
      navigate(`/form/r/${r.responseId}`);
    } else {
      // in other cases, set the url to load the form
      setUrl(`${import.meta.env.VITE_APP_API_URL}/form/${id}`);
    }
  }, [user, id, data, navigate]);

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
