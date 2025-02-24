import { Route, Routes } from "react-router-dom";
import { HomeRoutes } from "./routes/HomeRoutes";
import { UserRoutes } from "./routes/UserRoutes";
import { FormRoutes } from "./routes/FormRoutes";
import { AuthRoutes } from "./routes/AuthRoutes";
import NotFound from "./pages/notfound/NotFound";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Navbar />
      <Routes>
        {HomeRoutes}
        {UserRoutes(user)}
        {FormRoutes(user)}
        {AuthRoutes()}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
