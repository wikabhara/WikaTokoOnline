import { useEffect, useState, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/Firebase";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadPage, setLoadPage] = useState(true); //load page trick//
  const value = { user, setUser };

  useEffect(() => {
    setLoadPage(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoadPage(false); //load page trick//
    });

    return () => {
      unsubscribe();
    };
  }, []);
  if (isLoadPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading....
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
