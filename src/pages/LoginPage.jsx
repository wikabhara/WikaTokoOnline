import { useContext, useState } from "react";
import { auth, googleProvider } from "../configs/Firebase";
import { Link, useNavigate } from "react-router";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const userLoggedIn = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userLoggedIn);

      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        icon: "error",
        title: errorCode,
        text: errorMessage,
      });
    }
  }

  // handle google login
  async function handleGoogleLogin() {
    try {
      const oauthLogin = await signInWithPopup(auth, googleProvider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(oauthLogin);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = oauthLogin.user;
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        icon: "error",
        title: errorCode,
        text: errorMessage,
      });
    }
  }
  // handle google login

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="email@example.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-control mt-6 flex justify-center items-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm">
            Belum punya akun?{" "}
            <Link to="/auth/register" className="link link-primary">
              Daftar di sini!
            </Link>
          </p>
          <div className="form-control mt-4 flex justify-center items-center">
            <button
              type="button"
              className="btn btn-neutral w-full"
              onClick={handleGoogleLogin}
            >
              <FaGoogle className="mr-2" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
