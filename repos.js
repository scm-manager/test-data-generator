import { adjectives } from "./adjectives";
import { people } from "./people";
import * as scmClient from "./scm";

const types = [
    "git", "svn", "hg"
];

const createRepository = () => {
    const adjective = pickRandom(adjectives);
    const person = pickRandom(people);
    const contact = `${adjective}.${person.name}@scm-manager.org`;
    const type = pickRandom(types);
    return {
        name: person.name,
        namespace: adjective,
        description: person.description,
        contact,
        type
    };
};

const pickRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

export const createRepositories = () => {
    for (let i=0; i<256; i++) {
        const repository = createRepository();
        scmClient.createRepository(repository);
    }
};