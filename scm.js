const http = require("http");

const username = "scmadmin";
const password = "scmadmin";
const usersCount = 10;

const options = {
  method: "POST",
  host: "localhost",
  port: 8081,
  path: "/scm/api/rest/v2/users",
  headers: {
    "Content-Type": "application/vnd.scmm-user+json;v=2",
    "Authorization":
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
  }
};

export const createUser = user => {
  const req = http.request(options, function(res) {
    if (res.statusCode === 201) {
      console.log(`successfully created user ${user.name}`);
    } else {
      console.log(
        `could not create user ${user.name}, server returned status code ${
          res.statusCode
        }`
      );
    }
  });

  req.on("error", function(e) {
    console.log("problem with request: " + e.message);
  });

  req.write(JSON.stringify(user));
  req.end();
};
