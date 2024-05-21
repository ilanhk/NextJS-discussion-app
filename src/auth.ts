import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter"; //docs https://next-auth.js.org/v3/adapters/prisma
import { db } from "@/db";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if(!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET){
  throw new Error('missing github Oauth creditials');
};


// handlers: { GET, POST } - call these request handlers automatically by github servers everytime a user signs in 
// auth() - will see if user is signed in inside a react component
// signOut() - call to signout
// signIn() - call to sign in
export const { handlers: { GET, POST }, auth, signOut, signIn} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    //session() will be called whenever we try to verify who a user is
    //usually not needed, but fixing a bug in next-auth
    async session({ session, user }: any ){
      if( session && user ){
        session.user.id = user.id;
      }

      return session;
    }, 
  }
});

//How Oauth works:
//1. Once a user clicks to Sign in our next server will redirect them to Github server with our 'client_id'
//2. Github will ask user if ok to share info in our app. If so they get redirected back to our next server via the github "Authorization callback URL"
//3. the "Authorization callback URL" will have a string param of code. Our server will take that code and make a follow up request to github that will include {clientId, clientSecret, code}
//4. Github will look at {clientId, clientSecret, code} and make sure they are valid. If valid it will respond to our server with an access_token
//5. Once we have the access_token we make a request to Github servers with the token in an authorization header to ask for the user data (name, email, etc)
//6. Github will respond with the users profile data to us.
//7. Prisma will make a new user record in the db
//8. we send a cookie back to users browser which will be included in all future req automatically. It will tell the server who the user is

//most of these steps are handled by next auth
//all we need to do is to correctly define the callback ("Authorization callback URL")



