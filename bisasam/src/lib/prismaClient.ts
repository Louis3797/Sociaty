// import { Prisma, PrismaClient } from "@prisma/client";

// const prisma: PrismaClient<
//   Prisma.PrismaClientOptions,
//   never,
//   Prisma.RejectOnNotFound | Prisma.RejectPerOperation
// > = new PrismaClient<
//   Prisma.PrismaClientOptions,
//   never,
//   Prisma.RejectOnNotFound | Prisma.RejectPerOperation
// >();

// export default prisma;

import { Prisma, PrismaClient } from "@prisma/client";

declare global {
  var prismaa: PrismaClient | undefined;
}

let prisma: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prismaa) {
    global.prismaa = new PrismaClient();
  }
  prisma = global.prismaa;
}

export default prisma;
