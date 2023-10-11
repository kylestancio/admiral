import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function verifyAccessRole(rolesAllowed: string[], roles: string[] | null){
  var access = false
  if (!roles) return access;
  roles.forEach(role=>{
    if (rolesAllowed.includes(role)){
      access = true;
    }
  })
  return access;
}