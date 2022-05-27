/* This is importing the classes from the other files. */
const Intern = require("./users/Intern");
const Engineer = require("./users/Engineer");
const Manager = require("./users/Manager");
const render = require("./users/htmlRender");

/* This is importing the classes from the other files. */
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const OutDirectory = path.resolve(__dirname, "assets");
const OutPath = path.join(OutDirectory, "team.html");

/* This is creating two empty arrays. One is for the index and the other is for the members. */
const index = [];
const Member = [];

/**
 * A function that asks the user what type of team member they would like to add.
 */
function TeamBuilder() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "chooseMember",
        choices: ["Intern", "Engineer", "Manager",],
      },
    ])
    .then((choices) => {
      if (choices.chooseMember == "Manager") {
        GenManager();
      } else if (choices.chooseMember == "Engineer") {
        GenEngineer();
      } else if (choices.chooseMember == "Intern") {
        GenIntern();
      } else {
        GenHTML();
      }
    });
};

/**
 * This function is used to create an intern object and push it to the Member array.
 */
 function GenIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "intName",
          message: "Enter interns name.",
          validate: (name_) => {
            if (name_) {
              return true;
            } else {
              console.log("Please enter valid information. ");
              return false;
            }
          },
        },
        {
  
          type: "input",
          name: "internID",
          message: "Enter interns ID",
          validate: (id) => {
            if (id) {
              return true;
            } else {
              console.log("Please enter intern ID");
            }
          },
        },
  
        {
          type: "input",
          name: "email",
          message: "Intern's email?",
          validate: (email_) => {
            if (email_) {
              return true;
            } else {
              console.log("Please enter valid email. ");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "school",
          message: "What school did the intern attend?",
          validate: (offNum1) => {
            if (offNum1) {
              return true;
            } else {
              console.log("Please valid school name");
            }
          },
        },
      ])
      .then((answer) => {
        const intern = new Intern(
          answer.intName,
          answer.internID,
          answer.email,
          answer.school
        );
        Member.push(intern);
        index.push(answer.internID);
        TeamBuilder();
      });
  };

  /**
 * The function prompts the user to enter the engineer's name, ID, email, and GitHub username. 
 * 
 * The function then creates a new Engineer object and pushes it to the Member array. 
 * 
 * The function then pushes the engineer's ID to the index array. 
 * 
 * The function then calls the TeamBuilder function.
 */
function GenEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engName",
          message: "What's your engineer's name?",
          validate: (name_) => {
            if (name_) {
              return true;
            } else {
              console.log("Please enter a valid engineer's name. ");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "engID",
          message: "What's your engineer's ID?",
          validate: (id) => {
            if (id) {
              return true;
            } else {
              console.log("Please enter a engineer's ID");
            }
          },
        },
        {
          type: "input",
          name: "email",
          message: "Enter email of engineer?",
          validate: (email_) => {
            if (email_) {
              return true;
            } else {
              console.log("Enter valid email of engineer. ");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "gitHub",
          message: "Enter engineer gitHub name?",
          validate: (gitHub) => {
            if (gitHub) {
              return true;
            } else {
              console.log("Enter engineer number");
            }
          },
        },
      ])
      .then((answer) => {
        const engineer = new Engineer(
          answer.engName,
          answer.engID,
          answer.email,
          answer.gitHub
        );
        Member.push(engineer);
        index.push(answer.managerID);
        TeamBuilder();
      });
  }

/**
 * This function is used to create a new manager object and push it to the Member array.
 */
function GenManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "Please type out managers name?",
        validate: (name_) => {
          if (name_) {
            return true;
          } else {
            console.log("Invalid manager name. Please try again.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "managerID",
        message: "Please type out managers ID?",
        validate: (id) => {
          if (id) {
            return true;
          } else {
            console.log("Please enter proper manager's ID");
          }
        },
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What's your manager's email?",
        validate: (email_) => {
          if (email_) {
            return true;
          } else {
            console.log("Please enter a valid manager's email. ");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "offNum",
        message: "What the manager's office number?",
        validate: (offNum1) => {
          if (offNum1) {
            return true;
          } else {
            console.log("Please enter a manager's office number");
          }
        },
      },
    ])
    .then((answer) => {
      const manager = new Manager(
        answer.managerName,
        answer.managerID,
        answer.email,
        answer.offNum
      );
      Member.push(manager);
      index.push(answer.managerID);
      TeamBuilder();
    });
};


function GenHTML() {
  console.log("Completed Team generation!");
  fs.writeFileSync(OutPath, render(Member), "UTF-8");
}

TeamBuilder();
