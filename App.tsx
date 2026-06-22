import React from "react";
import AppRoutes from "./src/routes/app.routes";
import { ThemeProvider } from "./src/styles/contextoTema";

export default function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}