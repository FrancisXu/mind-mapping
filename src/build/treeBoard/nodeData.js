class NodeData {
    constructor(object) {
        if (object) {
            this._nodeId = object.nodeId ? object.nodeId : 0;
            this._nodeName = object.nodeName ? object.nodeName : "";
            this._sequence = Number(object.sequence) ? Number(object.sequence) : 0;
            this._parentId = object.parentId ? object.parentId : 0;
            this._index = object.index ? object.index : 0;
            this._top = object.top ? object.top : 0;
            this._left = object.left ? object.left : 0;
            //拥有结束节点数，即该节点横线所占位置
            this._endNum = object.endNum ? object.endNum : 0;
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

    get top() {
        return this._top;
    }

    set top(top) {
        this._top = top ? top : 0;
    }

    get left() {
        return this._left;
    }

    set left(left) {
        this._left = left ? left : 0;
    }

    get endNum() {
        return this._endNum;
    }

    set endNum(endNum) {
        this._endNum = endNum ? endNum : 0;
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

export default NodeData;