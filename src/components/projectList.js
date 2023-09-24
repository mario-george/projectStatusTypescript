var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '../components/base-component';
import { ProjectItem } from '../components/projectItem';
import AutoBind from '../decorators/autobind';
import { ProjectStatus } from '..//models/project';
import { projectStateInstance, ProjectState } from '../state/projectState';
export class ProjectList extends Component {
    dragLeave(_) {
        let ul = this.element.querySelector("ul");
        ul.classList.remove("droppable");
    }
    dragOver(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] == "text/plain") {
            event.preventDefault();
            let ul = this.element.querySelector("ul");
            if (!ul.classList.contains("droppable")) {
                ul.classList.add("droppable");
                console.log(event);
            }
        }
    }
    drop(event) {
        let id = event.dataTransfer.getData("text/plain");
        const projectStateInstance = ProjectState.getInstance();
        projectStateInstance.moveProject(id, this.type == "active" ? ProjectStatus.Active : ProjectStatus.Finished);
        console.log(id);
    }
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.renderItems();
        this.configure();
    }
    configure() {
        this.element.addEventListener("drop", this.drop);
        this.element.addEventListener("dragover", this.dragOver);
        this.element.addEventListener("dragleave", this.dragLeave);
        projectStateInstance.addListener((projects) => {
            console.log(projects);
            console.log("asdasdsadsad");
            this.element.querySelector("ul").innerHTML = "";
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
    renderProjects() {
        for (const prjItem of this.assignedProjects) {
            const p = new ProjectItem(prjItem, this.element.querySelector("ul").id);
            p.renderContent();
        }
    }
    renderContent() { }
    renderItems() {
        let id = `${this.type}-projects-list`;
        console.log(this.element);
        this.element.querySelector("ul").id = id;
        let h2 = this.element.querySelector("h2");
        h2.textContent = `${this.type.toUpperCase()} Projects`;
    }
}
__decorate([
    AutoBind
], ProjectList.prototype, "dragLeave", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dragOver", null);
__decorate([
    AutoBind
], ProjectList.prototype, "drop", null);
//# sourceMappingURL=projectList.js.map