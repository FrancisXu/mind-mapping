import mindmap from './mindmap';
import mindmapEditor from './mindmap-editor';

const components = [
    mindmap,
    mindmapEditor
];

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '2.5.4',
    install,
    mindmap,
    mindmapEditor,
};

