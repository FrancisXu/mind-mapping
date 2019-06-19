import Vue from 'vue';

const loading = function () {
	Vue.prototype.loading = function (targetName) {
		if (targetName) {
			return this.$loading({
				lock: true,
				text: "Loading",
				target: targetName
			});
		} else {
			return this.$loading({
				lock: true,
				text: "Loading"
			});
		}
	}
};

loading();
// export default loading;