import React, { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import renderRoutes from "./routes";

const App = () => {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>{renderRoutes()}</Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
