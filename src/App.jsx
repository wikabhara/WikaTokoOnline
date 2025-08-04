import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ContactUsPage from "./pages/ContactUsPage";
import AuthContextProvider from "./contexts/AuthContext";
import MyProducts from "./pages/MyProducts";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import AboutUsPage from "./pages/AboutUsPage";
import ProfilePage from "./pages/ProfilePage";
import FavouritePage from "./pages/FavouritePage";
import ProductDetailPage from "./pages/ProductDetailPage";

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
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "about",
        element: <AboutUsPage />,
      },
      {
        path: "contactus",
        element: <ContactUsPage />,
      },
      {
        path: "myproducts",
        element: <MyProducts />,
      },
      {
        path: "myproducts/add",
        element: <AddProductPage />,
      },
      {
        path: "favourite",
        element: <FavouritePage />,
      },
      {
        path: "myproducts/edit/:id",
        element: <EditProductPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetailPage />,
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
