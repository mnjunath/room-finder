import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate, useParams } from "react-router-dom";
import "../css/addRoom.css";

export default function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [tenantPreference, setTenantPreference] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoom = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", id)
        .single();

      if (!data) return;

      setTitle(data.title);
      setLocation(data.location);
      setPrice(data.price);
      setPropertyType(data.property_type);
      setTenantPreference(data.tenant_preference);
      setContactNumber(data.contact_number);

      setLoading(false);
    };

    loadRoom();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    await supabase
      .from("rooms")
      .update({
        title,
        location,
        price: Number(price),
        property_type: propertyType,
        tenant_preference: tenantPreference,
        contact_number: contactNumber,
      })
      .eq("id", id);

    alert("Room updated successfully");
    navigate("/my-rooms");
  };

  if (loading) return <p className="my-rooms-state">Loading...</p>;

  return (
    <div className="add-room-page">
      <form className="add-room-card" onSubmit={handleUpdate}>
        <h2 className="add-room-title">Edit Room</h2>

        <input className="add-room-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input className="add-room-input" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input className="add-room-input" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input className="add-room-input" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} required />
        <input className="add-room-input" value={tenantPreference} onChange={(e) => setTenantPreference(e.target.value)} required />
        <input className="add-room-input" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />

        <button className="add-room-btn">Update Room</button>
      </form>
    </div>
  );
}
