import { Outlet, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const Profile = lazy(() => import("../pages/user/Profile"));

export const UserRoutes = (
  <Route path="/user" element={<Outlet />}>
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
