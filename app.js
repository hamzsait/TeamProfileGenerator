const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const optionQuestions = [
    {
        type: 'list',
        name: 'option',
        message: "Would you like to add an Engineer or an Intern?",
        choices: ['ADD INTERN','ADD ENGINEER','ALL DONE']
    },
]
const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter Manager Name:',
        validate: ((userData) => {
        return userData.length < 1 ? console.log('Please enter a name.') : true
        })
    },
    {
        type: 'input',
        name: 'id',
        message: 'Enter Manager ID:',
        validate: ((userData) => {
            return userData.length < 1 ? console.log('Please enter an ID number.') : true
        })
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter Manager email:',
        validate: ((userData) => {
            return userData.length < 1 ? console.log('Please enter an email.') : true
        })
    },
    {
        type: 'input',
        name: 'officeNum',
        message: 'Enter Manager office number:',
        validate: ((userData) => {
            return userData.length < 1 ? console.log('Please enter an office number.') : true
        })
    },
]
const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter Engineer Name:',
        validate: ((userData) => {
        return userData.length < 1 ? console.log('Please enter a name.') : true
        })
    },
    {
        type: 'input',
        name: 'id',
        message: 'Enter Engineer ID:',
        validate: ((userData) => {
            return userData.length < 1 ? console.log('Please enter an ID number.') : true
        })
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter Engineer email:',
        validate: ((userData) => {
            return userData.length < 1 ? console.log('Please enter an email.') : true
        })
    },
    {
        type: 'input',
        name: 'gitHub',
        message: 'Enter Engineer Git Hub username:',
        validate: ((userData) => {
            return userData.length < 1 ? console.log('Please enter a username.') : true
        })
    },
]
const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter Intern Name:',
        validate: ((userData) => {
        return userData.length < 1 ? console.log('Please enter a name.') : true
        })
    },
    {
        type: 'input',
        name: 'id',
        message: 'Enter Intern ID:',
        validate: ((userData) => {
            return userData.length < 1 ? console.log('Please enter an ID number.') : true
        })
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter Intern email:',
        validate: ((userData) => {
            return userData.length < 1 ? console.log('Please enter an email.') : true
        })
    },
    {
        type: 'input',
        name: 'school',
        message: 'Enter Intern School:',
        validate: ((userData) => {
            return userData.length < 1 ? console.log('Please enter a School.') : true
        })
    },
]


async function getOptions(){
    let output
    await inquirer.prompt(optionQuestions).then(
        answers => output = answers
    )
    return output
}
async function getManager(){
    let output
    await inquirer.prompt(managerQuestions).then(
        answers => output = answers 
    )
    return output
}
async function getEngineer(){
    let output
    await inquirer.prompt(engineerQuestions).then(
        answers => output = answers 
    )
    return output
}
async function getIntern(){
    let output
    await inquirer.prompt(internQuestions).then(
        answers => output = answers 
    )
    return output
}

started = false
team = []
async function init(){

    if (!started){
        let manager = await getManager()
        started = true
        manager = new Manager(manager.name, manager.id, manager.email, manager.officeNum)
        team.push(manager)
        console.log("-------------------------------")
        console.log(`| Current team members include:`)
        for (member of team){
            console.log('| ' + member.getRole() + " : " + member.name)
        }
        console.log("-------------------------------")
    }
    else{
        console.log("-------------------------------")
        console.log(`| Current team members include:`)
        for (member of team){
            console.log('| ' + member.getRole() + " : " + member.name)
        }
        console.log("-------------------------------")
    }

    var selection = await getOptions()
    if (selection.option == "ALL DONE"){
        render(team)
        return
    }
    else if (selection.option == "ADD ENGINEER"){
        let engineer = await getEngineer()
        engineer = new Engineer(engineer.name, engineer.id, engineer.email, engineer.gitHub)
        team.push(engineer)
        init()
        return
    }
    else if (selection.option == "ADD INTERN"){
        let intern = await getIntern()
        intern = new Intern(intern.name, intern.id, intern.email, intern.school)
        team.push(intern)
        init()
        return
    }
}
init()

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
