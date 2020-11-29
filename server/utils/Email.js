const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    console.log(user.email)
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Manan Mehta <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //sendgrid
      const transporter = nodemailer.createTransport({
        service: 'Sendgrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
      return transporter;
    }
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    return transporter;
  }

  async send(_id, subject) {
    // 3) Actually send the email
    try {
      console.log('yus2');
      await this.newTransport().sendMail({
        from: this.from,
        to: this.to,
        subject: subject,
        attachments: [
          {
            filename: `ticket_${_id}.pdf`,
            path: `./server/utils/invoices/ticket_${_id}.pdf`,
          },
        ],
      });
      console.log('yo');
    } catch (error) {
      console.log('shit\n');
      console.log(error);
    }
  }

  async sendBooking(id) {
    console.log('yus3');
    await this.send(id, 'Ticket Details');
    console.log('yus4');
  }
};
