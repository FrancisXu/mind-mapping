<template>
    <div>
        <div class="editor-unit" @mouseover="showIcon=true" @mouseout="showIcon=false">
            <div class="show" v-if="node.children.length>0">
                <i @click="childrenShow=!childrenShow"
                   v-show="childrenShow&&showIcon" class="el-icon-minus"></i>
                <i @click="childrenShow=!childrenShow"
                   v-show="!childrenShow&&showIcon" class="el-icon-plus"></i>
            </div>
            <el-popover popper-class="editor-unit-popover" placement="bottom" trigger="click">
                <div class="popover-container">
                    <div class="popover-item" @click="addChildNode(node.data)">新增</div>
                    <div class="popover-item" @click="deleteNode(node.data)">删除</div>
                    <!--<div class="popover-item" v-show="!descriptionShow" @click="descriptionShow=true">编辑描述-->
                    <!--</div>-->
                    <!--<div class="popover-item" v-show="descriptionShow" @click="descriptionShow=false">隐藏描述-->
                    <!--</div>-->
                </div>
                <div slot="reference" class="name-dot-container" @mouseover="dotShadow=true"
                     @mouseout="dotShadow=false">
                    <div class="name-dot-shadow" v-show="dotShadow"></div>
                    <div class="name-dot"></div>
                </div>
            </el-popover>
            <div class="name-content" @blur="nameBlur"
                 contenteditable="true" @keydown="unitKeyDown($event,node.data)"
                 v-text="node.data.nodeName" spellcheck="false">
            </div>
            <div class="name-description" v-show="descriptionShow"
                 contenteditable="true" @blur="descriptionBlur"
                 v-text="node.data.nodeName" spellcheck="false">
            </div>
        </div>
        <div class="children-container">
            <editor-unit v-if="node.children.length>0"
                         v-show="childrenShow"
                         @addNode="addNode"
                         @addChildNode="addChildNode"
                         @deleteNode="deleteNode"
                         @updateNode="updateNode"
                         v-for="(privateNode,index) in nativeNodeList"
                         :key="index"
                         :nodeList="nodeList"
                         :node="privateNode">
            </editor-unit>
        </div>
    </div>
</template>
<script>
    import editorUnit from "./editor-unit.vue";

    export default {
        name: "editor-unit",
        data() {
            return {
                showIcon: false,
                dotShadow: false,
                descriptionShow: false,
                childrenShow: true,
            }
        },
        props: {
            nodeList: {},
            node: {
                default: {}
            },
        },
        computed: {
            nativeNodeList() {
                let result = [];

                this.node.children.forEach(function (item) {
                    let node = this.nodeList.find(function (node) {
                        if (node.data.nodeId === item.nodeId) {
                            return true
                        }
                    });
                    if (node) {
                        result.push(node);
                    }
                }.bind(this));

                return result;
            }
        },
        mounted() {
        },
        methods: {
            unitKeyDown(event, nodeData) {
                if (event.keyCode === 13 && event.ctrlKey) {
                    event.preventDefault();
                    this.addNode(nodeData);
                }
            },

            addNode(nodeData) {
                this.$emit("addNode", nodeData);
            },

            addChildNode(nodeData) {
                this.$emit("addChildNode", nodeData);
            },

            deleteNode(nodeData) {
                this.$emit("deleteNode", nodeData);
            },

            updateNode(nodeData) {
                this.$emit("updateNode", nodeData);
            },

            nameBlur($event) {
                this.node.data.nodeName = $event.target.innerText;
                this.$emit("updateNode", this.node.data);
            },
            descriptionBlur($event) {
                this.node.data.nodeName = $event.target.innerText;
            },
        },
        watch: {
            "node.data"(value) {
                this.updateNode(value);
            }
        },
        components: {
            "editor-unit": editorUnit
        },
    }
</script>
<style lang="scss" scoped>
    @import "../../style/common/var";
    @import "../../style/common/function";

    $unitLength: 24px;

    .editor-unit {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        position: relative;

        .show {
            width: $unitLength/4*3;
            height: $unitLength/4*3;
            left: -$unitLength/4*3;
            top: 0;
            text-align: center;
            line-height: $unitLength;
            position: absolute;
            i {
                cursor: pointer;
                font-weight: bold;
            }
        }

        .name-dot-container {
            position: relative;
            width: $unitLength;
            height: $unitLength;
            cursor: pointer;

            .name-dot {
                width: $unitLength/4;
                height: $unitLength/4;
                top: $unitLength/8*3;
                left: $unitLength/8*3;
                background-color: $font-color-primary;
                border-radius: $corner-circle;
                margin-right: $space-small;
                position: absolute;
            }
            .name-dot-shadow {
                width: $unitLength/6*5;
                height: $unitLength/6*5;
                top: $unitLength/12;
                left: $unitLength/12;
                background-color: $font-color-disabled;
                border-radius: $corner-circle;
                margin-right: $space-small;
                position: absolute;
            }
        }

        .name-content {
            width: calc(100% - 40px);
            @include font-size-large;
            color: $font-color-title;
            line-height: 24px;
        }

        .name-description {
            width: 100%;
            padding-left: $unitLength;
            @include font-size-medium;
            color: $font-color-secondary;
        }
    }

    .children-container {
        margin-left: $unitLength/2;
        padding-left: $unitLength/4*3;
        border-left: $border-medium;
    }

</style>
<style lang="scss">
    @import "../../style/common/var";
    @import "../../style/common/function";

    .editor-unit-popover {
        min-width: 120px;
        .popover-container {
            width: 100px;
            text-align: center;
            .popover-item {
                padding: $space-mini 0;
                cursor: pointer;
            }
        }
    }
</style>