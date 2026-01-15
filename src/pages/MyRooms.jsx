import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import RoomCard from "../components/RoomCard";
import "../css/myRooms.css";

export default function MyRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRooms();
  }, []);

  const fetchMyRooms = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("rooms")
      .select("*")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

    setRooms(data || []);
    setLoading(false);
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm("Delete this room?")) return;

    await supabase.from("rooms").delete().eq("id", roomId);
    setRooms((prev) => prev.filter((r) => r.id !== roomId));
  };

  if (loading) {
    return <p className="my-rooms-state">Loading your rooms...</p>;
  }

  return (
    <div className="my-rooms-page">
      <h2 className="my-rooms-title">My Rooms</h2>

      {rooms.length === 0 && (
        <p className="my-rooms-state">You haven’t added any rooms yet.</p>
      )}

      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          showActions
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
