import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
export default function AuthRequired({ children }) {
  const { credentials } = useContext(AuthContext);
  console.log(credentials);
  if (!credentials.username) {
    return <Navigate to="/signin" />;
    // "redirect to the login page and do some thing to back to this route that is related to this child"
  }
  return children;
}
