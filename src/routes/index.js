import { lazy } from "react";
import { Route } from "react-router-dom";

const routes = [
  { path: "/", element: lazy(() => import("pages/Home")) },
  {
    path: "admin",
    element: lazy(() => import("pages/Admin")),
    nested: [
      { index: true, element: lazy(() => import("pages/Admin/Users")) },
      { path: "users", element: lazy(() => import("pages/Admin/Users")) },
      { path: "jobs", element: lazy(() => import("pages/Admin/Jobs")) },
    ],
  },
  { path: "admin/signin", element: lazy(() => import("pages/Admin/SignIn")) },
];

const renderRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.nested.map((nestedRoute) => {
            if (nestedRoute.index === true) {
              return <Route index key={nestedRoute.path} element={<nestedRoute.element />} />;
            } else {
              return <Route key={nestedRoute.path} path={nestedRoute.path} element={<nestedRoute.element />} />;
            }
          })}
        </Route>
      );
    } else {
      return <Route key={route.path} path={route.path} element={<route.element />} />;
    }
  });
};

export default renderRoutes;
