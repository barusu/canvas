/**
 * Ali
 * 2018-11-01
 */
(function(scope) {
  const json = [
    {
      id: '1',
      icon: 'icon-circlefill',
      label: '测试条目1',
      children: [
        {
          id: '11',
          label: '测试条目1-1',
          children: [
            {
              id: '111',
              label: '测试条目1-1-1',
              action: ''
            }
          ]
        }, {
          id: '12',
          label: '测试条目1-2',
          children: [
            {
              id: '121',
              label: '测试条目1-2-1',
              action: ''
            }
          ]
        }, {
          id: '13',
          label: '测试条目1-3',
          children: [
            {
              id: '131',
              label: '测试条目1-3-1',
              action: ''
            }, {
              id: '132',
              label: '测试条目1-3-2',
              action: ''
            }
          ]
        }
      ]
    }, {
      id: '2',
      icon: 'icon-emojiflashfill',
      label: '测试条目2',
      children: [
        {
          id: '21',
          label: '测试条目2-1',
          children: [
            {
              id: '211',
              label: '测试条目2-1-1',
              action: ''
            }
          ]
        }
      ]
    }
  ];
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
      if(c) {
        c.forEach(ci => {
          findChild(ci);
        });
        i.children = c;
      }
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
      ich: json,
      mindex: -1,
      nindex: -1
    },
    methods: {
      loadData() {
        $.get(' https://easy-mock.com/mock/59a8fa924006183e48efd0e3/demo/nav', data => {
          this.ich = assembleTree(data);
          console.log(this.ich);
        }, 'json');
      },
      selectmain(index) {
        this.mindex = index;
        this.nindex = -1;
      },
      selectnav(index) {
        this.nindex = index;
      },
      close() {
        this.mindex = -1;
        this.nindex = -1;
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
    }
  });
})(window);

