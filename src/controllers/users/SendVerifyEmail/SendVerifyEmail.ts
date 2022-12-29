import { resolve } from "path";
import { container } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { prismaClient } from "../../../database/prismaClient";

import { MailProvider } from "../../../providers/mailProvider/MailProvider";
import { UsersTokensRepository } from "../../../repositories/UsersTokensRepository/UsersTokensRepository";
import { DayJsDateProvider } from "../../../utils/DateProvider/DayJsDateProvider";

export async function sendVerifyMail(email: string) {
  const user = await prismaClient.users.findFirstOrThrow({
    where: {
      email,
    },
  });

  const mailProvider = container.resolve(MailProvider);

  const templatePath = resolve(
    __dirname,
    "..",
    "..",
    "..",
    "views",
    "emails",
    "forgotPassword.hbs"
  );

  const token = uuidV4();

  const dateProvider = container.resolve(DayJsDateProvider);

  const expires_date = dateProvider.addDays(1);

  const usersTokensRepository = container.resolve(UsersTokensRepository);

  await usersTokensRepository.create({
    user_id: user.id,
    user_token: token,
    expires_date,
  });

  const variables = {
    name: user.name,
    link: `${process.env.FORGOT_MAIL_URL}${token}`,
  };

  mailProvider.sendMail(
    "jeanlima.dev@gmail.com",
    "Ativação de conta",
    variables,
    templatePath
  );
}
