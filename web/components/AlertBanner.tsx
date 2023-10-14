'use client'

import { AlertCircle, CheckCircle, X, XCircle } from 'lucide-react'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface IError{
  error: string,
  message: string
}

type TAlertType = "warning" | "error" | "success"

export default function AlertBanner({
  type="error", 
  error,
  onClose
}:{
  type?:TAlertType,
  error: IError,
  onClose: ()=>void
  }) {

  return (
    <div className={cn(
      'w-full my-5 p-2 rounded flex gap-3',
      type==='error' && 'bg-red-500 text-white',
      type==='warning' && 'bg-yellow-300 text-black',
      type==='success' && 'bg-green-500 text-white'
    )}>
      <div className='my-auto'>
        {type==='error' && 
          <XCircle />
        }
        { type==='warning' && 
          <AlertCircle />
        }
        { type==='success' &&
          <CheckCircle />
        }
      </div>
      <div className='my-auto grow'>
        <p className='font-medium'>{error.error}</p>
        <p>{error.message}</p>
      </div>
      <div>
        <button type='button' onClick={onClose}>
          <X />
        </button>
      </div>
    </div>
  )
}
