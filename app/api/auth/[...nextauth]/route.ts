import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.email && credentials?.password) {
          return { id: credentials.email, email: credentials.email, name: credentials.email.split('@')[0] };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: '/auth/signin' },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) (session.user as any).id = token.id;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
