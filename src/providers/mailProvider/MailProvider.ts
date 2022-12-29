import aws from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { singleton } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@singleton()
class MailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    const ses = new aws.SES({
      apiVersion: "2010-12-01",
      region: process.env.AWS_REGION,
    });

    this.client = nodemailer.createTransport({
      SES: { ses, aws },
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

    await this.client.sendMail({
      from: "Inventory Control <jeanlima.dev@gmail.com>",
      to,
      subject,
      html: templateHTML,
    });
  }
}

export { MailProvider };
