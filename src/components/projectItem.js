var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "../components/base-component";
import AutoBind from "../decorators/autobind";
export class ProjectItem extends Component {
    constructor(project, hostId) {
        super("single-project", hostId, false);
        this.project = project;
        console.log(hostId);
        this.pEl = this.element.querySelector("p");
        this.h3El = this.element.querySelector("h3");
        this.h2El = this.element.querySelector("h2");
        this.configure();
        this.renderContent();
        this.element.draggable = true;
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(event) {
        console.log(event);
    }
    renderContent() {
        this.pEl.textContent = this.project.description;
        this.h2El.textContent = this.project.title;
        let endOfSentence = this.project.people == 1
            ? " Person Assigned"
            : " Persons Assigned";
        this.h3El.textContent = this.project.people.toString() + endOfSentence;
    }
}
__decorate([
    AutoBind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    AutoBind
], ProjectItem.prototype, "dragEndHandler", null);
//# sourceMappingURL=projectItem.js.map