import { useParams } from "react-router-dom";

const ViewForm = () => {
  const { id } = useParams();
  return <div>id using useParams: {id}</div>;
};

export default ViewForm;
