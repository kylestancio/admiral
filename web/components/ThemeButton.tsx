'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, SunMoon } from 'lucide-react'

export default function ThemeButton() {

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className='p-1 shadow-md rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900' disabled>
        <SunMoon className='inline me-2'/>
      </button>
    )
  }

  return (
    <button 
      type='button'
      className='p-1 shadow-md rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900'
      onClick={_=>setTheme(theme==='light'?'dark':'light')}
    >
      {theme==='dark' ?
        <Sun className='inline' />
        :
        <Moon className='inline' />
      }
    </button>
  )
}
