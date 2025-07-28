import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import LogoWikaToko from "../assets/img/wikaToko.png";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminLayout() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // protecting your page
  useEffect(() => {
    if (user) {
      navigate("/");
    } else if (!user) {
      navigate("/auth/login");
    }
  }, []);
  // protecting your page

  return (
    <>
      {/* navbar */}
      <div className="navbar bg-base-100 shadow-sm">
        <img src={LogoWikaToko} alt="WikaToko Logo" className="h-16" />
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">WikaToko</a>
        </div>
      </div>
      {/* navbar */}
      <Outlet />
    </>
  );
}
