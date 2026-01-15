import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { Navigate } from "react-router-dom";

export default function ProtectedOwnerRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkOwner = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setAllowed(data?.role === "owner");
      setLoading(false);
    };

    checkOwner();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return children;
}
