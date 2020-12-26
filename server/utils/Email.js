const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Manan Mehta <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    console.log('1');
    if (process.env.NODE_ENV === 'production') {
      console.log('2');
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
  }

  async send(_id, subject) {
    console.log('3')
    // 3) Actually send the email
    try {
      console.log('4')
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
    } catch (error) {
      console.log('6 yuk')
      console.log(error);
    }
  }

  async sendBooking(id) {
    console.log('7')
    await this.send(id, 'Ticket Details');
  }
};
