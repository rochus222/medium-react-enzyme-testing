import React from "react";
import { createRoot } from "react-dom/client";

import Component from "./Component/Component";

const root = createRoot(document.getElementById("root")); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>
);
