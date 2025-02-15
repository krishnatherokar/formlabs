import { Navigate, Outlet, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const Profile = lazy(() => import("../pages/user/Profile"));

export const UserRoutes = (user) => {
  return (
    <Route path="/user" element={user ? <Outlet /> : <Navigate to={"/auth"} />}>
      <Route
        index
        element={
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        }
      />
    </Route>
  );
};
