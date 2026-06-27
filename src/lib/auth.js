import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// ১. মঙ্গোডিবি ক্লায়েন্ট কানেকশন
const client = new MongoClient(process.env.MONGO_DB_URI);

// ২. ডাটাবেজ সিলেক্ট করা (এনভায়রনমেন্ট ভ্যারিয়েবল কাজ না করলে Medicare নাম সেট হবে)
const db = client.db(process.env.AUTH_DB_NAME || "medicare_db");

export const auth = betterAuth({
  // 🎯 ডাটাবেজ অ্যাডাপ্টারে db অবজেক্টটি সরাসরি পাস করুন
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

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
});