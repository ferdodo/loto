import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";

const div = document.getElementById("root");

if (!div) {
	throw new Error("#root not found !");
}

const root = ReactDOM.createRoot(div);

root.render(<App />);
