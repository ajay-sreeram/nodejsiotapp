module.exports = (req, res) => {
  // Render the "index" view, with the specified data model.
  // Because Express is configured (in server.js) to use the Pug view engine,
  // and to look within the "views" directory for views, it will
  // know to translate "index" into "views/index.pug" automatically.
  res.render("index", { title: "Azure App Service" });
};