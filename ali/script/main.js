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
  var store = {};
  var Sidebar = new Vue({
    el: '#sidebar',
    data: {
      ich: json,
      mindex: -1,
      nindex: -1
    },
    methods: {
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

