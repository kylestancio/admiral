'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export default function ThemeButton() {

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button 
      type='button'
      className='p-2 shadow-md rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900'
      onClick={_=>setTheme(theme==='light'?'dark':'light')}
    >
      {theme==='dark' && 
        <><Sun className='inline me-2' />Light</>
      }
      {theme==='light' && 
        <><Moon className='inline me-2' />Dark</>
      }
    </button>
  )
}
