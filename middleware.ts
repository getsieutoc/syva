import { withAuth } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/api/:path*',
    '/interviews/:path*',
    '/candidates/:path*',
    '/jobs/:path*',
  ],
};

export default withAuth({
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: '/login', // Error code passed in query string as ?error=
  },
});
