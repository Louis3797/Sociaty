import { User } from "@prisma/client";
import prisma from "../src/lib/prismaClient";

export async function getUserData(displayName: string): Promise<User | null> {
  return await prisma.user.findFirst({
    where: {
      displayName: displayName,
    },
  });
}
