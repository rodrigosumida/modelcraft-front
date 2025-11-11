import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./routes";
import GlobalStyles from "./GlobalStyles";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <AppRoutes />
      <GlobalStyles />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
