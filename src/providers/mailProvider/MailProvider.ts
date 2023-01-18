import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { singleton } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@singleton()
class MailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_MAIL_LOGIN,
        pass: process.env.ZOHO_MAIL_PASSWORD
      }
    });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    try {
      await this.client.sendMail({
        from: "Inventory Control <contato@jeanlima.dev>",
        to,
        subject,
        html: templateHTML,
      });
    } catch (error) {
      console.log(error);
    };
  };
};

export { MailProvider };
