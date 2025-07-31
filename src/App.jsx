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

import MyProducts from "./pages/MyProducts";
import AddProductPage from "./pages/AddProductPage";
// import ProfilePage from "./pages/ProfilePage";
// import FavouritePage from "./pages/FavouritePage";

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
      {
        path: "myproducts",
        element: <MyProducts />,
      },
      {
        path: "myproducts/products/add",
        element: <AddProductPage />,
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
