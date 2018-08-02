import { names } from "./marvel";
import * as scmClient from "./scm";
import { people } from "./people";
import { adjectives } from "./adjectives";

const createGroup = (value) => {
    const adjective = pickRandom(adjectives) + "-group"+value;
    const person = pickRandom(people);
    let members = new Array();
    for (let i = 0; i < 10; i++) {
        members.push(names[Math.floor(Math.random() * names.length)]);
    };
    return {
        name: adjective,
        description: `This group includes fans of ${person.description}`,
        members: members
    };
};

const pickRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

export const createGroups = () => {
    for (let i=0; i<256; i++) {
        const group = createGroup(i);
        scmClient.createGroup(group);
    }
};