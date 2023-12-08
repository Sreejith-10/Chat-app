import React from "react";

const Chat = ({val, handleSelect}) => {
	return (
		<>
			<div
				onClick={() => handleSelect(val[1].userInfo)}
				key={val[0]}
				className="lg:w-auto h-[80px] md:w-auto sm:w-auto hover:bg-slate-300 m-3 rounded-[10px] mb-2 flex items-center justify-start ">
				<div className="w-[60px] h-[60px] sm:w-10 sm:h-10 bg-red-200 rounded-[50%] ml-5 ">
					<img
						src={val[1].userInfo.photoURL}
						alt=""
						className="w-full h-full rounded-[50%]"
					/>
				</div>
				<div className="ml-4">
					<h1 className=" font-bold ">
						{val[1].userInfo.displayName}
					</h1>
					<h1 className=" font-bold text-green-600">{val[1].lastMessage?.text}</h1>
				</div>
			</div>
		</>
	);
};

export default Chat;
