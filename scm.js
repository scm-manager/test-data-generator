const http = require("http");

const username = "scmadmin";
const password = "scmadmin";

const userOptions = {
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
  sendJSON(user, "user", userOptions);
};

const repositoryOptions = {
    method: "POST",
    host: "localhost",
    port: 8081,
    path: "/scm/api/rest/v2/repositories",
    headers: {
        "Content-Type": "application/vnd.scmm-repository+json;v=2",
        "Authorization":
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
    }
};

export const createRepository = repository => {
    sendJSON(repository, "repository", repositoryOptions);
};

const groupOptions = {
    method: "POST",
    host: "localhost",
    port: 8081,
    path: "/scm/api/rest/v2/groups",
    headers: {
        "Content-Type": "application/vnd.scmm-group+json;v=2",
        "Authorization":
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
    }
};

export const createGroup = group => {
    sendJSON(group, "group", groupOptions);
}

const sendJSON = (data, type, options) => {
    const req = http.request(options, function(res) {
        if (res.statusCode === 201) {
            console.log(`successfully created ${type} ${data.name}`);
        } else {
            console.log(
                `could not create ${type} ${data.name}, server returned status code ${
                    res.statusCode
                    }`
            );
        }
    });

    req.on("error", function(e) {
        console.log("problem with request: " + e.message);
    });

    req.write(JSON.stringify(data));
    req.end();
};
