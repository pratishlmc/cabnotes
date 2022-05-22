import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../utils/mongodb"

export default NextAuth({
  site: process.env.NEXTAUTH_URL,
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GithubProvider({
      clientId: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
  ],
})