import Vue from "vue";
import core from "./core.vue";
import MindmapStyle from "./mindmapStyle";

export default {
    name: "mind-map",
    render(h) {
        return h;
    },
    data() {
        return {
            coreComponent: null,
        }
    },
    props: {
        visible: {
            type: Boolean,
            default: true,
        },
        dataList: {
            type: Array,
        },
    },
    created() {
        this.coreComponent = new Vue(core).$mount();
    },
    mounted() {
        document.querySelector('body').appendChild(this.coreComponent.$el);
        this.initNodeData();
    },
    methods: {
        initNodeData() {
            if (this.dataList) {
                let treeBoard = new MindmapStyle();
                treeBoard.initNodeData(this.dataList);
                treeBoard.formatStyle(this.coreComponent.zoom);
                this.coreComponent.treeBoard = treeBoard;
            }
        }
    },
    beforeDestroy() {
        document.querySelector('body').removeChild(this.coreComponent.$el);
    },
    watch: {
        dataList: {
            handler(value) {
                this.initNodeData();
            },
            deep: true,
        },
        visible: {
            handler(value) {
                this.coreComponent.visible = value;
            }
        },
        "coreComponent.visible": {
            handler(value) {
                this.$emit("update:visible", value);
            }
        }
    }
}