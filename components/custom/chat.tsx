'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'
import clsx from 'clsx'

const Chat = () => {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user' as const, content: input };
        setMessages(prev => [userMessage, ...prev]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input }),
            });
            const data = await res.json();
            const botMessage = { role: 'assistant' as const, content: data.choices[0].message.content };

            setMessages(prev => [botMessage, ...prev]);
        } catch (error) {
            console.error('Error sending message', error);
        } finally {
            setLoading(false);
        }
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className='flex flex-col h-full'>
                <div className="px-6 overflow-y-scroll h-[100vh] flex flex-col-reverse gap-4 scrollbar-hide">
                    {
                        messages.map((message, index) =>
                            <div
                                key={index}
                                className={`max-w-xl p-3 rounded-lg shadow text-sm ${message.role == "user"
                                    ? 'ml-auto bg-purple-500 text-white'
                                    : 'mr-auto bg-purple-300 text-gray-800'
                                    }`}
                            >
                                <div>{message.content}</div>
                            </div>
                        )
                    }
                </div>
            <div className="w-full max-w-md bg-white/10 rounded-lg p-2 flex items-center space-x-2 mx-auto">
                <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={loading ? "Thinking..." : "Type your message..."}
                    disabled={loading}
                    className="bg-transparent text-white placeholder-white/60 border-none focus:ring-0 focus:outline-none"
                />
                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="p-2 bg-white/20 rounded-md hover:bg-white/30 transition disabled:opacity-50">
                    <Send className="h-5 w-5 text-white" />
                </button>
            </div>
        </div>
    )
}

export default Chat
