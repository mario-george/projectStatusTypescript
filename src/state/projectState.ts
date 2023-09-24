import { Project, ProjectStatus } from "../models/project";
type Listener = (projects: Project[]) => void;
export class ProjectState {
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
    this.updateListeners();

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
  moveProject(prjId: string, status: ProjectStatus) {
    const p = this.projects.find((p) => {
      return p.id == prjId;
    });
    console.log(p);

    if (p) {
      p.status = status;
      console.log(p);
      this.updateListeners();
    }
  }
  updateListeners() {
    for (const listener of this.listeners) {
      // execute each listener with the new array
      listener(this.projects.slice());
      // slice return a copy of the array because arrays are ref types
    }
  }
}

export const projectStateInstance = ProjectState.getInstance();
