class editorData {
    constructor(object) {
        if (object) {
            this._nodeId = object.nodeId ? object.nodeId : null;
            this._nodeName = object.nodeName ? object.nodeName : "";
            this._sequence = Number(object.sequence) ? Number(object.sequence) : null;
            this._parentId = object.parentId ? object.parentId : null;
            this._index = object.index ? object.index : null;
            this._show = object.show ? object.show : true;
            this._childrenShow = object.childrenShow ? object.childrenShow : true;
        }
    }

    get nodeId() {
        return this._nodeId;
    }

    set nodeId(nodeId) {
        this._nodeId = nodeId ? nodeId : {};
    }

    get nodeName() {
        return this._nodeName;
    }

    set nodeName(nodeName) {
        this._nodeName = nodeName ? nodeName : "";
    }

    get sequence() {
        return this._sequence;
    }

    set sequence(sequence) {
        this._sequence = sequence ? sequence : 0;
    }

    get parentId() {
        return this._parentId;
    }

    set parentId(parentId) {
        this._parentId = parentId ? parentId : 0;
    }

    get index() {
        return this._index;
    }

    set index(index) {
        this._index = index ? index : 0;
    }

    get show() {
        return this._show;
    }

    set show(show) {
        this._show = show ? show : 0;
    }

    get childrenShow() {
        return this._childrenShow;
    }

    set childrenShow(childrenShow) {
        this._childrenShow = childrenShow ? childrenShow : 0;
    }
}

export default editorData;