(function(scope) {
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
      showDetail(i) {
        console.log(i);
      },
      sizeChange(v) {
        console.log(`每页 ${v} 条`);
      },
      currentChange(v) {
        console.log(`当前页: ${v}`);
      }
    }
  });
})(window);