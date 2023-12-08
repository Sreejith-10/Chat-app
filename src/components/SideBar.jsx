import React, {useContext, useEffect, useState} from "react";
import {AiOutlineSearch} from "react-icons/ai";
import UserProfile from "./UserProfile";
import SearchBox from "./SearchBox";
import ChatBox from "./ChatBox";
import {AuthContextProvider} from "../context/AuthContext";
import {db} from "../firbase";
import {
	doc,
	getDoc,
	onSnapshot,
	serverTimestamp,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import {ChatContextProvider} from "../context/ChatContext";
import Chat from "./Chat";

const SideBar = ({setShowChat}) => {
	let [searchBox, setSearchBox] = useState(false);
	let [showProfile, setShowProfile] = useState(false);
	const [result, setResult] = useState(false);
	const [err, setErr] = useState(false);
	const [user, setUser] = useState(null);
	const [chat, setChat] = useState([]);
	const [noUser, setNoUser] = useState(false);
	const {currentUser} = useContext(AuthContextProvider);
	const {dispatch} = useContext(ChatContextProvider);

	useEffect(() => {
		const getChat = () => {
			const unSub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
				setChat(doc.data());
			});
			return () => {
				unSub();
			};
		};
		currentUser.uid && getChat();
	}, [currentUser.uid]);

	const handleClick = async () => {
		const combinedId =
			currentUser.uid > user.uid
				? currentUser.uid + user.uid
				: user.uid + currentUser.uid;
		try {
			const res = await getDoc(doc(db, "chats", combinedId));

			if (!res.exists()) {
				await setDoc(doc(db, "chats", combinedId), {messages: []});

				await updateDoc(doc(db, "userChat", currentUser.uid), {
					[combinedId + ".userInfo"]: {
						uid: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL,
					},
					[combinedId + ".date"]: serverTimestamp(),
				});
				await updateDoc(doc(db, "userChat", user.uid), {
					[combinedId + ".userInfo"]: {
						uid: currentUser.uid,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL,
					},
					[combinedId + ".date"]: serverTimestamp(),
				});
			}
		} catch (err) {
			console.log(err);
		}
		setResult(false);
		setErr(false);
	};

	const handleSelect = (u) => {
		dispatch({type: "CHANGE_USER", payload: u});
		setShowChat(true);
	};

	let users = Object.entries(chat)
		?.sort((a, b) => b[1].date - a[1].date)
		.map((val) => {
			return <Chat val={val} handleSelect={handleSelect} />;
		});

	return (
		<div className="h-full">
			{!searchBox ? (
				<div className="lg:w-auto lg:h-[70px] mb-3 flex items-center justify-between p-2 bg-green-500">
					<div className=" lg:w-[100px] lg:h-auto bg-white rounded-md  shadow-md">
						<h1 className="text-center p-1 font-bold text-green-500">
							Chat Zone
						</h1>
					</div>
					<div className="w-[30px] h-[50px] ml-[100px]">
						<AiOutlineSearch
							onClick={() => setSearchBox(true)}
							className="w-full h-full fill-white"
						/>
					</div>
					<div
						className="w-[55px] h-[55px] rounded-[50%] bg-green-100 cursor-pointer"
						onClick={() => setShowProfile(true)}>
						<img
							src={currentUser.photoURL}
							alt=""
							className="w-full h-full rounded-[50%]"
						/>
					</div>
				</div>
			) : (
				<SearchBox
					setSearchBox={setSearchBox}
					setNoUser={setNoUser}
					setResult={setResult}
					setUser={setUser}
				/>
			)}
			{showProfile && (
				<div className="lg:absolute z-[99] lg:left-[530px] sm:left-10">
					<UserProfile setShowProfile={setShowProfile} />
				</div>
			)}
			<div className="lg:w-auto lg:h-[480px] md:w-auto md:h-full sm:h-full overflow-auto relative ">
				{noUser && <span>why this is here</span>}
				{result && (
					<div
						onClick={handleClick}
						className="lg:w-auto h-[80px] md:w-auto sm:w-auto bg-slate-200 hover:bg-slate-300 m-3 rounded-[10px] mb-2 flex items-center justify-start ">
						<div className="w-[60px] h-[60px] sm:w-10 sm:h-10  rounded-[50%] ml-5 ">
							<img
								src={user.photoURL}
								alt=""
								className="w-full h-full rounded-[50%]"
							/>
						</div>
						<div className="ml-4">
							<h1 className="text-center font-bold">{user.displayName}</h1>
						</div>
					</div>
				)}

				{users && users}
			</div>
		</div>
	);
};

export default SideBar;
