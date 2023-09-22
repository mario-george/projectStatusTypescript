namespace App {
  export class ProjectInput {
    templateEl: HTMLTemplateElement;
    element: HTMLFormElement;
    appEl: HTMLDivElement;
    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    peopleInput: HTMLInputElement;
    constructor() {
      this.templateEl = document.getElementById(
        "project-input"
      )! as HTMLTemplateElement;
      this.appEl = document.getElementById("app")! as HTMLDivElement;
      let importedNode = document.importNode(this.templateEl.content, true);
      this.element = importedNode.firstElementChild as HTMLFormElement;
      this.element.id = "user-input";
      this.titleInput = this.element.querySelector(
        "#title"
      )! as HTMLInputElement;
      this.descriptionInput = this.element.querySelector(
        "#description"
      )! as HTMLInputElement;
      this.peopleInput = this.element.querySelector(
        "#people"
      )! as HTMLInputElement;
      this.config();
      this.attach();
    }
    private attach() {
      // private methods can't be called outside so i can call it in the constructor
      this.appEl.insertAdjacentElement("afterbegin", this.element);
    }
    @AutoBind
    private submitHandler(event: Event) {
      event.preventDefault();
      // here without bind this from event Listener the this will refer to the event not the object/instance
      let resultOfGathering = this.gatherUserInput();
      if (resultOfGathering) {
        // get ul element and add the list

        console.log(this.titleInput.value);
        console.log(this.peopleInput.value);
        console.log(this.descriptionInput.value);
        projectStateInstance.addProject(
          this.titleInput.value,
          this.descriptionInput.value,
          +this.peopleInput.value
        );
        console.log(this.clearInputFields());
      } else {
        return;
      }
    }
    private config() {
      this.element.addEventListener("submit", this.submitHandler);
      // this.element.addEventListener("submit", this.submitHandler.bind(this));
    }
    private gatherUserInput(): [string, string, number] | void {
      let t = this.titleInput.value;
      let d = this.descriptionInput.value;
      let p = +this.peopleInput.value;
      const titleValidationObj: ValidationInterface = {
        value: t,
        required: true,
      };
      const descriptionValidationObj: ValidationInterface = {
        value: d,
        required: true,
        minLength: 5,
      };
      const peopleValidationObj: ValidationInterface = {
        value: p,
        required: true,
        min: 1,
        max: 5,
      };
      let titleValidation = validate(titleValidationObj);
      let descriptionValidation = validate(descriptionValidationObj);
      let peopleValidation = validate(peopleValidationObj);
      /* // old validation
        if (
          t.trim().length === 0 ||
          d.trim().length === 0 ||
          p.toString().trim().length === 0
        ) {
          alert("Invalid user input please try again");
          return;
        }
        return [t, d, p];
       */

      if (!titleValidation || !descriptionValidation || !peopleValidation) {
        alert("Invalid user input please try again");
        return;
      } else {
        return [t, d, p];
      }
    }
    private clearInputFields() {
      this.titleInput.value = "";
      this.descriptionInput.value = "";
      this.peopleInput.value = "";
    }
  }
}
