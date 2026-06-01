import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BoardList from "./pages/BoardList";
import BoardDetail from "./pages/BoardDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { isAuthenticated } from "./services/auth";

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}
function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/board"
          element={
            <PrivateRoute>
              <BoardList />
            </PrivateRoute>
          }
        />
        <Route
          path="/board/:id"
          element={
            <PrivateRoute>
              <BoardDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
