import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import ListPage from "./pages/ListPage";

const App = () => {
  return (
    <Routes>
      <Route path="/list" element={<ListPage />} />
      <Route path="/movie/:movieId" element={<DetailsPage />} />
      <Route path="/" element={<Navigate to="/list" />} />
    </Routes>
  );
};

export default App;
