import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image } from "lucide-react";

const MessageInput = () => {

    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {

    };

    const removeImage = () => { };

    const handleSendMessage = () => { };

    return (
        <div className="absolute left-0 bottom-0 w-full z-40 p-4 backdrop-blur-sm bg-base-100/60 border-t border-base-200">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 ">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input rounded-lg input-sm sm:input-md"
                        placeholder="Message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></input>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    >
                    </input>
                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MessageInput;;;