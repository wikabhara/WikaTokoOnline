import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
// import ContactUsPage from "./pages/ContactUsPage";
// import AboutPage from "./pages/AboutPage";
import AuthContextProvider from "./contexts/AuthContext";
// import ProfilePage from "./pages/ProfilePage";
// import FavouritePage from "./pages/FavouritePage";
// import MyProductPage from "./pages/MyProductPage";
// import EditProductPage from "./pages/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AdminLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
