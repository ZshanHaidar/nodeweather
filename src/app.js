const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;

//public static path
const template_path = path.join(__dirname, `../templates/views`);
const partials_path = path.join(__dirname, `../templates/partials`);
app.use(express.static(path.join(__dirname, `../public`)));
app.set("view engine", "hbs");
app.set(`views`, template_path);
hbs.registerPartials(partials_path);

//routing
app.get(`/`, (req, res) => {
  res.render(`index`);
});

app.get(`/about`, (req, res) => {
  res.render(`about`);
});

app.get(`/weather`, (req, res) => {
  let date_ob = new Date();
  let date = date_ob.toLocaleString(`en-US`, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  res.render(`weather`, {
    date: `${date}`,
  });
});

app.get(`*`, (req, res) => {
  res.render(`404error`, {
    errorMsg: `Opps! Page Not Found`,
  });
});
app.listen(port, () => {
  console.log(`Listing to the port at ${port}`);
});
