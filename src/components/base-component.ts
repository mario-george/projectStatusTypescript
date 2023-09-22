namespace App {

    // we add abstract so we cant instaniate it but only use it for inheritance of classes
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
      console.log(hostElementId);
      this.hostEl = document.getElementById(hostElementId)! as T;
      let importedNode = document.importNode(this.templateEl.content, true);
      this.element = importedNode.firstElementChild as U;
      if (newElementId) {
        this.element.id = newElementId;
      }
      console.log(this.element);
  
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
}