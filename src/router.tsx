import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainPage from "./pages/MainPage";
import Loader from "./components/Loader";
import Error404 from "./pages/Error404";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import About from "./pages/About";
import ProfilePage from "./pages/Profile";
const SignIn = lazy(() => import("./pages/SignIn"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const ImagesOfAlbum = lazy(() => import("./pages/Images/ImagesOfAlbum"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signin" />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/signin",
        element: (
          <Suspense fallback={<Loader message="Loading SignIn..." />}>
            <SignIn />
          </Suspense>
        ),
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainPage />,
        children: [
          {
            path: "/dashboard",
            element: (
              <Suspense fallback={<Loader message="Loading Dashboard..." />}>
                <Dashboard />
              </Suspense>
            ),
          },
          { path: "/about", element: <About /> },
          { path: "/profile", element: <ProfilePage /> },
          {
            path: "/dashboard/album/:albumId",
            element: (
              <Suspense fallback={<Loader message="Loading Album images..." />}>
                <ImagesOfAlbum />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Error404 />,
  },
]);

export default router;
