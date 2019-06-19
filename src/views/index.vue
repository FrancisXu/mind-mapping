<template>
    <div class="index">
        <header>
            <div class="header-title">
                <h4>思维导图</h4>
            </div>
            <div class="header-tool">
                <i @click="openMindMap" class="iconfont icon-tree-map"></i>
            </div>
        </header>
        <mind-map-editor
                class="mindMapEditor"
                @addNode="addNode"
                @updateNode="updateNode"
                @deleteNode="deleteNode"
                :dataList="dataList">
        </mind-map-editor>
        <mind-map :visible.sync="mindmapVisible"
                  :dataList="dataList">
        </mind-map>
    </div>
</template>
<script>
    import cityData from "./cityData";

    export default {
        data() {
            return {
                dataList: cityData,
                mindmapVisible: false,
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            openMindMap() {
                this.mindmapVisible = true;
            },

            addNode(nodeData) {
                this.dataList.push({
                    nodeId: nodeData.nodeId,
                    nodeName: nodeData.nodeName,
                    index: nodeData.index,
                    sequence: nodeData.sequence,
                    parentId: nodeData.parentId,
                });
            },

            updateNode(nodeData) {
                let index = this.dataList.findIndex((item) => {
                    return item.nodeId === nodeData.nodeId;
                });
                this.dataList[index] = {
                    nodeId: nodeData.nodeId,
                    nodeName: nodeData.nodeName,
                    index: nodeData.index,
                    sequence: nodeData.sequence,
                    parentId: nodeData.parentId,
                };
            },

            deleteNode(nodeData) {
                let index = this.dataList.findIndex((item) => {
                    return item.nodeId === nodeData.nodeId;
                });
                this.dataList.splice(index, 1);
            }
        }
    }
</script>
<style lang="scss">
    @import "../style/index";

    .index {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        .mindMapEditor {
            margin: 3rem auto;
        }
    }
</style>