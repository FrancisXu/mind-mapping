<template>
    <div class="unit" :style="nodeStyle" v-show="node.data.show">
        <div class="inLine" :style="inLineStyle"></div>

        <hr class="outLine" :style="outLineStyle">

        <div class="addButton" @click="toggleChildren()" v-if="node.children.length>0"
             :style="addButtonStyle">
            <i class="el-icon-circle-plus-outline">
            </i>
        </div>

        <div class="unit-main" :style="unitMainStyle">
            {{node.data.nodeName}}
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                unitWidth: 100,
                unitHeight: 60,

                unitBorderWidth: 2,
                connectLineWidth: 2,

                buttonSideLength: 18,
            }
        },
        created(){

        },
        props: {
            node: {
                default: {}
            },
        },
        computed: {
            nodeStyle() {
                return {
                    top: this.node.data.top + "px",
                    left: this.node.data.left + "px",
                    width: this.unitWidth + "px",
                    height: this.unitHeight + "px",
                };
            },

            unitMainStyle() {
                return {
                    lineHeight: "36px",
                    height: "40px",
                    top: (this.unitHeight - 40) / 2 + "px",
                    borderWidth: this.unitBorderWidth + "px"
                }
            },

            inLineStyle() {
                let style = {};

                if (!this.node.parent) {
                    return {
                        display: "none"
                    };
                }
                let parentNode = this.node.parent,
                    node = this.node.data,
                    borderRadius = 10,
                    height, width, top, left;

                width = (node.left - parentNode.left - this.unitWidth - this.connectLineWidth) / 2 + this.connectLineWidth;
                left = -width;

                if (parentNode.top === node.top) {
                    top = (this.unitHeight - this.connectLineWidth) / 2;

                    style = {
                        top: top + "px",
                        left: left + "px",
                        width: width + "px",
                        height: this.connectLineWidth + "px",
                        borderWidth: "1px"
                    };
                }

                if (parentNode.top > node.top) {
                    height = parentNode.top - node.top + this.connectLineWidth;
                    top = (this.unitHeight - this.connectLineWidth) / 2;

                    style = {
                        top: top + "px",
                        left: left + "px",
                        width: width + this.connectLineWidth + "px",
                        //borderLeft没有颜色导致边线下端不平整，+connectLineWidth使线条延伸到unit主体下方
                        height: height + "px",
                        borderTopLeftRadius: borderRadius + "px",
                        borderBottomColor: "transparent",
                        borderRightColor: "transparent",
                    };
                }

                if (parentNode.top < node.top) {
                    height = node.top - parentNode.top + this.connectLineWidth;
                    top = -(height - this.connectLineWidth / 2 - this.unitHeight / 2);

                    style = {
                        top: top + "px",
                        left: left + "px",
                        width: width + this.connectLineWidth + "px",
                        height: height + "px",
                        borderWidth: this.connectLineWidth + "px",
                        borderBottomLeftRadius: borderRadius + "px",
                        borderTopColor: "transparent",
                        borderRightColor: "transparent",
                    };
                }
                return style;
            },

            outLineStyle() {
                if (!this.node.children.length > 0) {
                    return {
                        display: "none"
                    };
                }
                if (!this.node.data.childrenShow) {
                    return {
                        display: "none"
                    };
                }

                let childNode = this.node.children,
                    width = (childNode[0].left - this.node.data.left - this.unitWidth - this.connectLineWidth) / 2;//+1为不足避免计算中四舍五入导致缺失1像素

                return {
                    top: (this.unitHeight - this.connectLineWidth) / 2 + "px",
                    left: this.unitWidth + this.buttonSideLength + "px",
                    width: width - this.buttonSideLength + "px",
                    height: this.connectLineWidth + "px",
                }
            },

            addButtonStyle() {
                return {
                    top: (this.unitHeight - this.buttonSideLength) / 2 + "px",
                    left: this.unitWidth + "px",
                    width: this.buttonSideLength + "px",
                    height: this.buttonSideLength + "px",
                };
            },
        },
        mounted() {
        },
        methods: {
            toggleChildren() {
                this.$emit("toggleChildren", this.node);
            },
        },
        watch: {},
    }
</script>

<style lang="scss" scoped>
    @import "../../style/common/var";

    $unitWidth: 100px;
    $unitHeight: 60px;
    $buttonSideLength: 18px;

    .unit {
        position: absolute;
        z-index: 20;

        .unit-main {
            width: 100%;
            position: absolute;
            text-align: center;
            border-radius: 10px;
            border: 2px solid $border-color-medium;
            color: $font-color-primary;
            background: $background-color-medium;
        }
        .addButton {
            position: absolute;
            top: $unitHeight - $buttonSideLength;
            left: $unitWidth;
            width: $buttonSideLength;
            height: $buttonSideLength;
            overflow: hidden;
            .el-icon-circle-plus-outline {
                font-size: 18px;
                font-weight: bold;
                color: $dark-font-color-primary;
                background-color: transparent;
            }
        }
        .inLine {
            position: absolute;
            background-color: transparent;
            border: 2px solid $dark-border-color-medium;
        }
        .outLine {
            position: absolute;
            background-color: $dark-border-color-medium;
            border: none;
        }
    }
</style>