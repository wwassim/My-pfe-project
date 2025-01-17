import React, {  useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector  } from "react-redux";  
import Conversation from './Conversation ';
import Messenger from './Messenger';
import axios from "axios";
import {io} from "socket.io-client"
import SignFirst from "../utility/SignFirst"
import { toast } from 'react-toastify'

const ChatDetails = ({user}) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = io('ws://localhost:8900');

  useEffect(() => {
    socket.on('getMessage', ({ senderId, text }) => {
      console.log(`Received a message from ${senderId}: ${text}`);
      setArrivalMessage({
        sender: senderId,
        text: text,
        createdAt: Date.now(),
      });
    });
  }, []);
  

  
  useEffect(() => {
    // if (arrivalMessage){
    //   console.log(currentChat?.members)
    //   console.log(arrivalMessage.sender)
    // }
    
    if (arrivalMessage && currentChat?.members.some(member => member._id === arrivalMessage.sender)) {
      console.log(arrivalMessage)
      setMessages((prev) => [...prev, arrivalMessage]);
      toast.info('New message received!', { position: toast.POSITION.TOP_RIGHT });
    }
  }, [arrivalMessage, currentChat]);
  

  //add user to soket 
  useEffect(() => {
    socket.emit("addUser", user._id);
    socket.on("getUsers", (users) => {
      // console.log(users)
    });
  }, [user]);

/////////////////
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };
    
    const receiverId = currentChat?.members.find(
      (member) => member._id !== user?._id
    );

    socket.emit("sendMessage", {
      senderId: user?._id,
      receiverId :receiverId?._id,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
       //  <!-- This is an example component -->
       <div className="container w-full h-[600px]  mx-auto shadow-lg rounded-lg">
       {/* <!-- Chatting --> */}
       <div className="flex flex-row justify-between bg-white h-full">
         {/* <!-- chat list --> */}
         <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
           {/* <!-- search compt --> */}
           <div className="border-b-2 py-4 px-2">
             <input
               type="text"
               placeholder="search chatting"
               className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
             />
           </div>
           {/* <!-- end search compt --> */}
           {/* <!-- user list --> */}
           {conversations.map((item) => {
              return (
                <div className='cursor-pointer' onClick={() => setCurrentChat(item)}>
                  <Conversation conv={item} currentUser={user} />
                </div>
              );
            })}
           
           {/* <!-- end user list --> */}
         </div>
         {/* <!-- end chat list --> */}
         {/* <!-- message --> */}
         <div className="w-full px-5 flex flex-col justify-between">
         {currentChat ? (
           <>
           <div className="flex flex-col mt-5 overflow-y-scroll">

           {messages.map((m)=>(
             <div ref={scrollRef}>
               <Messenger message={m} own={m.sender===user._id}/> 
             </div>
             ))
           }
           </div>
           <div className="py-5 flex justify-between">
             <input
               className="w-full bg-gray-300 py-5 px-3 rounded-xl mr-2"
               type="text"
               placeholder="type your message here..."
               onChange={(e) => setNewMessage(e.target.value)}
               value={newMessage}
             />
             <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl" onClick={handleSubmit}>
               Send
             </button>
           </div>
           </>):(
             <>
               <img
                src="/assets/chat.jpg"
                alt="Empty Chat"
                className="h-full w-full"
                />
             </>
           )}
         </div>
         {/* <!-- end message --> */}
       </div>
   </div>
  );
}

export default ChatDetails;