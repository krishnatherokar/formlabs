import { Outlet, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const ViewForm = lazy(() => import("../pages/form/ViewForm"));

export const FormRoutes = (
  <Route path="/form/:id" element={<Outlet />}>
    <Route
      index
      element={
        <Suspense fallback={<Loading />}>
          <ViewForm />
        </Suspense>
      }
    />
  </Route>
);
