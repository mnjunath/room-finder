import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rooms from "./pages/Rooms";
import AddRoom from "./pages/AddRoom";
import MyRooms from "./pages/MyRooms";
import EditRoom from "./pages/EditRoom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Rooms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/my-rooms" element={<MyRooms />} />
        <Route path="/edit-room/:id" element={<EditRoom />} />
      </Routes>
    </>
  );
}
