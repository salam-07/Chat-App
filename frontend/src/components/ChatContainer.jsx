import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import useAuthStore from "../store/useAuthStore";

import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
    const { authUser } = useAuthStore();

    useEffect(() => {
        getMessages(selectedUser._id);
    }, [selectedUser._id, getMessages]);


    if (isMessagesLoading) return (
        <div className="flex-1 flex flex-col overflow-auto relative">
            <ChatHeader />
            <div className="flex-1 pt-[56px] pb-[56px] overflow-auto">
                <MessageSkeleton />
            </div>
            <MessageInput />
        </div>
    );

    return (
        <div className="flex-1 flex flex-col overflow-auto relative">
            <ChatHeader />
            <div className="flex-1 pt-[56px] pb-[78px] overflow-auto">
                <div className="flex-1 overflow-y-auto p4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message._id}
                            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                        >
                            <div className="chat-image avatar">
                                <div className="size-8 rounded-full border">
                                    <img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                                        alt="profile pic" />
                                </div>
                            </div>
                            <div className="chat-header mb-1 ">
                                <time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}</time>
                            </div>
                            <div className="chat-bubble flex flex-col">
                                {message.image && (
                                    <img src={message.image}
                                        alt="attachment"
                                        className="sm:max-w-[200px] rounded-lg mb-1"
                                    />
                                )}
                                {message.text && <p>{message.text}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <MessageInput />
        </div>
    );
};

export default ChatContainer;