(function(scope) {
  function getDefaultIndex() {
    return {
      chineseName: '',
      openProperty: '开放',
      shareProperty: '无条件共享',
      englishName: '',
      type: '',
      length: '',
      symbols: '否',
      isKey: '0',
      defaultValue: '',
      allowSpace: '1',
      remarks: '',
      dataFormat: ''
    };
  }

  function getResource(){
    return {
      chineseName:'',
      englishName:'',
      description:'',
      applicationSystem_id:'',
      abutments:'',
      amount:'',
      renewFrequency:'',
      renewFrequencyReason:'',
      remark:''
    }
  }

  var Add = new Vue({
    el: '#add',
    data: {
      step: 0,
      // step 1
      resource: getResource(),
      resourceRules: {
        chineseName: [{ required: true, trigger: 'blur'}],
        englishName: [{ required: true, trigger: 'blur'}],
        applicationSystem_id: [{ required: true, trigger: 'change'}],
        abutments: [{ required: true, trigger: 'change'}],
        amount: [{ required: true, trigger: 'change'}],
        renewFrequency: [{ required: true, trigger: 'change'}]
      },
      applicationSystems:[{"name":"数据治理系统","id":"1"}],
      abutments:[{"name":"库表对接","code":"database"},{"name":"excel文件","code":"excel"}],
      amounts:[{"name":"0~1千万","code":"1"}],
      renewFrequencys:[{"name":"天","code":"day"},{"name":"月","code":"month"},{"name":"年","code":"year"}],
      // step 2
      dataIndexs:[
        {
          chineseName: '',
          openProperty: '开放',
          shareProperty: '无条件共享',
          englishName: '122',
          type: '',
          length: '',
          symbols: '否',
          isKey: '0',
          defaultValue: '',
          allowSpace: '1',
          remarks: '',
          dataFormat: ''
        }, {
          chineseName: '',
          openProperty: '开放',
          shareProperty: '无条件共享',
          englishName: '222',
          type: 'INT',
          length: '66666',
          symbols: '否',
          isKey: '0',
          defaultValue: '',
          allowSpace: '1',
          remarks: '',
          dataFormat: ''
        }, {
          chineseName: '',
          openProperty: '开放',
          shareProperty: '无条件共享',
          englishName: '122',
          type: '',
          length: '',
          symbols: '否',
          isKey: '0',
          defaultValue: '',
          allowSpace: '1',
          remarks: '',
          dataFormat: ''
        }
      ],
      dataindex: getDefaultIndex(),
      dataindexRules: {
        chineseName: [{ required: true, trigger: 'blur'}],
        englishName: [{ required: true, trigger: 'blur'}],
        type: [{ required: true, trigger: 'change'}],
        length: [{ validator: (rule, value, callback) => {
          switch(Add.dataindex.type) {
            case 'VARCHAR':
            case 'INT':
            case 'BIGINT':
            case 'NUMERIC':
              if(value) callback();
              else callback(new Error('长度不能为空'));
              break;
            default:
              callback();
          }
        }, trigger: 'blur'}]
      },
      boolmap: {0: '否', 1: '是'},
      dialogFormVisible: false,
      dataFormatMap: {
        CHAR: 'C..',
        VARCHAR: 'C..',
        INT: 'n..',
        BIGINT: 'n..',
        NUMERIC: 'N..',
        YEAR: 'YYYY',
        DATE: 'YYYY-MM-DD',
        DATETIME: 'YYYY-MM-DD hh:mm:ss',
        TIMESTAMP: 'hh:mm:ss',
        TEXT: 'C..ul',
        BLOB: 'C..ul',
        DECIMAL: 'n..',
        DOUBLE: 'n..',
        FLOAT: 'n..',
        SMALLINT: 'n..',
        TINYINT: 'n..',
        VARBINARY: 'n..',
        LONGBLOB: 'C..ul',
        LONGTEXT: 'C..ul',
        MEDIUMTEXT: 'C..ul'
      }
    },
    methods: {
      next(formName) {
        this.$refs[formName].validate(valid => {
          if(valid) {
            this.step = 1;
          }else {
            return false;
          }
        });
      },
      pre() {
        this.step = 0;
      },
      addindex() {
        this.$forceUpdate();
        this.$refs.dialogform.validate(valid => {
          if(valid) {
            this.dataIndexs.push(this.dataindex);
            this.$refs.dialogform.clearValidate();
            // console.log(this.dataIndexs);
            this.$nextTick(() => {
              this.dataindex = getDefaultIndex();
            });
          }else return false;
        });
      },
      edit(s) {
        console.log(s);
        this.dataindex = this.dataIndexs[s.$index];
        this.dialogFormVisible = true;
      },
      deleterow(s) {
        this.dataIndexs.splice(s.$index, 1);
      },
      cknull(row, column, cellValue, index) {
        if(cellValue) return cellValue;
        else return this.$createElement('span', {class: 'h'}, '');
      },
      ckunique(row, column, cellValue, index) {
        var unique = 0;
        this.dataIndexs.forEach(i => {
          if(i[column.property] == cellValue) unique++;
        });
        if(unique > 1) {
          return this.$createElement('span', {class: 'unique'}, cellValue);
        }else if(cellValue) return cellValue;
        else return this.$createElement('span', {class: 'h'}, '');
      }
    },
    computed: {
      IndexType() {
        var tem = [];
        for(var k in this.dataFormatMap) {
          tem.push({name: k, value: k});
        }
        return tem;
      },
      ilength: {
        set: function(v) {
          this.dataindex.length = v;
        },
        get: function() {
          var v = this.dataindex.length;
          var max = 99999999, f, tem;
          switch(this.dataindex.type) {
            case 'VARCHAR': max = 6000; break;
            case 'INT': max = 200; break;
            case 'DOUBLE':
              max = 255;
              tem = v.split(',');
              v = tem[0];
              f = tem[1];
              break;
            case 'CHAR':
            case 'FLOAT':
              max = 255;
              tem = v.split(',');
              v = tem[0];
              f = tem[1];
              break;
            case 'LONGBLOB':
            case 'LONGTEXT':
            case 'TEXT':
            case 'MEDIUMTEXT': break;
            case 'SMALLINT':
            case 'BIGINT':
            case 'TINYINT': max = 255; break;
            case 'VARBINARY': max = 100; break;
            case 'NUMERIC':
              max = 65;
              tem = v.split(',');
              v = tem[0];
              f = tem[1];
              break;
            case 'DECIMAL':
              max = 65;
              tem = v.split(',');
              v = tem[0];
              f = tem[1];
              break;
            default:;
          }
          v = parseInt(v);
          if(isNaN(v)) { v = 0;}
          else if(v < 0) { v = 0;}
          else if(v > max) { v = max;}
          if(this.dataindex.type == 'NUMERIC' || this.dataindex.type == 'DOUBLE' || this.dataindex.type == 'FLOAT' || this.dataindex.type == 'DECIMAL') {
            f = parseInt(f);
            if(isNaN(f)) { f = 0;}
            else if(f < 0) { f = 0;}
            else if(f > v) { f = v;}
            v += ',' + f;
          }
          this.dataindex.length = v.toString();
          return this.dataindex.length;
        }
      },
      isKey: {
        get: function() {
          if(this.dataindex.isKey == '1') {return true; }
          else {return false; }
        },
        set: function(v) {
          if(v) {this.dataindex.isKey = '1'; }
          else {this.dataindex.isKey = '0'; }
        }
      },
      allowSpace: {
        get: function() {
          if(this.dataindex.allowSpace == '1') {return true; }
          else {return false; }
        },
        set: function(v) {
          if(v) {this.dataindex.allowSpace = '1'; }
          else {this.dataindex.allowSpace = '0'; }
        }
      },
      symbols: {
        get: function() {
          if(this.dataindex.symbols === '是') {return true; }
          else {return false; }
        },
        set: function(v) {
          if(v) {this.dataindex.symbols = '是'; }
          else {this.dataindex.symbols = '否'; }
        }
      },
      dataFormat() {
        var x = this.dataFormatMap[this.dataindex.type];
        if(x&&x.length == 3) {
          x += this.dataindex.length;
        }
        return x;
      }
    }
  });
})(window);