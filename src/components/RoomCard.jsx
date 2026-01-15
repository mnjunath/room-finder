import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import "../css/roomCard.css";

export default function RoomCard({ room, onDelete, showActions }) {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase
        .from("room_images")
        .select("image_url")
        .eq("room_id", room.id);

      setImages(data?.map((img) => img.image_url) || []);
    };

    fetchImages();
  }, [room.id]);

  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="room-card">
      {/* LEFT */}
      <div className="room-details">
        <h3 className="room-title">{room.title}</h3>

        <p><strong>Location:</strong> {room.location}</p>
        <p><strong>Price:</strong> ₹{room.price}</p>
        <p><strong>Property Type:</strong> {room.property_type}</p>
        <p><strong>Tenant Preference:</strong> {room.tenant_preference}</p>
        <p><strong>Contact:</strong> {room.contact_number}</p>

        {showActions && (
          <div className="room-actions">
            <button
              className="edit-btn"
              onClick={() => navigate(`/edit-room/${room.id}`)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(room.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* RIGHT */}
      {images.length > 0 && (
        <div className="room-slider">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((src, i) => (
              <div className="slide" key={i}>
                <img src={src} alt="room" />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button className="slider-btn left" onClick={prev}>‹</button>
              <button className="slider-btn right" onClick={next}>›</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
