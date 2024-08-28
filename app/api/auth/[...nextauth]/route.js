import User from "@models/user";
import { connectDB } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  async session({ session }) {
    const sessionUser = await User.findone({
      email: session.user.email,
    });

    session.user.id = sessionUser._id.toString();
  },
  async signIn({ profile }) {
    try {
      await connectDB();

      const userExists = await User.findone({
        email: profile.email,
      });

      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(' ', '').toLowerCase(),
          image: profile.picture,
        })
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
})

export { handler as GET, handler as POST };
