import React, {useContext, useEffect, useRef} from "react";
import {AuthContextProvider} from "../context/AuthContext";
import {ChatContextProvider} from "../context/ChatContext";

const Message = ({msg}) => {
	const {currentUser} = useContext(AuthContextProvider);
	const {data} = useContext(ChatContextProvider);
	const ref = useRef();
	useEffect(() => {
		ref.current?.scrollIntoView({behavior: "smooth"});
	}, [msg]);
	return (
		<>
			{msg && (
				<div
					className={
						msg.senderId === currentUser.uid
							? "w-full h-auto flex justify-end"
							: "flex items-start"
					}>
					<div
						ref={ref}
						className={
							msg.senderId === currentUser.uid
								? "w-[300px] h-auto flex flex-row-reverse justify-evenly lg:ml-3 lg:mt-4 lg:mb-4 sm:m-2"
								: "w-[300px] h-auto flex flex-row justify-evenly lg:ml-3 lg:mt-4 lg:mb-4 sm:m-2"
						}>
						<div className="w-[50px] h-[50px] rounded-full bg-lime-200">
							<img
								src={
									msg.senderId === currentUser.uid
										? currentUser.photoURL
										: data.user.photoURL
								}
								alt=""
								className="w-full h-full rounded-[50%]"
							/>
						</div>
						<div
							className={
								msg.senderId === currentUser.uid
									? "h-full w-[200px] bg-green-500 rounded-tr-none rounded-md shadow-md lg:p-2 sm:p-1"
									: "h-full w-[200px] bg-slate-300 rounded-tl-none rounded-md shadow-md lg:p-2 sm:p-1"
							}>
							<div>
								<h1 className="text-slate-100 font-bold">
									{msg.senderId === currentUser.uid
										? "You"
										: data.user.displayName}
								</h1>
							</div>
							<div>
								<h1 className="font-bold ">{msg.text}</h1>
							</div>
							<div>
								<h1 className="text-right text-[15px] text-slate-500 font-bold">just now</h1>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Message;
