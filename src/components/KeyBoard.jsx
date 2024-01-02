import React, {useContext, useRef, useState} from "react";
import {
	AiOutlinePaperClip,
	AiOutlineSmile,
	AiOutlineSend,
} from "react-icons/ai";
import {AuthContextProvider} from "../context/AuthContext";
import {ChatContextProvider} from "../context/ChatContext";
import {
	Timestamp,
	arrayUnion,
	doc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import {v4 as uuid} from "uuid";
import {db, storage} from "../firbase";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

const KeyBoard = () => {
	const [text, setText] = useState("");
	const [img, setImg] = useState("");
	const {currentUser} = useContext(AuthContextProvider);
	const {data} = useContext(ChatContextProvider);

	const inputFile = useRef(null);
	const showFile = () => {
		inputFile.current.click();
	};
	const handleSend = async () => {
		if (img) {
			try {
				const storageRef = ref(storage, uuid());
				const uploadTask = uploadBytesResumable(storageRef, img);
				uploadTask.on(
					(error) => {
						console.log(error);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(
							async (downloadURL) => {
								await updateDoc(doc(db, "chats", data.chatId), {
									messages: arrayUnion({
										id: uuid(),
										text,
										senderId: currentUser.uid,
										date: Timestamp.now(),
										img: downloadURL,
									}),
								});
							}
						);
					}
				);
			} catch (err) {
				console.log(err);
			}
		} else {
			await updateDoc(doc(db, "chats", data.chatId), {
				messages: arrayUnion({
					id: uuid(),
					text,
					senderId: currentUser.uid,
					date: Timestamp.now(),
				}),
			});
		}

		await updateDoc(doc(db, "userChat", currentUser.uid), {
			[data.chatId + ".lastMessage"]: {
				text,
			},
			[data.chatId + ".date"]: serverTimestamp(),
		});

		await updateDoc(doc(db, "userChat", data.user.uid), {
			[data.chatId + ".lastMessage"]: {
				text,
			},
			[data.chatId + ".date"]: serverTimestamp(),
		});
		setText("");
	};
	return (
		<div className="w-full lg:h-[60px] sm:h-[80px]">
			<div className="w-full lg:h-[60px] sm:h-[80px] bg-slate-200 flex items-center justify-evenly ">
				<div className="w-[30px] h-[30px] sm:hidden">
					<AiOutlineSmile className="w-full h-full hover:fill-green-500" />
				</div>
				<div className="lg:w-[30px] lg:h-[30px] sm:w-[30px]">
					<input
						type="file"
						id="file"
						ref={inputFile}
						style={{display: "none"}}
						onChange={(event) => {
							setImg(event.target.files[0]);
						}}
						// value={img}
					/>
					<AiOutlinePaperClip
						onClick={showFile}
						className="w-full h-full hover:fill-green-500"
					/>
				</div>
				<div className="lg:w-[400px] lg:h-[35px] sm:w-[300px] bg-lime-300">
					<input
						value={text}
						onChange={(event) => setText(event.target.value)}
						type="text"
						placeholder="Type something . . . ."
						className="w-full h-full p-3 text-slate-700 font-bold focus:outline-none rounded-md"
					/>
				</div>
				<div className="w-[30px] h-[30px]" onClick={handleSend}>
					<AiOutlineSend className="w-full h-full fill-green-600 hover:fill-green-700" />
				</div>
			</div>
		</div>
	);
};

export default KeyBoard;
