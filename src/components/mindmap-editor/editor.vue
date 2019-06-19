<template>
    <div class="paper">
        <editor-unit v-for="(node,index) in nativeDataList"
                     v-if="node.data.index===1"
                     :key="index"
                     :nodeList="nativeDataList"
                     :node="node"
                     @addNode="addNode"
                     @addChildNode="addChildNode"
                     @deleteNode="deleteNode"
                     @updateNode="updateNode">
        </editor-unit>
    </div>
</template>
<script>
    import editorUnit from "./editor-unit.vue";
    import EditorModel from "./editorModel";
    import MindmapEditor from "./mindmapEditor";

    export default {
        name: "mind-map-editor",
        data() {
            return {}
        },
        computed: {
            nativeDataList() {
                let dataList = [];
                if (this.dataList) {
                    let mindMapEditor = new MindmapEditor(this.dataList);
                    mindMapEditor.initNodeData(this.dataList);
                    dataList = mindMapEditor.nodeList;
                }
                return dataList;
            }
        },
        props: {
            dataList: {},
        },
        mounted: function () {
        },
        methods: {
            addNode(nodeData) {
                let nodeList = this.nodeList, node;
                for (let i = 0; i < nodeList.length; i++) {
                    if (nodeList[i].data.nodeId === nodeData.parentId) {
                        node = nodeList[i];
                    }
                }

                let newNodeData = new EditorModel({
                    nodeId: (new Date()).getTime(),
                    nodeName: "",
                    index: nodeData.index + 1,
                    sequence: node.children.length,
                    parentId: nodeData.parentId,
                });

                this.$emit("addNode", newNodeData);
            },

            addChildNode(nodeData) {
                let newNodeData = new EditorModel({
                    nodeId: (new Date()).getTime(),
                    nodeName: "",
                    index: nodeData.index + 1,
                    sequence: nodeData.children ? nodeData.children.length : 0,
                    parentId: nodeData.nodeId,
                });

                this.$emit("addNode", newNodeData);
            },

            deleteNode(nodeData) {
                this.$emit("deleteNode", nodeData);
            },

            updateNode(nodeData) {
                console.log(nodeData);
                this.$emit("updateNode", nodeData);
            },
        },
        watch: {},
        components: {
            "editor-unit": editorUnit
        },
    }
</script>
<style lang="scss" scoped>
    @import "../../style/common/var";

</style>