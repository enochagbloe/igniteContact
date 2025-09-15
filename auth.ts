import NextAuth from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import { api } from "./lib/handlers/api";
import { ActionResponse } from "./types/globals";
import { IAccountDoc } from "./database/account.model";

// Configure NextAuth with your GitHub app credentials
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [github, google],
  callbacks: {
    session: async ({ session, token }) => {
      if (token?.sub) session.user.id = token.sub;
      return session;
    },
    async signIn({ user, profile, account }) {
      if (account?.type === "credentials") return true;
      if (!account || !user) return false;

      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image!,
        username:
          account.provider === "google"
            ? (profile?.login as string)
            : (user.name?.toLocaleLowerCase() as string),
      };
      const { success } = await api.auth.oAuthSignIn({
        user: userInfo,
        provider: account.provider as "github" | "google",
        providerAccountId: account.providerAccountId,
      });

      if (!success) return false;
      // Custom sign-in logic
      return true;
    },

    async jwt({ token, account }) {
      if (account) {
        const { data: existingAccount, success } =
          (await api.accounts.getByProvider(
            account.type === "credentials"
              ? account.providerAccountId
              : account.providerAccountId
          )) as ActionResponse<IAccountDoc>;

        if (!success || !existingAccount) return token;
        const userId = existingAccount.userId;
        if (userId) token.sub = userId.toString();
      }
      return token;
    },
  },
});
