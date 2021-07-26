import { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import { firebaseClient } from "./firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const AuthContext = createContext({
  __session: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  firebaseClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "__session", "", {});
        return;
      }
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "__session", token, {});
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
