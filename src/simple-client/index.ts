import { createElement as e } from "react";
import { SimpleClient } from './SimpleClient'

import { createRoot } from 'react-dom/client';

document.addEventListener("DOMContentLoaded", () => {
	const container = document.getElementById("main");
	const root = createRoot(container); 
	root.render(e(SimpleClient, null));
});
