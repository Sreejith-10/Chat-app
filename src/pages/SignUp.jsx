import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {auth, db} from "../firbase";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {storage} from "../firbase";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

const SignUp = () => {
	const [userExist, setUserExist] = useState(false);
	const [weakPass, setWeakPass] = useState(false);
	const navigate = useNavigate();
	const handleFormSubmission = async (event) => {
		event.preventDefault();
		const displayName = event.target[0].value;
		const email = event.target[1].value;
		const password = event.target[2].value;
		const file = event.target[3].files[0];

		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);

			const storageRef = ref(storage, displayName);

			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				(error) => {
					console.log(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						await updateProfile(res.user, {
							displayName,
							photoURL: downloadURL,
						});
						await setDoc(doc(db, "user", res.user.uid), {
							uid: res.user.uid,
							displayName,
							email,
							photoURL: downloadURL,
						});
						await setDoc(doc(db, "userChat", res.user.uid), {});
						navigate("/");
					});
				}
			);
		} catch (err) {
			const errorCode = err.code;
			if (errorCode === "auth/email-already-in-use") {
				setUserExist(true);
			} else if (errorCode === "auth/weak-password") {
				setWeakPass(true);
			} else {
				console.log(err);
			}
		}
	};

	return (
		<div>
			<div className="w-[400px] h-[500px] sm:w-[300px] sm:h-[500px] bg-white rounded-md shadow-md flex items-center justify-center">
				<form onSubmit={handleFormSubmission}>
					<h1 className="mb-9 font-bold text-green-600 text-[25px]">
						User LogIn
					</h1>

					<div className="flex flex-col mb-5">
						<label htmlFor="name" className="mb-3 font-bold text-slate-700">
							Username
						</label>
						<input
							type="text"
							required
							placeholder="Username . . . "
							className="border border-black rounded-md focus:outline-none p-1 font-bold text-slate-800"
						/>
					</div>
					{userExist ? (
						<div className="flex flex-col mb-5">
							<label htmlFor="name" className="mb-3 font-bold text-red-500">
								Email already In-Use
							</label>
							<input
								type="email"
								required
								placeholder="Email . . . "
								className="border border-red-500 placeholder:text-red-500 rounded-md focus:outline-none p-1 font-bold text-slate-800"
							/>
						</div>
					) : (
						<div className="flex flex-col mb-5">
							<label htmlFor="name" className="mb-3 font-bold text-slate-700">
								Email
							</label>
							<input
							required
								type="email"
								placeholder="Email . . . "
								className="border border-black rounded-md focus:outline-none p-1 font-bold text-slate-800"
							/>
						</div>
					)}
					{weakPass ? (
						<div className="flex flex-col mb-5">
							<label htmlFor="name" className="mb-3 font-bold text-red-500">
								Password is Weak
							</label>
							<input
								required
								type="password"
								placeholder="Password . . . "
								className="border border-red-500 placeholder:text-red-500 rounded-md focus:outline-none p-1 font-bold text-slate-800"
							/>
						</div>
					) : (
						<div className="flex flex-col mb-5">
							<label htmlFor="name" className="mb-3 font-bold text-slate-700">
								Password
							</label>
							<input
								required
								type="password"
								placeholder="Password . . . "
								className="border border-black rounded-md focus:outline-none p-1 font-bold text-slate-800"
							/>
						</div>
					)}

					<div className="flex flex-col mb-5 mt-5 w-[250px] h-10">
						<input
							type="file"
							required
							placeholder="Password . . . "
							className="w-auto h-[500px] border border-black rounded-md focus:outline-none p-1 font-bold text-slate-800"
						/>
					</div>
					<div className="flex items-center justify-between mt-8">
						<div>
							<button className="bg-green-500 text-white p-1 font-bold rounded-md shadow-md hover:bg-white hover:text-green-500 hover:border hover:border-green-500">
								Sign Up
							</button>
						</div>
						<div className="cursor-pointer">
							<Link to="/login" className="font-bold text-green-500">
								Login
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
