import reactLogo from './assets/react.svg'
import './App.css'
import RootLayout from './Components/RootLayout/Root.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Feed from './Components/Feed/Feed.jsx';
import PostForm from './Components/PostForm/PostForm.jsx';
import Profile from './Components/Profile/Profile.jsx';
import Notifications from './Components/Notifications/Notifications.jsx';
import ErrorPage from './Components/Error/ErrorPage.jsx';
function App() {
  const router = createBrowserRouter([{
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {path: "/", element: <Feed/>},
      {path: "/add", element: <PostForm/>},
      {path: "/edit", element: <PostForm/>},
      {path: "/profile", element: <Profile/>},
      {path: "/notifications", element: <Notifications/>},
      {path: "/login", element: <Feed/>},
      {path: "/", element: <Feed/>}
    ]
  }
    
  ]);
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}


   
 

export default App
