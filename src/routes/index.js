import React from "react";
import { Route, Routes } from "react-router-dom";

import Historico from "../pages/Historico";
import Index from "../pages/Index";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/historico" element={<Historico />} />
    </Routes>
  );
}
