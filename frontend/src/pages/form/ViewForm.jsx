import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const ViewForm = () => {
  const { id } = useParams();
  const data = useFetch(`http://localhost:3000/form/${id}`);

  if (data == "Loading") return <div>Loading...</div>;

  return <div>{data.title}</div>;
};

export default ViewForm;
