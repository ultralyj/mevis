import React from "react";
import { createRoot } from "react-dom/client";
import { Button, DatePicker, Space, version } from "antd";
import 'antd/dist/reset.css';
import "./index.css";
import Layout from "./layout"

const root = createRoot(document.getElementById("root"));
root.render(<Layout />);