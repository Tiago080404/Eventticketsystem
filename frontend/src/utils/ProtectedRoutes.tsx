import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  loggedIn: boolean;
  children: ReactNode;
}

function ProtectedRoutes({ loggedIn, children }: ProtectedRoutesProps) {
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
export default ProtectedRoutes;