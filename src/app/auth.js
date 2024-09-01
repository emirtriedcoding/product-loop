import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import connectToDb from "@/config/db";
import User from "@/models/User";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [Google, Github],
  callbacks: {
    async signIn({ account, profile }) {
      try {
        if (account.provider === "github" || account.provider === "google") {
          connectToDb();

          const user = await User.findOne({ email: profile.email });

          if (!user) {
            await User.create({
              name: profile.name,
              email: profile.email,
              image:
                account.provider === "google"
                  ? profile.picture
                  : profile.avatar_url,
              provider: account.provider,
            });
          }

          return true;
        }
        return false;
      } catch (error) {
        console.log("Error while saving user into DB:", error);
        return false;
      }
    },
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        path: "/",
        sameSite: "lax", // or "strict" or "none" if needed
        secure: true , // true in production
      },
    },
  },
});
