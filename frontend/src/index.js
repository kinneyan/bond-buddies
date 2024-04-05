import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
<<<<<<< HEAD
=======
import UserPage from './pages/UserPage'
import AssessmentPage from './pages/AssessmentPage'
import PersonalityPage from './pages/PersonalityPage'
import DISCPage from './pages/DISCPage'
import FriendshipPage from './pages/FriendshipPage'
import FriendsPage from './pages/FriendsPage'
import SettingsPage from './pages/SettingsPage'
>>>>>>> dev

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
<<<<<<< HEAD
=======
  {
    path: "/user",
    element: <UserPage />,
  },
  {
    path: "/assessments",
    element: <AssessmentPage />,
  },
  {
    path: "/personalitytype",
    element: <PersonalityPage />,
  },
  {
    path: "/disc",
    element: <DISCPage />,
  },
  {
    path: "/friendshiplanguage",
    element: <FriendshipPage />,
  },
  {
    path: "/friends",
    element: <FriendsPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
>>>>>>> dev
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
