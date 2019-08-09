function MapManager(cellManager, elements) {
    this.elements = elements;
    this.cellManager = cellManager;
}

MapManager.prototype = {

    addElement(element) {
        this.elements.push(element);
    },

    getElement({ x, y }) {
        return this.elements.find(function (element) {
            const elementPos = element.getPosition();
            return elementPos.x === x && elementPos.y === y;
        });
    },

    removeElement(removingElement) {
        this.elements = this.elements.filter(element => element !== removingElement);
    },

    flush() {
        this.cellManager.draw();
        this.elements.forEach(function (element) {
            element.draw();
        });
    }

};