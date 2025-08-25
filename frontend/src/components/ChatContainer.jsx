import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();

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
            <div className="flex-1 pt-[56px] pb-[56px] overflow-auto">
                <p>messages...</p>
            </div>
            <MessageInput />
        </div>
    );
};

export default ChatContainer;