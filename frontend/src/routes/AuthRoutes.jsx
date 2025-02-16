import { Navigate, Outlet, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const Auth = lazy(() => import("../pages/auth/Auth"));

export const AuthRoutes = () => {
  return (
    <Route path="/auth" element={<Outlet />}>
      <Route
        index
        element={
          <Suspense fallback={<Loading />}>
            <Auth login={true} />
          </Suspense>
        }
      />
      <Route
        path="register"
        element={
          <Suspense fallback={<Loading />}>
            <Auth />
          </Suspense>
        }
      />
    </Route>
  );
};
