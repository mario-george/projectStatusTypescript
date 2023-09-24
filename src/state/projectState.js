import { Project, ProjectStatus } from "../models/project";
export class ProjectState {
    constructor() {
        this.projects = [];
        this.listeners = [];
    }
    addProject(title, description, people) {
        const project = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);
        this.projects.push(project);
        this.updateListeners();
        return;
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addListener(listener) {
        this.listeners.push(listener);
    }
    moveProject(prjId, status) {
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
            listener(this.projects.slice());
        }
    }
}
export const projectStateInstance = ProjectState.getInstance();
//# sourceMappingURL=projectState.js.map