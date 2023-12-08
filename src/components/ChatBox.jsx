import {
	AiOutlinePhone,
	AiOutlineVideoCamera,
	AiOutlineArrowLeft
} from "react-icons/ai";
import { useContext } from "react";
import { ChatContextProvider } from "../context/ChatContext";
import Messages from "./Messages";
import KeyBoard from "./KeyBoard";

const ChatBox = ({setShowChat}) => {
	const {data} = useContext(ChatContextProvider)
	
	return (
		<div className="w-full h-full sm:w-screen lg:flex lg:flex-col lg:items-center lg:justify-between">
			<div className="w-full lg:h-[70px] sm:h-[80px] bg-slate-200 flex items-center justify-between">
				<div className="ml-5 flex justify-between items-center">
					<div className="w-[20px] h-[20px] lg:hidden sm:block sm:mr-3">
						<AiOutlineArrowLeft onClick={()=>setShowChat(false)} className="w-full h-full"/>
					</div>
					<div className="w-[50px] h-[50px] rounded-[50%] bg-slate-500 mr-3">
						<img src={data.user.photoURL} alt="" className="w-full h-full rounded-[50%]"/>
					</div>
					<div>
						<h2 className="font-bold">{data.user.displayName}</h2>
					</div>
				</div>
				<div className="flex items-center justify-evenly mr-7 w-[80px] h-[40px] border border-slate-600 rounded-md shadow-md">
					<div className="w-[30px] h-auto cursor-pointer">
						<AiOutlineVideoCamera className="w-[100%] h-[100%] " />
					</div>
					<div className="w-[30px] h-auto cursor-pointer">
						<AiOutlinePhone className="w-[100%] h-[100%]" />
					</div>
				</div>
			</div>
			{/* chatbox */}
			<div className="w-full h-[570px] sm:h-[665px] lg:overflow-auto sm:overflow-auto">
					<Messages />
			</div>
			{/* keyboard */}
			<KeyBoard />
		</div>
	);
};

export default ChatBox;
