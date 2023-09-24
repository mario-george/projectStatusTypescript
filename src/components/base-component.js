export class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.insertAtStart = insertAtStart;
        this.templateEl = document.getElementById(templateId);
        console.log(hostElementId);
        this.hostEl = document.getElementById(hostElementId);
        let importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        console.log(this.element);
        this.attach(insertAtStart);
    }
    attach(insertAtStart) {
        this.hostEl.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
    }
}
//# sourceMappingURL=base-component.js.map