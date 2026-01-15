import { useState } from "react";
import { supabase } from "../supabase/client";
import "../css/addRoom.css";

export default function AddRoom() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [tenantPreference, setTenantPreference] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    setImages(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login again");
      setLoading(false);
      return;
    }

    const { data: room, error: roomError } = await supabase
      .from("rooms")
      .insert({
        title,
        location,
        price: Number(price),
        property_type: propertyType,
        tenant_preference: tenantPreference,
        contact_number: contactNumber,
        owner_id: user.id,
      })
      .select()
      .single();

    if (roomError) {
      alert(roomError.message);
      setLoading(false);
      return;
    }

    for (let file of images) {
      const filePath = `${room.id}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("room-images")
        .upload(filePath, file);

      if (uploadError) continue;

      const { data } = supabase.storage
        .from("room-images")
        .getPublicUrl(filePath);

      await supabase.from("room_images").insert({
        room_id: room.id,
        image_url: data.publicUrl,
      });
    }

    alert("Room added successfully");

    setTitle("");
    setLocation("");
    setPrice("");
    setPropertyType("");
    setTenantPreference("");
    setContactNumber("");
    setImages([]);
    setPreviews([]);
    setLoading(false);
  };

  return (
    <div className="add-room-page">
      <form className="add-room-card" onSubmit={handleSubmit}>
        <h2 className="add-room-title">Add Room</h2>

        <input
          className="add-room-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="add-room-input"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <input
          className="add-room-input"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          className="add-room-input"
          placeholder="Property Type (1 BHK, 2 BHK, etc.)"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          required
        />

        <input
          className="add-room-input"
          placeholder="Tenant Preference (User / Family / Bachelor)"
          value={tenantPreference}
          onChange={(e) => setTenantPreference(e.target.value)}
          required
        />

        <input
          className="add-room-input"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />

        <input
          className="add-room-file"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImages}
        />

        {previews.length > 0 && (
          <div className="preview-grid">
            {previews.map((src, index) => (
              <img key={index} src={src} alt="preview" />
            ))}
          </div>
        )}

        <button className="add-room-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Room"}
        </button>
      </form>
    </div>
  );
}
