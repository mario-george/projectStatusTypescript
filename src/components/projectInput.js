var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { validate } from '../util/validator';
import AutoBind from '../decorators/autobind';
import { projectStateInstance } from '../state/projectState';
export class ProjectInput {
    constructor() {
        this.templateEl = document.getElementById("project-input");
        this.appEl = document.getElementById("app");
        let importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        this.titleInput = this.element.querySelector("#title");
        this.descriptionInput = this.element.querySelector("#description");
        this.peopleInput = this.element.querySelector("#people");
        this.config();
        this.attach();
    }
    attach() {
        this.appEl.insertAdjacentElement("afterbegin", this.element);
    }
    submitHandler(event) {
        event.preventDefault();
        let resultOfGathering = this.gatherUserInput();
        if (resultOfGathering) {
            console.log(this.titleInput.value);
            console.log(this.peopleInput.value);
            console.log(this.descriptionInput.value);
            projectStateInstance.addProject(this.titleInput.value, this.descriptionInput.value, +this.peopleInput.value);
            console.log(this.clearInputFields());
        }
        else {
            return;
        }
    }
    config() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    gatherUserInput() {
        let t = this.titleInput.value;
        let d = this.descriptionInput.value;
        let p = +this.peopleInput.value;
        const titleValidationObj = {
            value: t,
            required: true,
        };
        const descriptionValidationObj = {
            value: d,
            required: true,
            minLength: 5,
        };
        const peopleValidationObj = {
            value: p,
            required: true,
            min: 1,
            max: 5,
        };
        let titleValidation = validate(titleValidationObj);
        let descriptionValidation = validate(descriptionValidationObj);
        let peopleValidation = validate(peopleValidationObj);
        if (!titleValidation || !descriptionValidation || !peopleValidation) {
            alert("Invalid user input please try again");
            return;
        }
        else {
            return [t, d, p];
        }
    }
    clearInputFields() {
        this.titleInput.value = "";
        this.descriptionInput.value = "";
        this.peopleInput.value = "";
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=projectInput.js.map