import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Notfound from "./pages/404";

import "./app.css";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="*" element={<Notfound />} />
			</Routes>
		</div>
	);
}

export default App;
