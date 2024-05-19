// import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/user';
import NextAuth from 'next-auth/next';
import Google from 'next-auth/providers/google';

export const OPTIONS = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60
  },
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });

        if(!userExists) {
          await User.create({
            email: profile.email,
          })
        }

        console.log('User found.')

        return true
      } catch (error) {
        console.log('Error checking if user exists: ', error.message);
        return flase
      }
    },
  }
};

export const handler = NextAuth(OPTIONS)

export { handler as GET, handler as POST }

