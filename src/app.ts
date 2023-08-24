interface ValidationInterface {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
// adding a ? to min:number makes it min:number|undefined
function validate(validationObject: ValidationInterface) {
  const { value } = validationObject;
  let isValid = true;
  if (validationObject.required && (value == null || value == undefined)) {
    // isValid = isValid && !!value;
    isValid = false;
  }
  if (typeof value == "string" && validationObject.minLength != null) {
    // if it is a number i ignore because it doesn't make sense
    isValid = isValid && value.trim().length > validationObject.minLength;
  }
  if (typeof value == "string" && validationObject.maxLength != null) {
    // if it is a number i ignore because it doesn't make sense
    isValid = isValid && value.trim().length < validationObject.maxLength;
  }
  // if min is 0 validationObject.min won't execute so use !=null
  if (typeof value == "number" && validationObject.min != null) {
    // if it is a number i ignore because it doesn't make sense
    isValid = isValid && value > validationObject.min;
  }
  if (typeof value == "number" && validationObject.max != null) {
    // if it is a number i ignore because it doesn't make sense
    isValid = isValid && value < validationObject.max;
  }
  return isValid;
}
function AutoBind(
  // target: any,
  // MethodName: string,
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
) {
  // unused parameters will give error either set noUnusedParameters :false
  // or name them with _ and _2
  const originalMethod = descriptor.value;
  const adjustedDescriptor = {
    enumerable: false,
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
}
class ProjectInput {
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
    this.titleInput = this.element.querySelector("#title")! as HTMLInputElement;
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
      console.log(this.titleInput.value);
      console.log(this.peopleInput.value);
      console.log(this.descriptionInput.value);
      this.clearInputFields();
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

    if (
      t.trim().length === 0 ||
      d.trim().length === 0 ||
      p.toString().trim().length === 0
    ) {
      alert("Invalid user input please try again");
      return;
    }
    return [t, d, p];
  }
  private clearInputFields() {
    this.titleInput.value = "";
    this.descriptionInput.value = "";
    this.peopleInput.value = "";
  }
}
const p = new ProjectInput();
