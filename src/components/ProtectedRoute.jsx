import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setAuthenticated(!!user);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!authenticated) return <Navigate to="/login" replace />;

  return children;
}
