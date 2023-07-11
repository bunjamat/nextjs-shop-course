import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LineProvider from "next-auth/providers/line";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  //ผู้ให้บริการ open api
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    
    // LineProvider({
    //   clientId: process.env.LINE_CLIENT_ID,
    //   clientSecret: process.env.LINE_CLIENT_SECRET,
    // }),
  ],

  //key
  secret: process.env.NEXTAUTH_SECRET,
  //หลังจากมีการตอบกลับมาจาก google
  callbacks: {
    async session({ session }) {
      //ค้าหาข้อมูลผู้ใช้ใน database

      const sessionUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      session.user.id = sessionUser.id.toString();

      return session;
    },

    async signIn({ account, profile, user, credentials }) {
      try {
        // เช็คว่ามี user แล้วหรือยัง
        const userExists = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        // ถ้ายังไม่มี, ให้สร้าง user ใหม่ และบันทึกลงใจ database
        if (!userExists) {
          let regex = /[.*+?^${}()|[\]\\]/g;
          const email = profile.email;
          const newUsername = email.split("@")[0];
          const username = newUsername.replace(regex, "").toLowerCase();

          await prisma.user.create({
            data: {
              email: profile.email,
              username: username,
              image: profile.picture,
            },
          });
        }
        // login success
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);

        // login error
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
