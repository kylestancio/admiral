import { UserRole } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      username: string,
      role: UserRole[]
    } & DefaultSession["user"]
  }
}