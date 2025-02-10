import { Route, Routes } from "react-router-dom";
import { HomeRoutes } from "./routes/HomeRoutes";
import { UserRoutes } from "./routes/UserRoutes";
import { FormRoutes } from "./routes/FormRoutes";
import NotFound from "./pages/notfound/NotFound";

const App = () => {
  return (
    <Routes>
      {HomeRoutes}
      {UserRoutes}
      {FormRoutes}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
