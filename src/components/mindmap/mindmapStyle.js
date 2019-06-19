import MindmapEditor from "../mindmap-editor/mindmapEditor";
import MindmapModel from "./model";

class mindmapStyle extends MindmapEditor {
    constructor(nodeList) {
        super(nodeList);
    }

    initNodeData(nodeList) {
        if (!nodeList) return false;
        if (nodeList.length === 0) return false;

        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].nodeId === undefined || nodeList[i].parentId === undefined) {
                return false;
            }
        }

        this.nodeList = nodeList.map((nodeData) => {
            return {
                data: new MindmapModel(nodeData),
                parent: null,
                children: [],
            };
        });

        this.initNodeList();
    }

    formatStyle(scale) {
        this.initNodeList();
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
}

export default mindmapStyle;
