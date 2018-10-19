/**
 * Layout
 * 2018-10-15
 */
(function(scope) {
  var Xc = {
    _sequence: 0,
    set sequence(x) {
      this._sequence = this._sequence < x ? x : this._sequence;
    },
    get sequence() {
      return ++this._sequence;
    }
  };
  // 矩阵
  var matrix = {
    arr: [],
    getPointInMatrix(w, h, block) {
      var poi = 0, x, y, t;
      while(true) {
        if(this.arr[poi]) {
          x = 0;
          if(this.arr[poi].some((n, i) => {
            if(n === 0) x++;
            else x = 0;
            if(x >= w) {
              y = 1;
              outer:
              while(true) {
                if(y >= h) {
                  x = ++i;
                  return true;
                }
                if(this.arr[poi + y]) {
                  for(t = 0; t < w; t++) {
                    if(this.arr[poi + y][i - t] !== 0) break outer;
                  }
                  y++;
                }else {
                  this.arr.push(Array(12).fill(0));
                  y++;
                }
              }
            }
            return false;
          })) break;
          poi++;
        }else this.arr.push(Array(12).fill(0));
      }
      block.ox = block.x = x - w;
      block.oy = block.y = poi;
    },
    add(block) {
      var w, h;
      for(w = 0; w < block.width; w++) {
        for(h = 0; h < block.height; h++) {
          this.arr[block.y + h][block.x + w] = block.id;
        }
      }
      App.lines = this.arr.length;
    },
    insert(block) {
      var tem, w, h, victim = [];
      for(w = 0; w < block.width; w++) {
        for(h = 0; h < block.height; h++) {
          if(!this.arr[block.y + h]) this.arr[block.y + h] = Array(12).fill(0);
          else {
            if(this.arr[block.y + h][block.x + w] !== 0) {
              tem = this.arr[block.y + h][block.x + w];
              victim[tem] = victim[tem] || tem;
              this.delete(tem);
            }
          }
        }
      }
      this.add(block);
      victim.forEach(i => {
        this.resetBox(App.getItem(i), block);
      });
    },
    delete(id) {
      this.arr.forEach(i => {
        i.forEach((j, index) => {
          if(j === id) i[index] = 0;
        });
      });
    },
    update(block) {
      this.delete(block.id);
      this.insert(block);
    },
    resetBox(block, murderer) {
      var list = [], time = 4, distance = 0, direction = [true, true, true, true, true], point;
      victim[block.id] = block;
      while(time) {
        distance++;
        if(direction[4]) {
          point = this.checkMatrix(block.ox, block.ox + block.width, block.oy, block.oy + block.height, murderer.id);
          if(point === false) {
            direction[4] = false;
          }
          if(point) break;
        }
        if(direction[0]) {
          point = this.checkMatrix(block.ox, block.ox + block.width, block.oy - distance, block.oy + block.height - distance, murderer.id);
          if(point === false) {
            direction[0] = false;
            time--;
          }
          if(point) break;
        }
        if(direction[1]) {
          point = this.checkMatrix(block.ox - distance, block.ox + block.width - distance, block.oy, block.oy + block.height, murderer.id);
          if(point === false) {
            direction[1] = false;
            time--;
          }
          if(point) break;
        }
        if(direction[2]) {
          point = this.checkMatrix(block.ox + distance, block.ox + block.width + distance, block.oy, block.oy + block.height, murderer.id);
          if(point === false) {
            direction[2] = false;
            time--;
          }
          if(point) break;
        }
        if(direction[3]) {
          point = this.checkMatrix(block.ox, block.ox + block.width, block.oy + distance, block.oy + block.height + distance, murderer.id);
          if(point === false) {
            direction[3] = false;
            time--;
          }
          if(point) break;
        }
      }
      if(point) {
        block.x = point.x;
        block.y = point.y;
        this.add(block);
        return true;
      }else if(murderer) {
        block.y = murderer.y + murderer.height;
        this.insert(block);
      }
      return false;
    },
    // 检查矩形区域 空域: 坐标, 包含id: null, 有其它Block: false
    checkMatrix(x1, x2, y1, y2, id) {
      if(typeof x1 !== typeof 0 || typeof x2 !== typeof 0 || typeof y1 !== typeof 0 || typeof y2 !== typeof 0) return false;
      var i;
      id = id || 0;
      if(x1 < 0 || x2 > 12 || y1 < 0) return false;
      var rs = {x: x1, y: y1};
      for(;y1 < y2; y1++) {
        if(!this.arr[y1]) this.arr[y1] = Array(12).fill(0);
        else {
          for(i = x1; i < x2; i++) {
            if(this.arr[y1][i]) {
              rs = null;
              if(this.arr[y1][i] !== id) return false;
            }
          }
        }
      }
      return rs;
    },
    deleteBlankLine() {
      var waitForDeathList = [], poi = 0, flag, mark = [], block;
      this.arr.forEach((i, index) => {
        flag = true;
        i.forEach(item => {
          if(item !== 0) {
            flag = false;
            if(!mark[item]) {
              mark[item] = true;
              if(poi) {
                block = App.getItem(item);
                block.oy = block.y = block.y - poi;
                block.update();
              }
            }
          }
        });
        if(flag) {
          poi++;
          waitForDeathList.push(index);
        }
      });
      while(waitForDeathList.length) {
        this.arr.splice(waitForDeathList.pop(), 1);
      }
  }
  };
  // 矩阵最小单位宽高
  var ubw = 50, ubh = 10;
  // Vue
  var App;
  // 鼠标按下时的坐标
  var past;
  // 当前被调整的Block对象
  var target;
  // 受影响的Block
  var victim = [];

  // 基本区块对象
  function Block() {
    this.id = Xc.sequence;
    this.width = 4;
    this.height = 10;
    this.minWidth = 1;
    this.minHeight = 5;
    this.x = 0;
    this.y = 0;
    this.ox = 0;
    this.oy = 0;
    this.background = '#f6f';
    matrix.getPointInMatrix(this.width, this.height, this);
    matrix.add(this);
    this.style = {
      top: ubh * this.y + 'px',
      left: ubw * this.x + 'px',
      width: this.width * ubw + 'px',
      height: this.height * ubh + 'px',
      background: this.background
    };
  }
  Block.prototype.update = function() {
    this.style = {
      top: ubh * this.y + 'px',
      left: ubw * this.x + 'px',
      width: this.width * ubw + 'px',
      height: this.height * ubh + 'px',
      background: this.background
    };
  };
  // 鼠标移动事件
  function move(event){
    if(target) {
      var e = event ? event: window.event;
      if(past.type) { // 区分移动与缩放 true: move, false: resize
        target.style.left = ubw * target.ox + e.clientX - past.x + 'px';
        target.style.top = ubh * target.oy + e.clientY - past.y + 'px';
        target.x = target.ox + Math.round((e.clientX - past.x) / ubw);
        target.y = target.oy + Math.round((e.clientY - past.y) / ubh);
        if(target.x < 0) target.x = 0;
        if(target.y < 0) target.y = 0;
        if(target.x + target.width > 12) target.x = 12 - target.width;
      }else {
        target.style.width = ubw * past.width + e.clientX - past.x + 'px';
        target.style.height = ubh * past.height + e.clientY - past.y + 'px';
        if((ubw * past.width + e.clientX - past.x) < ubw * target.minWidth) target.style.width = ubw * target.minWidth + 'px';
        if((ubh * past.height + e.clientY - past.y) < ubh * target.minHeight) target.style.height = ubh * target.minHeight + 'px';
        target.width = past.width + Math.round((e.clientX - past.x) / ubw);
        target.height = past.height + Math.round((e.clientY - past.y) / ubh);
        if(target.x + target.width > 12) target.width = 12 - target.x;
        if(target.width < target.minWidth) target.width = target.minWidth;
        if(target.height < target.minHeight) target.height = target.minHeight;
      }
      matrix.update(target);
      inspectVictim();
    }
  }
  // 检查善后情况（防止dealVictim执行次数过多）
  var victimFlag = false;
  function inspectVictim() {
    if(victimFlag) {
      setTimeout(inspectVictim, 40);
    }else dealVictim();
  }
  // 善后工作 （移动过的元素尝试向其原坐标移动）
  function dealVictim() {
    var flag = false;
    victim.forEach(i => {
      if(i) {
        matrix.delete(i.id);
        if(matrix.resetBox(i, false)) {
          if(i.ox === i.x && i.oy === i.y) {
            victim[i.id] = null;
          }
          flag = true;
        }else {
          matrix.add(i);
        }
        i.update();
      }
    });
    if(flag) {
      setTimeout(dealVictim, 40);
      victimFlag = true;
    }else {
      victimFlag = false;
    }
  }
  // 单次操作结束事件
  function over() {
    if(target) {
      target.ox = target.x;
      target.oy = target.y;
      victim.forEach(i => {
        if(i) {
          i.ox = i.x;
          i.oy = i.y;
        }
      });
      victim = [];
      target.update();
      target = null;
      matrix.deleteBlankLine();
      App.lines = matrix.arr.length;
      App.murdererID = 0;
    }
    window.removeEventListener('mousemove', move);
    window.removeEventListener('mouseup', over);
  }

  App = new Vue({
    el: '#main',
    data: {
      blocks: [],
      // 正在被操作中的Block对象的ID
      murdererID: 0,
      lines: 0
    },
    methods: {
      move(i) {
        over();
        // 忽略鼠标右键的事件
        if(event.button === 2) return;
        this.murdererID = i.id;
        target = i;
        past = {x: event.clientX, y: event.clientY, type: true};
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', over);
      },
      resize(i) {
        over();
        if(event.button === 2) return;
        this.murdererID = i.id;
        target = i;
        past = {x: event.clientX, y: event.clientY, width: i.width, height: i.height, type: false};
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', over);
      },
      getItem(id) {
        for(var i = 0; i < this.blocks.length; i++) {
          if(this.blocks[i].id === id) return this.blocks[i];
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        ubw = Math.floor(this.$el.clientWidth / 12);
        this.blocks.push(new Block());
        this.blocks.push(new Block());
        this.blocks.push(new Block());
        this.blocks.push(new Block());
        this.blocks.push(new Block());
        this.blocks.push(new Block());
        this.blocks.push(new Block());
        this.blocks.push(new Block());
        this.blocks.push(new Block());
        this.blocks.push(new Block());
        this.blocks.push(new Block());
        console.log(matrix);
        console.log(this.blocks);
      });
    }
  });
})(window);

