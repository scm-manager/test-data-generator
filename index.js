import {createUsers} from "./users";
import {createRepositories} from "./repos";

if ( process.argv.length >= 3 ) {
    const type = process.argv[2];
    switch (type) {
        case "users": {
            createUsers();
            break;
        }
        case "repositories": {
            createRepositories();
            break;
        }
        default:
            console.log("unknown type " + type);
    }
} else {
    console.log("please specify type of generated data: users or repositories");
}

