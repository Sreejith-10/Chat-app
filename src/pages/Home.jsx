import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import SideBar from "../components/SideBar";

const Home = () => {
	const [showChat, setShowChat] = useState(false)
	return (
		<div className=" flex bg-white lg:w-[1200px] lg:h-[700px] md:w-full md:h-full sm:w-[100%] sm:h-[100%] lg:shadow-md sm:shadow-none">
			<div className={!showChat ? "flex-[35%]" : "flex-[35%] sm:hidden"}>
				<SideBar setShowChat={setShowChat} />
			</div>
			<div
				className={
					showChat ? "h-auto w-auto flex-[65%]" : "h-full flex-[65%] sm:hidden"
				}>
				<ChatBox setShowChat={setShowChat} />
			</div>
		</div>
	);
};

export default Home;
