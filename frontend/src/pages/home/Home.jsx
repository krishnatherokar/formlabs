import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <button>
        <Link to={"/user"}>Profile</Link>
      </button>
      <br />
      <button>
        <Link to={"/form/67af54b90c20687dacd75f5e"}>
          Form id: 67af54b90c20687dacd75f5e
        </Link>
      </button>
      <br />
      <button
        onClick={() => document.documentElement.setAttribute("theme", "dark")}
      >
        Dark Mode
      </button>
    </>
  );
};
export default Home;
