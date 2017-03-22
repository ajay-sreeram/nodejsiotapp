const express = require("express"),
      path = require("path");

// Initialize the web app instance,
// along with the desired view engine
// for rendering view templates.
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Indicate which directory static resources
// (e.g. stylesheets) should be served from.
app.use(express.static(path.join(__dirname, "public")));

// Expose a default route, and begin listening for requests.
app.get("/", require("./routes/index"));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

// Potential next steps:
// ---------------------
// 1) Update the views/stylesheets to get a feel for using Pug and static resources
// 2) Add additional routes/views to handle more requests (e.g. /about, /users)
// 3) Add additional middleware to process requests as needed (e.g. JSON bodies, cookie headers)
// 4) Add some front-end JavaScript, reference it from your layout view, and serve the file from the /public directory
// 5) Have fun trying App Service!