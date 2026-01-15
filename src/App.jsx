import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rooms from "./pages/Rooms";
import AddRoom from "./pages/AddRoom";
import MyRooms from "./pages/MyRooms";
import EditRoom from "./pages/EditRoom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedOwnerRoute from "./components/ProtectedOwnerRoute";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Rooms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/my-rooms"
          element={
            <ProtectedRoute>
              <MyRooms />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-room"
          element={
            <ProtectedOwnerRoute>
              <AddRoom />
            </ProtectedOwnerRoute>
          }
        />

        <Route
          path="/edit-room/:id"
          element={
            <ProtectedOwnerRoute>
              <EditRoom />
            </ProtectedOwnerRoute>
          }
        />
      </Routes>
    </>
  );
}
