import './bootstrap';
import React from 'react';
import { App } from "./App/App";
import './styles/app.css';
import {createRoot} from "react-dom/client";

const root = createRoot(document.getElementById('app'));
root.render(<App />);