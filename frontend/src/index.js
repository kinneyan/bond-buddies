import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage'
import AssessmentPage from './pages/AssessmentPage'
import FriendsPage from './pages/FriendsPage'
import SettingsPage from './pages/SettingsPage'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
  {
    path: "/assessments",
    element: <AssessmentPage />,
  },
  {
    path: "/friends",
    element: <FriendsPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
