import { useEffect, useState, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../configs/Firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadPage, setLoadPage] = useState(true); //load page trick//
  const [userRole, setUserRole] = useState(null);
  const value = { user, setUser, setUserRole, userRole };

  useEffect(() => {
    setLoadPage(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserRole(userDocSnap.data().role);
        } else {
          setUserRole(null);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoadPage(false); //load page trick//
    });

    return () => {
      unsubscribe();
    };
  }, [user]);
  if (isLoadPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading....
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
