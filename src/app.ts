enum ProjectStatus {
  Active,
  Finished,
}

interface Dragable{
  dragStartHandler(event:DragEvent):void;
  dragEndHandler(event:DragEvent):void;
}
interface DragTarget{
  dragOver(event:DragEvent):void;
  drop(event:DragEvent):void;
  dragLeave(event:DragEvent):void;
}
// we add abstract so we cant instaniate it but only use it for inheritance of classes
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateEl: HTMLTemplateElement;
  hostEl: T;
  element: U;
  constructor(
    templateId: string,
    hostElementId: string,
    public insertAtStart: boolean,
    newElementId?: string
  ) {
    // newElementId is optional if you want to add an id to the inserted Element
    this.templateEl = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostEl = document.getElementById(hostElementId)! as T;
    let importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    this.hostEl.insertAdjacentElement(
      insertAtStart ? "afterbegin" : "beforeend",
      this.element
    );
  }
// this will insure that any class that inherits this will need to apply both of these abstract methods
  abstract configure(): void;
  abstract renderContent(): void;
}
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Dragable {
  private project:Project

  pEl:HTMLParagraphElement; 
  h3El:HTMLHeadingElement
  h2El:HTMLHeadingElement
  
  constructor(project:Project,hostId:string) {
    super("single-project", hostId,false);
    this.project = project;
    // console.log(id)
    this.pEl=this.element.querySelector('p')! as HTMLParagraphElement;
    this.h3El=this.element.querySelector('h3')! as HTMLHeadingElement;
    this.h2El=this.element.querySelector('h2')! as HTMLHeadingElement;
this.configure();
this.renderContent();
  }
  configure(): void {

  }
  renderContent(): void {
    this.pEl.textContent=this.project.description;
    this.h2El.textContent=this.project.title;
    this.h3El.textContent=this.project.people.toString();
  }
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
type Listener = (projects: Project[]) => void;
class ProjectState {
  // we will make using static only one instace from this class
  private static instance: ProjectState;

  private constructor() {}

  private projects: Project[] = [];
  listeners: Listener[] = [];
  addProject(title: string, description: string, people: number) {
    const project = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );
    // const newProject = {
    //   id: Math.random().toString(),
    //   title,
    //   description,
    //   people,
    // };
    this.projects.push(project);
    for (const listener of this.listeners) {
      // execute each listener with the new array
      listener(this.projects.slice());
      // slice return a copy of the array because arrays are ref types
    }

    return;
    // return newProject;
  }
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }
  addListener(listener: Listener) {
    this.listeners.push(listener);
  }
}

const projectStateInstance = ProjectState.getInstance();

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
    console.log(1);
    isValid = false;
  }
  if (validationObject.minLength != null) {
    // if it is a number i ignore because it doesn't make sense

    isValid =
      isValid && value.toString().trim().length >= validationObject.minLength;
  }
  if (validationObject.maxLength != null) {
    // if it is a number i ignore because it doesn't make sense

    isValid =
      isValid && value.toString().trim().length <= validationObject.maxLength;
  }
  // if min is 0 validationObject.min won't execute so use !=null
  if (typeof value == "number" && validationObject.min != null) {
    // if it is a number i ignore because it doesn't make sense
    console.log(value >= validationObject.min);
    isValid = isValid && value >= validationObject.min;
  }
  if (typeof value == "number" && validationObject.max != null) {
    // if it is a number i ignore because it doesn't make sense
    console.log(value <= validationObject.max);

    isValid = isValid && value <= validationObject.max;
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

class ProjectList implements DragTarget {
  element: HTMLElement;
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  assignedProjects: Project[] = [];

  @AutoBind
dragLeave(event: DragEvent): void {

  let ul = this.element.querySelector('ul')!
ul.classList.remove("droppable")
  
}
@AutoBind
dragOver(event: DragEvent): void {
  let ul = this.element.querySelector('ul')!
  ul.classList.add("droppable")
    
}
@AutoBind
drop(event: DragEvent): void {
  
}


  constructor(private type: "active" | "finished") {
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    // get the first import node
    let importedNode = document.importNode(this.templateElement.content, true);
    // section eleement
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    this.attach();
    this.renderItems();
    this.configure()
    projectStateInstance.addListener((projects: Project[]) => {
      const ul = document.getElementById(`${this.type}-projects-list`)!;
      ul.innerHTML = "";

      for (let p of projects) {
        if (this.type == "active") {
          this.renderProjects(p);
        }
      }
    });
  }
  private configure(){
    document.addEventListener('drop',this.drop)
    document.addEventListener('dragover',this.dragOver)
    document.addEventListener('dragleave',this.dragLeave)
  }
  private renderProjects(project: Project): void {
    const p = new ProjectItem(project,this.element.querySelector('ul')!.id)
    p.renderContent()
    // console.log(this.element.id)
    // const ul = this.element.querySelector("ul")! as HTMLUListElement;
    // const el = document.createElement("li");
    // el.innerHTML = "";
    // el.textContent = project.title;
    // console.log(project);
    // ul.appendChild(el);
  }
  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
  private renderItems() {
    let id = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = id;
    let h2 = this.element.querySelector("h2")!;
    h2.textContent = `${this.type.toUpperCase()} Projects`;
  }
}
const p = new ProjectInput();
const active = new ProjectList("active");
const finished = new ProjectList("finished");
