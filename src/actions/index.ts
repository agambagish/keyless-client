"use server";

import { db } from "~/db";
import { users } from "~/db/schema";

export const addUser = async (payload: { name: string; uid: string }) => {
  try {
    const newUser = await db
      .insert(users)
      .values({
        name: payload.name,
        uid: payload.uid,
      })
      .returning({
        id: users.id,
      })
      .then((res) => res[0]);

    return {
      data: newUser,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: "This key is already assigned to another user.",
    };
  }
};
