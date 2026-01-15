import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import RoomCard from "../components/RoomCard";
import "../css/rooms.css";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [tenantPreference, setTenantPreference] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [location, minPrice, maxPrice, propertyType, tenantPreference]);

  const fetchRooms = async () => {
    setLoading(true);

    let query = supabase
      .from("rooms")
      .select("*")
      .order("created_at", { ascending: false });

    if (location.trim()) {
      query = query.ilike("location", `%${location}%`);
    }

    if (minPrice) query = query.gte("price", Number(minPrice));
    if (maxPrice) query = query.lte("price", Number(maxPrice));
    if (propertyType) query = query.eq("property_type", propertyType);
    if (tenantPreference) {
      query = query.eq("tenant_preference", tenantPreference);
    }

    const { data, error } = await query;

    if (!error) {
      setRooms(data || []);
    }

    setLoading(false);
  };

  return (
    <div className="rooms-page">
      <h2 className="rooms-title">Find Rooms</h2>

      <div className="filters">
        <input
          className="filter-input"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="filter-input"
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          className="filter-input"
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <input
          className="filter-input"
          placeholder="Property Type"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        />

        <input
          className="filter-input"
          placeholder="Tenant Preference"
          value={tenantPreference}
          onChange={(e) => setTenantPreference(e.target.value)}
        />
      </div>

      {loading && (
        <p className="rooms-state">Loading rooms...</p>
      )}

      {!loading && rooms.length === 0 && (
        <p className="rooms-state">
          No rooms match the selected filters.
        </p>
      )}

      {!loading &&
        rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
    </div>
  );
}
