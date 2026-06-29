import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

// ১. মঙ্গোডিবি ক্লায়েন্ট কানেকশন
const client = new MongoClient(process.env.MONGO_DB_URI);

// ২. ডাটাবেজ সিলেক্ট করা
const db = client.db(process.env.AUTH_DB_NAME || "medicare_db");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  // 🎯 ফিক্সড ১: কাস্টম ফিল্ডগুলো শুধু user-এ নয়, session-এও যুক্ত করতে হবে
  user: {
    additionalFields: {
      role: { type: "string" },
      status: { type: "string" },
      plan: {
        type: "string",
        defaultValue: "free",
      },
    },
  },

  // 🎯 ফিক্সড ২: সেশন অবজেক্টের ভেতরেও এই কাস্টম ফিল্ডগুলো ম্যাপ করে দিতে হবে
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 60 * 24 * 30,
    },
    // সেশনে কাস্টম ইউজার ফিল্ড রিড করার জন্য এটি অত্যন্ত জরুরী
    additionalFields: {
      user: {
        role: { type: "string" },
        status: { type: "string" },
        plan: { type: "string" },
      }
    }
  },

  // 🎯 ফিক্সড ৩: নেক্সট জেএস সার্ভার অ্যাকশন ও এপিআই হ্যান্ডেল করার জন্য 
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },

  plugins: [
    jwt()
  ]
});