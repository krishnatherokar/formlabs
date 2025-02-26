import { Navigate, Outlet, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
import ViewFormResponses from "../pages/form/ViewFormResponses";
const CreateForm = lazy(() => import("../pages/form/CreateForm"));
const ViewForm = lazy(() => import("../pages/form/ViewForm"));
const ViewResponse = lazy(() => import("../pages/form/ViewResponse"));

export const FormRoutes = (user) => {
  return (
    <Route path="/form" element={<Outlet />}>
      <Route
        index
        element={
          user ? (
            <Suspense fallback={<Loading />}>
              <CreateForm />
            </Suspense>
          ) : (
            <Navigate to={"/auth"} />
          )
        }
      />
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
      <Route
        path="fr/:id"
        element={
          user ? (
            <Suspense fallback={<Loading />}>
              <ViewFormResponses />
            </Suspense>
          ) : (
            <Navigate to={"/auth"} />
          )
        }
      />
    </Route>
  );
};
