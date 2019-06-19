import editorModel from "../mindmap-editor/editorModel";

class Model extends editorModel {
    constructor(object) {
        if (object) {
            super(object);

            this._top = object.top ? object.top : 0;
            this._left = object.left ? object.left : 0;
            //拥有结束节点数，即该节点横线所占位置
            this._endNum = object.endNum ? object.endNum : 0;
        }
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

}

export default Model;