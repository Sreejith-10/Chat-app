import React, {useContext} from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthContextProvider} from "./context/AuthContext";

const App = () => {
	const {currentUser} = useContext(AuthContextProvider);

	return (
		<div className="w-screen h-screen bg-slate-300 flex items-center justify-center">
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route
							index
							element={
								currentUser ? <Home /> : <Login />
							}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
