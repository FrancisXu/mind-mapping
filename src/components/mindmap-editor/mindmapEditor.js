import EditorModel from "./editorModel";
import verify from "../../build/common/verify"

class MindmapEditor {
    constructor(nodeList) {
        this._nodeList = nodeList ? nodeList : [];
    }

    get nodeList() {
        return this._nodeList;
    }

    set nodeList(nodeList) {
        this._nodeList = nodeList ? nodeList : [];
    }

    // 初始化节点信息
    // 必须字段 nodeId,parentId
    // 计算字段 index,sequence

    initNodeData(nodeList) {
        if (!nodeList) return false;
        if (nodeList.length === 0) return false;

        nodeList = JSON.parse(JSON.stringify(nodeList));

        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].nodeId === undefined || nodeList[i].parentId === undefined) {
                return false;
            }
        }

        this.nodeList = nodeList.map((nodeData) => {
            // 判断数据格式，如果 data，parent，children同时存在并且格式正确，直接返回
            if (nodeData.data && nodeData.parent && nodeData.children) {
                if (verify.dataType(nodeData.data) === "object"
                    && verify.dataType(nodeData.parent) === "object"
                    && verify.dataType(nodeData.children) === "array") {
                    return nodeData;
                }
            }

            return {
                data: new EditorModel(nodeData),
                parent: null,
                children: [],
            };
        });

        this.initNodeList();
    }

    initNodeList() {
        if (this.nodeList.length === 0) return;

        for (let i = 0; i < this.nodeList.length; i++) {
            this.renderNodeChildren(this.nodeList[i]);
            this.renderNodeParent(this.nodeList[i]);
            if (!this.nodeList[i].data.index) {
                this.initNodeIndex(this.nodeList[i].data.nodeId);
            }
        }

        this.nodeList.forEach((nodeData) => {
            if (nodeData.data.sequence === undefined || nodeData.data.sequence === null) {
                if (nodeData.data.parentId !== null) {
                    let sequence = this.initNodeSequence(nodeData);
                    if (verify.dataType(sequence) === "number") {
                        nodeData.data.sequence = sequence;
                    } else {
                        return;
                    }
                } else {
                    nodeData.data.sequence = 0;
                }
            }
        });
    }

    initNodeIndex(nodeId) {
        let nodeData = this.nodeList.find((item) => {
            return item.data.nodeId === nodeId;
        });

        if (!nodeData) {
            for (let i = this.nodeList.length - 1; i >= 0; i--) {
                if (this.nodeList[i].data.parentId === nodeId) this.nodeList.splice(i, 1);
            }
            return;
        }

        if (nodeData.data.index !== undefined && nodeData.data.index !== null) return nodeData.data.index;

        if (nodeData.data.parentId) {
            let parentIndex = this.initNodeIndex(nodeData.data.parentId);
            if (parentIndex) {
                nodeData.data.index = parentIndex + 1;
            } else {
                return;
            }
        } else {
            nodeData.data.index = 1;
        }

        return nodeData.data.index;
    }

    initNodeSequence(nodeData) {
        let parentData = this.nodeList.find((item) => {
            return item.data.nodeId === nodeData.data.parentId;
        });

        if (!parentData) return;

        return parentData.children.findIndex((childData) => {
            return childData.nodeId === nodeData.data.nodeId;
        });
    }

    // 同步Node的children
    renderNodeChildren(parentNode) {
        parentNode.children.splice(0, parentNode.children.length);

        this.nodeList.forEach(function (node) {
            if (node.data.parentId === parentNode.data.nodeId) {
                parentNode.children.push(node.data);
            }
        });
    }

    // 同步Node的parent
    renderNodeParent(childNode) {
        if (childNode.data.index === 1) {
            childNode.parent = null;
            return;
        }
        for (let i = 0; i < this.nodeList.length; i++) {
            let nodeData = this.nodeList[i].data;
            if (childNode.data.parentId === nodeData.nodeId) {
                childNode.parent = nodeData;
                break;
            }
        }
    }

    // 获取同层级的所有node
    getNodeByIndex(index) {
        let temp = [];
        this.nodeList.forEach(function (node) {
            if (node.data.index === index) {
                temp.push(node);
            }
        });
        return temp;
    }

    // 根据id获取node
    getNodeById(nodeId) {
        if (nodeId) {
            let nodeList = this.nodeList;
            for (let i = 0; i < nodeList.length; i++) {
                if (nodeList[i].data.nodeId === nodeId) {
                    return nodeList[i];
                }
            }
        }
    }

    toggleNode(node, toggle) {
        let that = this;
        this.nodeList.forEach(function (nodeStorage) {
            for (let i = 0; i < node.children.length; i++) {
                if (nodeStorage.data.nodeId === node.children[i].nodeId) {
                    nodeStorage.data.show = toggle;
                    nodeStorage.data.childrenShow = true;
                    if (nodeStorage.children.length > 0) {
                        that.toggleNode(nodeStorage, toggle);
                    }
                    break;
                }
            }
        })
    }

    //新增node
    addNode(node) {
        this.nodeList.push(node);
        this.initNodeList();
    }

    deleteNode(nodeId) {
        let index = this.nodeList.findIndex(function (node) {
            if (node.data.nodeId === nodeId) {
                return true;
            }
        });
        this.nodeList.splice(index, 1);
        this.initNodeList();
    }
}

export default MindmapEditor;
