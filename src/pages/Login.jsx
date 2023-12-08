import React, { useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import {auth} from "../firbase";
import {signInWithEmailAndPassword} from "firebase/auth";

const Login = () => {
	const [err, setErr] = useState(false);
	const navigate = useNavigate();
	const handleFormSubmission = async (event) => {
		event.preventDefault();
		const email = event.target[0].value;
		const password = event.target[1].value;

		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/");
		} catch (err) {
			setErr(true)
			console.log(err);
		}
	};
	return (
		<div className="w-full max-w-xs">
			<div className="w-[400px] h-[400px] sm:w-[300px] sm:h-[400px] sm:mx-auto bg-white rounded-md shadow-md flex items-center justify-center">
				<form onSubmit={handleFormSubmission}>
					<h1 className="mb-6 font-bold text-green-600 text-[25px]">
						User LogIn
					</h1>
					{err && (
						<span className="font-bold text-red-600">
							Invalid Email and Password !
						</span>
					)}
					<div className="flex flex-col mb-5 mt-3">
						<label htmlFor="name" className="mb-3 font-bold text-slate-700">
							Email
						</label>
						<input
							type="email"
							placeholder="Email . . . "
							className={
								err
									? "border border-red-600 rounded-md focus:outline-red-500 p-1 font-bold text-slate-800"
									: "border border-black rounded-md focus:outline-none p-1 font-bold text-slate-800"
							}
						/>
					</div>
					<div className="flex flex-col mb-5">
						<label htmlFor="name" className="mb-3 font-bold text-slate-700">
							Password
						</label>
						<input
							required
							type="password"
							placeholder="Password . . . "
							className={
								err
									? "border border-red-600 rounded-md focus:outline-red-600 p-1 font-bold text-slate-800"
									: "border border-black rounded-md focus:outline-none p-1 font-bold text-slate-800"
							}
						/>
					</div>
					<div className="flex items-center justify-between mt-8">
						<div>
							<button className="bg-green-500 p-1 font-bold text-white rounded-md shadow-md hover:bg-white hover:text-green-500 hover:border hover:border-green-500">
								Log In
							</button>
						</div>
						<div className="cursor-pointer">
							<Link to="/signup" className="font-bold text-green-500">
								Sign Up
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
