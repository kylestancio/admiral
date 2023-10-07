import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password", placeholder: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        if (!credentials.username || !credentials.password) return null;

        const query = {
          id: "test_id_1",
          name: "The User's full name",
          username: "test",
          password: "test"
        }

        if (query.username === credentials.username && query.password === credentials.password ) {
          const {password, ...user} = query
          return user
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({user, token}:any){
      if (user){
        token.user = user
      }
      return token
    },

    async session({token, session}:any){
      session.user = token.user

      return session;
    }
  }
}

const handler = NextAuth(authOptions)

export {handler as POST, handler as GET}