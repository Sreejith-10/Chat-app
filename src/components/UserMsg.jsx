import React from "react";

const UserMsg = ({val}) => {
	return (
		<div
			key={val[0]}
			className="lg:w-auto h-[60px] md:w-auto sm:w-auto hover:bg-slate-300 m-3 rounded-[10px] mb-2 flex items-center justify-start ">
			<div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-[50%] ml-5 ">
				<h1 className="text-center">S</h1>
			</div>
			<div className="ml-4">
				<h1 className="text-center font-bold">{val[1].userInfo.displayName}</h1>
			</div>
			<UserMsg val={val} />
		</div>
	);
};

export default UserMsg;
