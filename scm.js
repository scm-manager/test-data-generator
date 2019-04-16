const http = require("http");
const config = require("./package.json")["scm-manager"];

const baseOptions = {
    host: config.host,
    port: config.port,
    method: "POST",
    headers: {
        Authorization: "Basic " + Buffer.from(`${config.username}:${config.password}`).toString("base64")
    }
};

const createRequestOptions = (urlSuffix, contentType) => {
    return {
        ...baseOptions,
        path: `${config.contextPath}/api/v2/${urlSuffix}`,
        headers: {
          ...baseOptions.headers,
          "Content-Type": contentType
        }
      };
}

const userOptions = createRequestOptions("users", "application/vnd.scmm-user+json;v=2");
export const createUser = user => {
  sendJSON(user, "user", userOptions);
};

const repositoryOptions = createRequestOptions("repositories", "application/vnd.scmm-repository+json;v=2");
export const createRepository = repository => {
    sendJSON(repository, "repository", repositoryOptions);
};

const groupOptions = createRequestOptions("groups", "application/vnd.scmm-group+json;v=2");
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
