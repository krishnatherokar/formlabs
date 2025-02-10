import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const Home = lazy(() => import("../pages/home/Home"));

export const HomeRoutes = (
  <Route
    path="/"
    element={
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    }
  />
);
