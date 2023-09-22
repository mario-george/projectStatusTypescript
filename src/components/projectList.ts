namespace App {
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: Project[] = [];

    @AutoBind
    dragLeave(_: DragEvent): void {
      let ul = this.element.querySelector("ul")!;
      ul.classList.remove("droppable");
    }
    @AutoBind
    dragOver(event: DragEvent): void {
      if (event.dataTransfer && event.dataTransfer.types[0] == "text/plain") {
        // the def of drag/drop is not allow to drop
        event.preventDefault();
        let ul = this.element.querySelector("ul")!;
        if (!ul.classList.contains("droppable")) {
          ul.classList.add("droppable");
          console.log(event);
        }
      }
    }
    @AutoBind
    drop(event: DragEvent): void {
      let id = event.dataTransfer!.getData("text/plain");
      const projectStateInstance = ProjectState.getInstance();
      projectStateInstance.moveProject(
        id,
        this.type == "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );

      console.log(id);
    }

    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);

      // get the first import node
      // section eleement

      this.renderItems();
      this.configure();
    }
    configure() {
      this.element.addEventListener("drop", this.drop);
      this.element.addEventListener("dragover", this.dragOver);
      this.element.addEventListener("dragleave", this.dragLeave);
      projectStateInstance.addListener((projects: Project[]) => {
        console.log(projects);
        console.log("asdasdsadsad");
        this.element.querySelector("ul")!.innerHTML = "";
        const relevantProjects = projects.filter((prj) => {
          if (this.type === "active") {
            return prj.status === ProjectStatus.Active;
          }
          return prj.status === ProjectStatus.Finished;
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }
    private renderProjects(): void {
      for (const prjItem of this.assignedProjects) {
        const p = new ProjectItem(
          prjItem,
          this.element.querySelector("ul")!.id
        );
        p.renderContent();
      }
    }
    renderContent() {}

    private renderItems() {
      let id = `${this.type}-projects-list`;
      console.log(this.element);
      this.element.querySelector("ul")!.id = id;
      let h2 = this.element.querySelector("h2")!;
      h2.textContent = `${this.type.toUpperCase()} Projects`;
    }
  }
}
