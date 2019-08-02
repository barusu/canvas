'use strict';

(function (scope) {
  var Demo = new Vue({
    el: '#demo',
    data: {
      form: {
        name: '',
        phone: ''
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      size: 100,
      currentPage: 1,
      total: 700
    },
    methods: {
      showDetail: function showDetail(i) {
        console.log(i);
      },
      sizeChange: function sizeChange(v) {
        console.log('\u6BCF\u9875 ' + v + ' \u6761');
      },
      currentChange: function currentChange(v) {
        console.log('\u5F53\u524D\u9875: ' + v);
      }
    }
  });
})(window);