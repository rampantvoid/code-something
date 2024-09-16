import { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authProviders: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: "5c069a51-1b66-464a-a291-2ec05a347759",
      clientSecret: "m988Q~PTb_LrKXiHcYiidiHDkmmRNzJbGdmi6af6",
      tenantId: "91cc1fb6-1275-4acf-b3ea-c213ec16257b",
    }),
  ],
};
