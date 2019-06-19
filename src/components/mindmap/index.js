import mindMap from './mindmap';

/* istanbul ignore next */
mindMap.install = function (Vue) {
    Vue.component(mindMap.name, mindMap);
};

export default mindMap;

