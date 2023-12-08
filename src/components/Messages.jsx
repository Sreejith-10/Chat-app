import React, {useContext, useEffect, useState} from "react";
import Message from "./Message";
import {ChatContextProvider} from "../context/ChatContext";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../firbase";

const Messages = () => {
	const {data} = useContext(ChatContextProvider);

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const onSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
			doc.exists() && setMessages(doc.data().messages);
		});

		return () => {
			onSub();
		};
	}, [data.chatId]);

	let pmsg = messages?.map((msg) => {
		return <Message msg={msg} key={msg.id} />;
	});

	return <div className="w-full h-full flex flex-col">{pmsg}</div>;
};

export default Messages;
