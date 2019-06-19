import mindMapEditor from "./editor.vue";

/* istanbul ignore next */
mindMapEditor.install = function (Vue) {
    Vue.component(mindMapEditor.name, mindMapEditor);
};

export default mindMapEditor;