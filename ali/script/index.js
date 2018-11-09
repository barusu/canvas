/**
 * Ali
 * 2018-11-01
 */
(function(scope) {
  // var json = null;
  function assembleTree(data) {
    var t = [];
    var list = data.map(i => {
      return {
        id: i.id,
        icon: i.icon,
        label: i.name,
        action: i.url,
        parentId: i.parentId
      };
    });

    function findChild(i) {
      var c = list.filter(c => c.parentId == i.id);
      if(c && c.length) {
        i.terminal = false;
        var f = false;
        c.forEach(ci => {
          var cf = findChild(ci);
          if(cf) f = true;
        });
        i.children = c;
        i.ismenu = f;
        return true;
      }
      i.terminal = true;
      return false;
    }

    list.forEach(i => {
      if(!i.parentId) {
        findChild(i);
        t.push(i);
      }
    });
    return t;
  }
  var store = {};
  var Sidebar = new Vue({
    el: '#sidebar',
    data: {
      ich: [],
      open: false,
      mindex: -1,
      nindex: -1,
      acmindex: -1
    },
    methods: {
      loadData() {
        if(scope.json && Array.isArray(scope.json)) {
          this.ich = assembleTree(scope.json);
        }else {
          $.get(' https://easy-mock.com/mock/59a8fa924006183e48efd0e3/demo/nav', data => {
            this.ich = assembleTree(data);
          }, 'json');
        }
      },
      selectmain(index) {
        this.mindex = index;
        this.nindex = -1;
      },
      selectnav(index) {
        this.nindex = index;
      },
      opensidebar() {
        if(this._timeout) {
          clearTimeout(this._timeout);
          this._timeout = null;
        }
        this.open = true;
      },
      closesidebar() {
        this.mindex = -1;
        this.nindex = -1;
        this.open = false;
        this._timeout = null;
      },
      close() {
        if(this._timeout) clearTimeout(this._timeout);
        this._timeout = setTimeout(this.closesidebar, 500);
      },
      open(i) {
        if(i.action) {
          this.acmindex = this.mindex;
          this.close();
          var f = document.getElementById('iframe');
          if(f) f.src = i.action;
        }
      }
    },
    computed: {
      ni() {
        if(this.mindex !== -1 && this.ich[this.mindex]) {
          if(Array.isArray(this.ich[this.mindex].children)) {
            return this.ich[this.mindex].children;
          }else {
            return [];
          }
        }
        return [];
      },
      san() {
        if(this.nindex !== -1 && this.ni[this.nindex]) {
          if(Array.isArray(this.ni[this.nindex].children)) {
            return this.ni[this.nindex].children;
          }else {
            return [];
          }
        }
        return [];
      },
      NavTerminal() {
        if(this.mindex !== -1 && this.ich[this.mindex] && !this.ich[this.mindex].ismenu) return true;
        return false;
      }
    },
    mounted() {
      this.loadData();
    }
  });
  var Header = new Vue({
    el: '#header',
    data: {
      user_switch: false
    },
    methods: {
      notify(option) {
        if(!option.offset) option.offset = 40;
        if(option.duration !== 0) option.showClose = false;
        return this.$notify(option);
      },
      message(option) {
        if(typeof(option) === typeof('x')) option = {message: option };
        if(option.duration === 0 && !('showClose' in option)) option.showClose = true;
        if(option.type == 'loading') {
          option.customClass = 'el-message-loading';
          option.iconClass = "iconfont icon-loading";
          option.duration = 0;
          option.showClose = false;
        }
        return this.$message(option);
      }
    }
  });
  scope.App = Header;
})(window);

