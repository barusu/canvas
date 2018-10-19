var json = {
  list: [
    {
      id: 1,
      x: 0,
      y: 0,
      w: 4,
      h: 10,
      bg: '#fc605d',
      type: 'oo-iframe',
      option: ''
    }, {
      id: 2,
      x: 5,
      y: 0,
      w: 4,
      h: 10,
      bg: '#fdbc40',
      type: 'oo-iframe',
      option: ''
    }, {
      id: 3,
      x: 0,
      y: 11,
      w: 6,
      h: 40,
      bg: '#34c849',
      type: 'oo-sunburst',
      option: ''
    }
  ],
  decor: [
    {
      id: 1,
      x: '400px',
      y: '350px',
      w: '500px',
      h: '500px',
      type: 'oo-sunburst',
      option: ''
    }
  ]
};

(function(scope) {
  var App = new Vue({
    el: '#main',
    data: {
      list: [],
      decor: []
    },
    computed: {
      List() {
        var ubw = Math.floor(this.$el.clientWidth / 12);
        return this.list.map(i => {
          return {
            id: i.id,
            type: i.type,
            option: i.option,
            style: {
              top: i.y * 10 + 'px',
              left: i.x * ubw + 'px',
              width: i.w * ubw + 'px',
              height: i.h * 10 + 'px',
              background: i.bg
            }
          };
        });
      },
      Decor() {
        return this.decor.map(i => {
          return {
            id: i.id,
            type: i.type,
            option: i.option,
            style: {
              top: i.y,
              left: i.x,
              width: i.w,
              height: i.h,
              background: i.bg
            }
          };
        });
      }
    },
    mounted() {
      this.list = json.list;
      this.decor = json.decor;
    }
  });
})(window);