import User from "@models/user";
import { connectDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectDB();
        const sessionUser = await User.findOne({
          email: session.user.email,
        });

        if (!sessionUser) {
          throw new Error("User not found in the session callback.");
        }

        session.user.id = sessionUser._id.toString();
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        await connectDB();

        const userExists = await User.findOne({
          email: profile.email,
        });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
