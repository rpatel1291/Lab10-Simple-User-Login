const uuid = require("node-uuid");
const bcrypt = require("bcrypt-nodejs");

const salt = bcrypt.genSaltSync(16);

const users = [{
        //Sherlock
        _id: uuid.v4(),
        username: "masterdetective123",
        hashPassword: bcrypt.hashSync("elementartmydearwatson", salt), // null, function(err, result) { if (err) throw "err";  }),
        profession: "Detective",
        bio: 'Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a "consulting detective" in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.',
        firstname: "Sherlock",
        lastname: "Holmes",
    },
    {
        //Elizabeth
        _id: uuid.v4(),
        username: "lemon",
        hashPassword: bcrypt.hashSync("damnyoujackdonaghy", salt), //, null, function(err) { if (err) throw "error"; }),
        firstname: "Elizabeth",
        lastname: "Lemon",
        profession: "Writer",
        bio: 'Elizabeth Miervaldis "Liz" Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.'
    },
    {
        //Harry
        _id: uuid.v4(),
        username: "theboywholived",
        hashPassword: bcrypt.hashSync("quidditch", salt), // null, function(err) { if (err) throw "error"; }),
        firstname: "Harry",
        lastname: "Potter",
        profession: "Student",
        bio: 'Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry\'s struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.'
    }
];

const exportedMethods = {
    authenticateUser(enteredUserName, enteredPassword) {
        if (enteredUserName === "" || enteredPassword === "") {
            return false;
        } else {
            users.forEach((user) => {
                if (user.username === enteredUserName) {
                    if (bcrypt.compareSync(enteredPassword, user.hashPassword)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            })
            return false;
        }
    },
    getUserInfo(enteredUserName) {
        if (enteredUserName === "") throw "Invalid Username";
        users.forEach((user) => {
            if (user.username === enteredUserName) {
                let resultUser = {
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    profession: user.profession,
                    bio: user.bio
                };
                return resultUser;
            }
        })
        return {};
    }


};

module.exports = exportedMethods;