import { Outlet, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const ViewForm = lazy(() => import("../pages/form/ViewForm"));
const ViewResponse = lazy(() => import("../pages/form/ViewResponse"));

export const FormRoutes = (
  <Route path="/form" element={<Outlet />}>
    <Route
      path=":id"
      element={
        <Suspense fallback={<Loading />}>
          <ViewForm />
        </Suspense>
      }
    />
    <Route
      path="r/:id"
      element={
        <Suspense fallback={<Loading />}>
          <ViewResponse />
        </Suspense>
      }
    />
  </Route>
);
