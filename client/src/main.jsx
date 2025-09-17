import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Layout from './layout.jsx';
import Login from './components/login/login.jsx';
import Register from './components/register/Register.jsx';
import MapTest from './components/map/MapTest.jsx';
import Temp from './components/navbar/Temp.jsx';
import Hospital from './components/hospital/Hospital.jsx';
import Home from './pages/Home.jsx';
import Donor from './pages/Donor.jsx';
import Application from './pages/Application.jsx';
import Transplant from './pages/Transplant.jsx';
import Profile from './pages/Profile.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoCall from './components/daily/VideoCall.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/mapTest",
    element: <MapTest />,
  },
  {
    path: "/temp",
    element: <Temp />
  },
  {
    path: "/hospitals",
    element: <Hospital />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/donorcard",
    element: <Donor />
  },
  {
    path: "/application",
    element: <Application />
  },
  {
    path: "/transplant",
    element: <Transplant />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/chat/:id",
    element: <VideoCall />
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
