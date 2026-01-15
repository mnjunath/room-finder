import { Link, useLocation } from "react-router-dom";
import { supabase } from "../supabase/client";
import { useEffect, useState } from "react";
import "../css/navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [role, setRole] = useState(null);

  // Hide navbar on auth pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  useEffect(() => {
    const loadRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setRole(data?.role);
    };

    loadRole();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          RoomFinder
        </Link>

        <Link to="/" className="nav-link">
          Find Rooms
        </Link>

        {role === "owner" && (
          <Link to="/add-room" className="nav-link">
            Add Room
          </Link>
        )}

        <Link to="/my-rooms" className="nav-link">
          My Rooms
        </Link>
      </div>

      <div className="nav-right">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
