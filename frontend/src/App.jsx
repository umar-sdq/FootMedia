import './App.css'
import RootLayout from './Components/RootLayout/Root.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Feed from './Components/Feed/Feed.jsx';
import PostForm from './Components/PostForm/PostForm.jsx';
import Profile from './Components/Profile/Profile.jsx';
import Notifications from './Components/Notifications/Notifications.jsx';
import ErrorPage from './Components/Error/ErrorPage.jsx';
import LoginForm from './Components/LoginForm/LoginForm.jsx';
import SignUpForm from './Components/SignUpForm/SignUpForm.jsx';
import { AuthProvider } from './Components/AuthContext/AuthContext.jsx';
function App() {
  const router = createBrowserRouter([{
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Feed /> },
      { path: "/add", element: <PostForm /> },
      { path: "/edit", element: <PostForm /> },
      { path: "/profile", element: <Profile /> },
      { path: "/notifications", element: <Notifications /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/signup", element: <SignUpForm /> }
    ]
  }

  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}





export default App
