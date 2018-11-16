// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import AppStartScreen from './components/StartScreen'
import AppResultScreen from './components/ResultScreen'
import AppQuestion from './components/Question'
import AppMessage from './components/Message'

Vue.component('AppStartScreen', AppStartScreen);
Vue.component('AppResultScreen', AppResultScreen);
Vue.component('AppQuestion', AppQuestion);
Vue.component('AppMessage', AppMessage);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
