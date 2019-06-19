class TreeBoard {
    constructor(nodeList) {
        this._nodeList = nodeList ? nodeList : [];
    }

    get nodeList() {
        return this._nodeList;
    }

    set nodeList(nodeList) {
        this._nodeList = nodeList ? nodeList : [];
    }

    //整理所有节点信息
    dataFormat() {
        let nodeList = this.nodeList;

        for (let i = 0; i < nodeList.length; i++) {
            this.renderNodeChildren(nodeList[i]);
            this.renderNodeParent(nodeList[i]);
        }
    }

    formatStyle(scale) {
        this.dataFormat();
        if (!scale) {
            scale = 10;
        }

        let that = this,
            nodeList = this.nodeList,
            boardWidth = 1500 * scale / 10,
            boardHeight = 800 * scale / 10,
            regionWidth = 200 * scale / 10,
            regionHeight = 80 * scale / 10,
            itemWidth = 100,
            itemHeight = 60,
            maxIndex = 0; //node总层级数

        nodeList.forEach(function (node) {
            maxIndex = node.data.index > maxIndex ? node.data.index : maxIndex;
        });

        let globalWidth = maxIndex * regionWidth,
            startLeft;

        startLeft = boardWidth - globalWidth > 200 ? (boardWidth - globalWidth) / 2 : 100;

        for (let i = 1; i <= maxIndex; i++) {
            let temp = this.getNodeByIndex(i);

            for (let j = 0; j < temp.length; j++) {
                temp[j].data.left = startLeft + (i - 1) * regionWidth - itemWidth / 2;
            }
        }

        //计算节点包含的最终end节点的数量推算节点所需宽度
        for (let i = maxIndex; i >= 1; i--) {
            let nodeArr = this.getNodeByIndex(i);
            for (let j = 0; j < nodeArr.length; j++) {
                let node = this.getNodeById(nodeArr[j].data.nodeId);

                if (node.children.length === 0) {
                    node.data.endNum = 1;
                } else {
                    node.data.endNum = 0;
                    for (let k = 0; k < node.children.length; k++) {
                        node.data.endNum += node.children[k].endNum
                    }
                }
            }
        }

        let maxEndNum = this.getNodeByIndex(1)[0].data.endNum,//end节点总数
            globalTop,
            globalHeight = regionHeight * maxEndNum;//region总高度

        if (globalHeight > boardHeight) {
            globalTop = 0;
        } else {
            globalTop = (boardHeight - globalHeight) / 2
        }

        let nodeIndexArr = this.getNodeByIndex(1);

        nodeIndexArr[0].data.top = globalTop + (nodeIndexArr[0].data.endNum / 2) * regionHeight - itemHeight / 2;

        getTop(2, nodeIndexArr[0].data.nodeId, 0);

        //计算节点top
        function getTop(index, nodeId, sequence) {
            if (index > maxIndex) {
                return;
            }
            let nodeIndexArr = that.getNodeByIndex(index), nodeSeqArr = [];

            for (let i = 0; i < nodeIndexArr.length; i++) {
                if (nodeIndexArr[i].parent.nodeId === nodeId) {
                    nodeSeqArr[Number(nodeIndexArr[i].data.sequence)] = nodeIndexArr[i];
                }
            }
            for (let i = 0; i < nodeSeqArr.length; i++) {
                //sequence决定起始位置，childrenNum确定该支点权重
                nodeSeqArr[i].data.top = globalTop + (nodeSeqArr[i].data.endNum / 2 + sequence) *
                    regionHeight - itemHeight / 2;
                nodeSeqArr[i].parent = that.getNodeById(nodeSeqArr[i].parent.nodeId).data;
                getTop(index + 1, nodeSeqArr[i].data.nodeId, sequence);
                sequence += nodeSeqArr[i].data.endNum;
            }
        }
    }

    //同步Node的children
    renderNodeChildren(parentNode) {
        parentNode.children.splice(0, parentNode.children.length);

        this.nodeList.forEach(function (node) {
            if (node.data.parentId === parentNode.data.nodeId) {
                parentNode.children.push(node.data);
            }
        });
    }

    //同步Node的parent
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

    //获取同层级的所有node
    getNodeByIndex(index) {
        let temp = [];
        this.nodeList.forEach(function (node) {
            if (node.data.index === index) {
                temp.push(node);
            }
        });
        return temp;
    }

    //根据id获取node
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
        this.dataFormat();
    }

    deleteNode(nodeId) {
        let index = this.nodeList.findIndex(function (node) {
            if (node.data.nodeId === nodeId) {
                return true;
            }
        });
        this.nodeList.splice(index, 1);
        this.dataFormat();
    }
}

export default TreeBoard;
