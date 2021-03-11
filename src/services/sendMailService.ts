import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';

interface IHbsComponents {
  name: string;
  title: string;
  description: string;
  link: string;
  user_id: string;
}

class SendMailService {
  private client: Transporter;
  constructor() {
    nodemailer.createTestAccount().then((account) => {
      let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: { user: account.user, pass: account.pass },
      });
      this.client = transporter;
    });
  }
  async execute(to: string, hbsVars: IHbsComponents, path: string) {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const mailTemplateParse = handlebars.compile(templateFileContent);
    const html = mailTemplateParse(hbsVars);
    try {
      const message = await this.client.sendMail({
        to,
        subject: hbsVars.title,
        html,
        from: 'NPS <noreply@nps.com.br>',
      });
      console.log('Message sent: ' + message.messageId);
      console.log('Preview URL: ' + nodemailer.getTestMessageUrl(message));
    } catch (err) {
      console.log('error occurred: ' + err.message);
      return process.exit(1);
    }
  }
}

export default new SendMailService();
