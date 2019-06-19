<template>
    <div class="page_display_dark" v-show="visible">
        <core-unit v-for="(item,index) in nodeList"
                   @toggleChildren="toggleUnit"
                   :node="item"
                   :key="index">
        </core-unit>
        <div class="tool">
            <div @click="zoomOut" class="tool-item">
                <i class="iconfont icon-zoom-out"></i></div>
            <div @click="zoomIn" class="tool-item">
                <i class="iconfont icon-zoom-in"></i></div>
            <div @click="visible = false" class="tool-item">
                退出
            </div>
        </div>
    </div>
</template>
<script>
    import coreUnit from "./core-unit.vue";
    import MindmapStyle from "./mindmapStyle";

    export default {
        data() {
            return {
                treeBoard: null,


                visible: false,
                zoom: 10,
                fullScreen: true,
                tool: true,
            }
        },
        components: {
            "core-unit": coreUnit,
        },
        computed: {
            nodeList() {
                return this.treeBoard ? this.treeBoard.nodeList : [];
            }
        },
        methods: {
            zoomOut() {
                if (this.zoom <= 6) {
                    return;
                }
                this.zoom = this.zoom - 2;
                this.treeBoard.formatStyle(this.zoom);
            },

            zoomIn() {
                if (this.zoom >= 20) {
                    return;
                }
                this.zoom = this.zoom + 2;
                this.treeBoard.formatStyle(this.zoom);
            },

            toggleUnit(node) {
                node.data.childrenShow = !node.data.childrenShow;

                let treeBoard = new MindmapStyle();
                treeBoard.nodeList = this.nodeList;
                treeBoard.toggleNode(node, node.data.childrenShow);

                this.treeBoard = treeBoard;
            },
        },
    }
</script>
<style lang="scss" scoped>
    @import "../../style/common/var";

    .tool {
        position: absolute;
        right: $space-large;
        top: $space-xl;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: $background-color-dark;
        border-radius: $corner-mini;

        .tool-item {
            padding: $space-small;
            cursor: pointer;
        }
    }
</style>