import { hash } from "bcrypt";
import { prismaClient } from "../database/prismaClient";

async function create() {
  const password = await hash("admin", 8);

  await prismaClient.users.create({
    data: {
      email: "admin@admin.com",
      name: "admin",
      password,
      isAdmin: true,
    },
  });
}

create().then(() => console.log("User admin created!"));
