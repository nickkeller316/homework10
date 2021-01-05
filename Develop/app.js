//Manager class, imported from the lib directory
const Manager = require("./lib/Manager");
//Engineer class, imported from the lib directory
const Engineer = require("./lib/Engineer");
//Intern class, imported from the lib directory
const Intern = require("./lib/Intern");
//dependencies, see package.json
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//via path dependency, this says essentially "in the output directory (__dirname), create a file called team.html 
//(htmlRenderer and html Templates will provide the code for said file)"
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//html renderer
const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//array which we will push the team members to
const teamMembers = [];
//this function will allow the user to choose which role they have via inquirer choices
function createTeam() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Which type of team member are you?',
                name: 'choice',
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "I do not want to add any more team members",
                ]
            }
        ])
        //depending on which role the user choose, the respective inquirer prompt function will run 
        .then(function(answer) {
            switch (answer.choice) {
                case "Manager":
                    managerQuestions();
                    break;
                case "Engineer":
                    engineerQuestions();
                    break;
                case "Intern":
                    internQuestions();
                    break;
                default: 
                    buildTeam();
            }
        });
}
//inquirer questions for the manager role, we call this function to start the application. We assume the manager will enter the information for the teamMembers
//if a intern or engineer wants to enter their information themselves, they will just have to enter their managers information first (a "varification", if you will)
function managerQuestions() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is your name?',
                name: 'name',
            },
            {
                type: 'input',
                message: 'What is your id number?',
                name: 'id',
            },
            {
                type: 'input',
                message: 'What is your email address?',
                name: 'email',
            },
            {
                type: 'input',
                message: 'What is your officeNumber?',
                name: 'officeNumber',
            }
        ])
        //.then function that creates a manager variable under the Manager class (new constructor)
        //this manager, that was just inputted by the user, is then pushed to the teamMembers array
        //we run createTeam() so the user can input another employee
        .then(function(answers) {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            teamMembers.push(manager);
            createTeam();
        });
}
//same logic as managerQuestions()
function engineerQuestions() {
    inquirer 
        .prompt([
            {
                type: 'input',
                message: 'What is your name?',
                name: 'name',
            },
            {
                type: 'input',
                message: 'What is your id number?',
                name: 'id',
            },
            {
                type: 'input',
                message: 'What is your email address?',
                name: 'email',
            },
            {
                type: 'input', 
                message: 'What is your github username?',
                name: 'github',
            }
        ])
        .then(function(answers) {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            teamMembers.push(engineer);
            createTeam();
        });
}

//same logic as managerQuestions()
function internQuestions() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is your name?',
                name: 'name',
            },
            {
                type: 'input',
                message: 'What is your id number?',
                name: 'id',
            },
            {
                type: 'input',
                message: 'What is your email address?',
                name: 'email',
            },
            {
                type: 'input',
                message: 'What school did you attend?',
                name: 'school',
            }
        ])
        .then(function(answers) {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            teamMembers.push(intern);
            createTeam();
        });
}
//this creates the html file in the output directory (or creates the directory if it is not there)
function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    //teamMembers is the information that is rendered the the html 
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

//We run the managerQuestions (inquirer prompt) function 1st to kick off the application. 
//We do this because we assume the manager will be the one inputting the team members, but via the createTeam() function, any employee can enter their information 
managerQuestions();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
