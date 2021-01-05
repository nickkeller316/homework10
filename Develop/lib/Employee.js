// TODO: Write code to define and export the Employee class
//this is the parent class, so Manager, Engineer, and Intern will also have the name, id, and email parameters
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    //we have these functions to obtain the name, id, and email that the user enters
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return "Employee";
    }
}
//to be used in app.js
module.exports = Employee;