import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import FormBody from "../../components/form/FormBody";
import findLocalAns from "../../utils/findLocalAns";
import deleteLocalAns from "../../utils/deleteLocalAns";

const ViewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ans, setAns] = useState([]);

  // get the current user
  const { data: user, loading: userLoading } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/user`,
    {
      withCredentials: true,
    }
  );

  // get the form data
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/form/${id}`
  );

  useEffect(() => {
    const r = user?.responses?.find((r) => r.formId === id);
    // if the user has already responded to this form, redirect to the response page
    if (r) {
      deleteLocalAns(r.formId);
      navigate(`/form/r/${r.responseId}`);
    }
    // else set the local storage to enable offline sync
    else if (!userLoading) findLocalAns(id, setAns);
  }, [user, userLoading, id, navigate]);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <FormBody
      data={data}
      ans={ans}
      readonly={false}
      isLogged={user ? true : false}
    />
  );
};

export default ViewForm;
