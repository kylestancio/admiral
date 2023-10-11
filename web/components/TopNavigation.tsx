"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'
import ThemeButton from './ThemeButton'


export default function TopNavigation() {

  const pathname = usePathname()

  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);

  return (
    <div className='w-full h-14 bg-zinc-100 dark:bg-zinc-900 flex gap-4 px-3'>
      <div className='lg:hidden'>
        {/* SIDE MENU CONTAINER */}
      </div>
      <div className='my-auto'>
        {/* TITLE */}
        <p className='text-xl font-bold' >ADMIRAL</p>
        <p className="text-sm">Fleet Management</p>
      </div>
      <div className='my-auto grow space-x-1'>
        {/* NAV LINKS */}
        <Link 
          href={'/'} 
          className={cn(
            "hover:text-purple-600 px-2 py-1 rounded-md", 
            RegExp("[/^]$").test(pathname) && "bg-zinc-300 dark:bg-zinc-700 hover:text-zinc-800 dark:hover:text-zinc-200")}>
            Home
        </Link>
        <Link 
          href={'/users'} 
          className={cn(
            "hover:text-purple-600 px-2 py-1 rounded-md", 
            RegExp("[users^]$").test(pathname) && "bg-zinc-300 dark:bg-zinc-700 hover:text-zinc-800 dark:hover:text-zinc-200")}>
            Users
        </Link>
      </div>
      <div className='h-full my-auto p-2 flex gap-2'>
        {/* USER AVATAR + LOGIN/LOGOUT BUTTONS */}
        <ThemeButton />
        <div className='relative h-full aspect-square rounded-md bg-zinc-500 cursor-pointer' onClick={()=>setAvatarDropdownOpen(!avatarDropdownOpen)}>
          {/* USER AVATAR CONTAINER */}
        </div>
        { avatarDropdownOpen && 
          <div className='absolute p-3 right-2 top-16 w-[230px] rounded-md bg-zinc-100 dark:bg-zinc-700 shadow space-y-1'>
            <p className='text-xs font-bold'>General</p>
            <Link href={'/settings'}>Settings</Link>
            <p className='text-red-500 cursor-pointer' onClick={()=>signOut()}>Logout</p>
          </div>
        }
        
      </div>
    </div>
  )
}
