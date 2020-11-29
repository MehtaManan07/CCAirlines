const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const hbs = require('handlebars');

const compile = async (name, data) => {
  const filePath = path.join(
    process.cwd(),
    'server',
    'utils',
    'templates',
    `${name}.hbs`
  );
  const html = await fs.readFile(filePath, 'utf-8');
  return hbs.compile(html)(data);
};

const sendPdf = async (data) => {
  try {
    const { _id, passengers, user, createdAt, price } = data;
    let event = new Date(createdAt);
    let date = JSON.stringify(event);
    date = date.slice(1, 11);
    const obj = {
      _id,
      passengers,
      userName: user.name,
      email: user.email,
      phone: user.phoneNum,
      date,
      price,
    };
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await compile('booking', obj);
    await page.setContent(content);
    await page.pdf({
      path: path.join(
        process.cwd(),
        'server',
        'utils',
        'invoices',
        `ticket_${_id}.pdf`
      ),
      format: 'A4',
      printBackground: true,
    });
    console.log(`wooohooo`);
    await browser.close();
  } catch (error) {
    console.log('ouch\n', error);
  }
};
module.exports = sendPdf;
