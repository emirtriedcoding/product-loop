import connectToDb from "@/config/db";
import User from "@/models/User";

import { auth } from "@/app/auth";

import { formatDistanceToNow } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";

export const authUser = async () => {
  const session = await auth();

  if (!session) return null;

  
  connectToDb();

  const user = await User.findOne({ email: session.user.email })
    .populate("products")
    .populate("saved");

  if (!user) return null;

  return user;
};

export const timeAgo = (date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: faIR,
    includeSeconds: true,
  });
};
