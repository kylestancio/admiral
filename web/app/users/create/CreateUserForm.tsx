"use client"

import React, { useState } from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import AlertBanner from '@/components/AlertBanner'

const phoneRegex = new RegExp("^(09|\\+639)\\d{9}$")

const schema = z.object({
  username: z.string().min(1),
  fullName: z.string().min(2),
  address: z.string().min(10),
  phone: z.union([z.string().regex(phoneRegex, {message: "Invalid phone number"}), z.string().length(0)]).optional(),
  email: z.union([z.string().email(), z.string().length(0)]).optional(),
  position: z.string().refine(value=>value!=='placeholder', {
    message: "Please select a value."
  }),
  birthday: z.string().transform((_date)=>{
    const date = new Date(_date)
    return date.toISOString()
  }),
  employmentDate: z.string().transform((_date)=>{
    const date = new Date(_date)
    return date.toISOString()
  }),
  roles: z.array(z.string())
})

const POSITIONS = [
  {value: 'accountant', label: 'Accountant'},
  {value: 'software_developer', label: 'Software Developer'},
  {value: 'manager', label: 'Manager'},
  {value: 'others', label: 'Others'},
]

const ROLES = [
  {value: "USER", label: "User"},
  {value: "USERMANAGER", label: "User Manager"},
  {value: "ACCOUNTSMANAGER", label: "Accounts Manager"},
]

export default function CreateUserForm() {

  const [error, setError] = useState<{error: string, message: string}|null>()

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const submitHandler: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    const formdata = new FormData();
    (Object.keys(data) as (keyof typeof data)[]).map(key => {
      formdata.set(key, data[key] as string || '')
    })
    
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/create`, {
      method: 'POST',
      body: formdata
    })
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      if (data.error) throw data

    })
    .catch(err=>{
      setError({
        error: err.error,
        message: err.message
      })
    })
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className='mt-5'>
      { error && 
        <AlertBanner error={error} onClose={()=>{setError(null)}} />
      }
      <div className='grid grid-cols-5 gap-3'>
        <div className='col-span-3'>
          <label htmlFor='fullName' className='text-sm font-bold'>Full Name</label>
          <input className='block p-1 bg-zinc-200 dark:bg-zinc-800 caret-slate-950 rounded w-full' {...register('fullName')} />
          <span className='block text-sm text-red-500'>{errors.fullName?.message && errors.fullName?.message.toString()}&nbsp;</span>
        </div>

        <div>
          <label htmlFor='username' className='text-sm font-bold'>Username</label>
          <input className='block p-1 bg-zinc-200 dark:bg-zinc-800 caret-slate-950 rounded w-full' {...register('username')} />
          <span className='block text-sm text-red-500'>{errors.username?.message && errors.username?.message.toString()}&nbsp;</span>
        </div>

        <div>
          <label htmlFor='position' className='text-sm font-bold'>Position</label>
          <select className='block p-1 bg-zinc-200 dark:bg-zinc-800 caret-slate-950 rounded w-full' defaultValue={0} {...register('position')}>
            <option value="placeholder" >Please select...</option>
            { POSITIONS.map(position=>(
              <option key={position.value} value={position.value}>{position.label}</option>
            ))}
          </select>
          <span className='block text-sm text-red-500'>{errors.position?.message && errors.position?.message.toString()}&nbsp;</span>
        </div>

        <div className='col-span-full'>
          <label htmlFor='address' className='text-sm font-bold'>Address</label>
          <textarea className='block p-1 bg-zinc-200 dark:bg-zinc-800 caret-slate-950 rounded w-full' {...register('address')} />
          <span className='block text-sm text-red-500'>{errors.address?.message && errors.address?.message.toString()}&nbsp;</span>
        </div>
        
        <div>
          <label htmlFor='phone' className='text-sm font-bold'>Phone (Philippines)</label>
          <input className='block p-1 bg-zinc-200 dark:bg-zinc-800 caret-slate-950 rounded w-full' {...register('phone')} />
          <span className='block text-sm text-red-500'>{errors.phone?.message && errors.phone?.message.toString()}&nbsp;</span>
        </div>
        
        <div>
          <label htmlFor='email' className='text-sm font-bold'>Email Address</label>
          <input className='block p-1 bg-zinc-200 dark:bg-zinc-800 caret-slate-950 rounded w-full' {...register('email')} />
          <span className='block text-sm text-red-500'>{errors.email?.message && errors.email?.message.toString()}&nbsp;</span>
        </div>
        
        <div>
          <label htmlFor='username' className='text-sm font-bold'>Birthday</label>
          <input type='date' className='block p-1 bg-zinc-200 dark:bg-zinc-800 caret-slate-950 rounded w-full' {...register("birthday")} />
          <span className='block text-sm text-red-500'>{errors.birthday?.message && errors.birthday?.message.toString()}&nbsp;</span>
        </div>
        
        <div>
          <label htmlFor='employmentDate' className='text-sm font-bold'>Employment Date</label>
          <input type='date' className='block p-1 bg-zinc-200 dark:bg-zinc-800 caret-slate-950 rounded w-full' {...register("employmentDate")} />
          <span className='block text-sm text-red-500'>{errors.employmentDate?.message && errors.employmentDate?.message.toString()}&nbsp;</span>
        </div>

        <div>
          <label htmlFor="" className='text-sm font-bold'>Roles</label>
          { ROLES.map(role => (
            <span key={role.value} className='block'>
              <input id={`role_${role.value}`} type='checkbox' className='me-2' {...register('roles')} value={role.value} />
              <label htmlFor={`role_${role.value}`}>{role.label}</label>
            </span>
          ))}
        </div>

      </div>

      <button type='submit' className='block px-3 py-2 rounded-md border dark:border-white bg-zinc-950 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950'>Submit</button>
    </form>
  )
}