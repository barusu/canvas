(function(scope) {
  var Demo = new Vue({
    el: '#app_add',
    data: {
      form: {
        name: '',
        department_id: '',
        code: ''
      },
      formRules: {
        name: [{required: true, trigger: 'blur'}],
        department_id: [{required: true, trigger: 'change'}],
        code: [{required: true, trigger: 'blur'}],
      }
    },
    methods: {
    },
    mounted() {
    }
  });
})(window);