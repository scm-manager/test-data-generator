import { names } from "./marvel";
import * as scmClient from "./scm";

export const createUsername = name => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[\s+\(\):]/g, "_")
    .replace(/__/g, "_")
    .replace(/^_/g, "")
    .replace(/_$/, "");
};

const createUserObject = name => {
  const username = createUsername(name);
  return {
    name: username,
    displayName: name,
    mail: `${username}@marvel.com`,
    password: "marvelHero123",
    active: true,
    admin: false
  };
};

export const createUsers = () => {
    for (let name of names) {
        const user = createUserObject(name);
        scmClient.createUser(user);
    }
};


