namespace App {
   export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Dragable
{
  private project: Project;

  pEl: HTMLParagraphElement;
  h3El: HTMLHeadingElement;
  h2El: HTMLHeadingElement;

  constructor(project: Project, hostId: string) {
    super("single-project", hostId, false);
    this.project = project;
    // console.log(id)
    console.log(hostId);
    this.pEl = this.element.querySelector("p")! as HTMLParagraphElement;
    this.h3El = this.element.querySelector("h3")! as HTMLHeadingElement;
    this.h2El = this.element.querySelector("h2")! as HTMLHeadingElement;
    this.configure();
    this.renderContent();
    this.element.draggable = true;
  }
  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  @AutoBind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }
  @AutoBind
  dragEndHandler(event: DragEvent): void {
    console.log(event);
  }
  renderContent(): void {
    this.pEl.textContent = this.project.description;
    this.h2El.textContent = this.project.title;
    let endOfSentence =
      this.project.people == 1
        ? " Person Assigned"
        : (" Persons Assigned" as string);
    this.h3El.textContent = this.project.people.toString() + endOfSentence;
  }
}

}