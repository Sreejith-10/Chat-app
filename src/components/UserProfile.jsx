import React, {useContext} from "react";
import {AuthContextProvider} from "../context/AuthContext";
import {auth} from "../firbase";
import {signOut} from "firebase/auth";
import {AiOutlineClose} from "react-icons/ai";

const UserProfile = ({setShowProfile}) => {
	const {currentUser} = useContext(AuthContextProvider);
	return (
		<div>
			<div className="w-[300px] h-[450px] bg-slate-300 rounded-md shadow-md">
				<div className="w-8 h-8 ">
					<AiOutlineClose
						className="w-full h-full"
						onClick={() => setShowProfile(false)}
					/>
				</div>
				<div className="flex flex-col items-center justify-center">
					<div className="w-[200px] h-[200px] bg-white rounded-[50%] flex items-center justify-center border-[1px] border-black mt-6">
						<img
							src={currentUser.photoURL}
							alt=""
							className="w-full h-full rounded-[50%]"
						/>
					</div>
					<div className="mt-5">
						<h1 className="font-bold text-[30px]">{currentUser.displayName}</h1>
					</div>
					<div className=" mt-[70px]">
						<button
							className="bg-red-500 hover:bg-white border-red-500 p-2 font-bold rounded-md shadow-md text-white"
							onClick={() => signOut(auth)}>
							Log Out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
