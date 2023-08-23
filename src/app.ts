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
    this.descriptionInput = this.element.querySelector("#description")! as HTMLInputElement;
    this.peopleInput = this.element.querySelector("#people")! as HTMLInputElement;
   
    this.config();
    this.attach();
  }
  private attach() {
    // private methods can't be called outside so i can call it in the constructor
    this.appEl.insertAdjacentElement("afterbegin", this.element);
  }
  private submitHandler(event: Event) {
    event.preventDefault();
    // here without bind this from event Listener the this will refer to the event not the object/instance
    console.log(this.titleInput.value);
    console.log(this.peopleInput.value);
    console.log(this.descriptionInput.value);
  }
  private config() {
    // this.element.addEventListener("submit", this.submitHandler);
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }
}
const p = new ProjectInput();
