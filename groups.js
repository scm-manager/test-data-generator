import { names } from "./marvel";
import * as scmClient from "./scm";
import { people } from "./people";
import { adjectives } from "./adjectives";
import {createUsername} from "./users";


const createGroup = name => {
    const person = pickRandom(people);
    const adjective = pickRandom(adjectives) +'_' + name + "-Group";

    let members = new Array();
    for (let i = 0; i < 10; i++) {
        members.push(createUsername(names[Math.floor(Math.random() * names.length)]));
    };
    return {
        name: adjective,
        description: `This group is founded by the following person: ${person.description}`,
        members: members
    };
};

const pickRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

export const createGroups = () => {
    for (let name of names) {
        const group = createGroup(name);
        scmClient.createGroup(group);
    }
};