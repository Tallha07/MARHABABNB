import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet, } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import AllSpots from './components/AllSpots';
import UpdateASpot from './components/UpdateASpot/UpdateASpot.jsx';
import UserSpot from './components/UserSpots.jsx';
import CreateSpotForm from './components/CreateSpotForm/CreateSpotForm.jsx';
import LoginFormModal from './components/LoginFormModal';
import SignupFormModal from './components/SignupFormModal/SignupFormModal';
import SpotDetail from './components/SpotDetail/SpotDetail';



function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AllSpots />
      },
      {
        path: "login",
        element: <LoginFormModal />
      },
      {
        path: "spots/new",
        element: <CreateSpotForm />,
      },
      {
        path: "spots/current",
        element: <UserSpot />,
      },
      {
        path: "spots/:spotId/update",
        element: <UpdateASpot />,
      },
      {
        path: "signup",
        element: <SignupFormModal />
      },
      {
        path: "/spots/:id",
        element: <SpotDetail />
      },
      
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;