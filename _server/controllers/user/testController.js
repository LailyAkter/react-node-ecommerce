const mailgunLoader = require("mailgun-js");
const Contact = require("../../models/user/Contact");
module.exports = function(app, prefix) {
  let mailgun = mailgunLoader({
    apiKey: "23c030373cf4bb5a070f364cc90a8551-f7910792-baa0f1da",
    domain: "sandbox704684b2350c492ba3a6d3081b3557b0.mailgun.org"
  });

  const sendMail = () => {
    let data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomness!'
    };
    return mailgun.messages().send(data);
  };
  app.post(prefix + "/contact", async (req, res) => {
    try {
      await sendMail(
        "sidratuljahan7@gmail.com",
        "no-reply@test.com",
        "hello there",
        req.body.message
      );
      res.send("email send");
    } catch (err) {
      console.error(err.message);
      res.status(500);
    }
  });
};
