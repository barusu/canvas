var json = {
  list: [
    {
      id: 1,
      x: 0,
      y: 0,
      w: 4,
      h: 10,
      bg: '#fc605d',
      type: 'iframe',
      url: 'https://www.baidu.com/'
    },
    {
      id: 2,
      x: 5,
      y: 0,
      w: 4,
      h: 10,
      bg: '#fdbc40',
      type: 'iframe',
      url: 'https://www.baidu.com/'
    }
  ]
};

(function(scope) {
  var App = new Vue({
    el: '#main',
    data: {
      list: []
    },
    computed: {
      List() {
        var ubw = Math.floor(this.$el.clientWidth / 12);
        return this.list.map(i => {
          return {
            id: i.id,
            style: {
              top: i.y * 10 + 'px',
              left: i.x * ubw + 'px',
              width: i.w * ubw + 'px',
              height: i.h * 10 + 'px',
              background: i.bg
            }
          };
        });
      }
    },
    mounted() {
      this.list = json.list;
    }
  });
})(window);