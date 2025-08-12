import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Chat from '@/components/custom/chat'

const Page = () => {
  return (
    <div className="bg-black h-[100vh]">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-b-white/10">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/profile.png" />
            <AvatarFallback className="text-white bg-gray-700">NW</AvatarFallback>
          </Avatar>
          <span className="text-base font-semibold text-white">
            Chatbot by Nyi Wai Yan Tun
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-base font-semibold text-white">
            Quick Thai
          </span>
        </div>
      </nav>
      <main className="h-[92vh] px-0 py-6">
        <Chat/>
      </main>
    </div>
  )
}

export default Page
