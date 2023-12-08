import React, {useState} from "react";
import {AiOutlineArrowLeft, AiOutlineSearch} from "react-icons/ai";
import {db} from "../firbase";
import {collection, where, query, getDocs} from "firebase/firestore";

const SearchBox = ({setSearchBox, setNoUser, setResult, setUser}) => {
	const [userName, setUserName] = useState("");

	const searchUser = async () => {
		const q = query(
			collection(db, "user"),
			where("displayName", "==", userName)
		);
		try {
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				setUser(doc.data());
				setResult(true);
			});
		} catch (err) {
			setNoUser(true);
			console.log("no user");
		}
	};
	const keyDownHandler = (event) => {
		event.keyCode === 13 && searchUser()
	};
	const closeFunction = () =>{
		setSearchBox(false)
		setResult(false)
	}
	return (
		<div>
			<div className="w-auto h-[70px] bg-green-500 flex items-center justify-center">
				<div className="lg:w-[400px] lg:h-[40px] md:w-[250px] sm:w-[330px] sm:h-[40px] flex items-center justify-around bg-slate-300 rounded-[20px]">
					<AiOutlineArrowLeft
						onClick={closeFunction}
						className="ml-1 md:m-0"
					/>
					<input
						type="text"
						onKeyDown={keyDownHandler}
						onChange={(e) => setUserName(e.target.value)}
						className="lg:w-[300px] lg:h-[40px] md:w-[200px] md:h-[30px]  sm:w-[275px] sm:h-[70%] bg-inherit p-3 font-bold focus:outline-none"
						placeholder="Search . . ."
					/>
					<AiOutlineSearch className="w-5 h-5 lg:hidden sm:block sm:mr-1" onClick={searchUser} />
				</div>
			</div>
		</div>
	);
};

export default SearchBox;
