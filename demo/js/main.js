'use strict';

Vue.component('xc-tree', {
  name: 'tree',
  template: '\n  <div class="xc-tree" v-if="isShow">\n    <div class="item" @click="select(data)" :class="{\'select\': data.select}" :style="style">\n      <span class="arrow" :class="{\'open\': status}" @click.stop="status = !status">\n        <svg v-if="hasChild" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="10" height="10">\n          <path d="M802.68856889 453.16323555l-381.64837605-381.64837603a83.2203173 83.2203173 0 0 0-142.05708173 58.83676446L278.98311111 893.64837602a83.2203173 83.2203173 0 0 0 142.05708173 58.83676446l381.64837605-381.64837603a83.2203173 83.2203173 0 0 0 0-117.6735289z"></path>\n        </svg>\n      </span>\n      <span v-text="data.name" class="txt"></span>\n    </div>\n    <xc-tree v-show="status" :data="i" :level="Level + 1" v-for="i in data.child" :key="i.id" :result="result"></xc-tree>\n  </div>\n  ',
  props: ['data', 'level', 'result'],
  data: function data() {
    return {
      status: false
    };
  },

  methods: {
    select: function select(data) {
      if (this.result) {
        if (data.select) data.select = false;
        return;
      }
      if (data.select) {
        if (this.getStatus(data)) this.check(data, false);else data.select = false;
      } else {
        this.check(data, true);
      }
    },
    check: function check(data, flag) {
      var _this = this;

      data.select = flag;
      if (data.child) {
        data.child.forEach(function (i) {
          _this.check(i, flag);
        });
      }
    },
    getStatus: function getStatus(data) {
      var _this2 = this;

      if (!data.select) return false;
      if (data.child) {
        return data.child.every(function (i) {
          return _this2.getStatus(i);
        });
      }
      return true;
    }
  },
  computed: {
    hasChild: function hasChild() {
      // console.log(this.data);
      if (this.data && this.data.child && this.data.child.length) return true;
      return false;
    },
    Level: function Level() {
      return this.level || 0;
    },
    style: function style() {
      return {
        paddingLeft: this.Level * 10 + 5 + 'px'
      };
    },
    isShow: function isShow() {
      function loop(item) {
        if (item.select) return true;
        if (item.child) {
          return item.child.some(function (i) {
            return loop(i);
          });
        }
        return false;
      }
      if (this.result) return loop(this.data);
      return true;
    }
  }
});
Vue.component('o-transfer', {
  name: 'oTransfer',
  template: '\n  <div class="o-transfer" :class="{\'disabled\': disabled}">\n    <div class="transfer-panel" :style="panelStyle">\n      <div class="tab-head">\n        <div class="tab-item" :class="{\'select\': tabID === 0}" @click="tabID = 0" v-if="display.depts">\n          <span :data-num="SDepts.length">\u90E8\u95E8</span>\n        </div>\n        <div class="tab-item" :class="{\'select\': tabID === 1}" @click="tabID = 1" v-if="display.dutys">\n          <span :data-num="SDutys.length">\u804C\u52A1</span>\n        </div>\n        <div class="tab-item" :class="{\'select\': tabID === 2}" @click="tabID = 2" v-if="display.groups">\n          <span>\u7FA4\u7EC4</span>\n        </div>\n        <div class="tab-item" :class="{\'select\': tabID === 3}" @click="tabID = 3" v-if="display.users">\n          <span :data-num="SUsers.length">\u7528\u6237</span>\n        </div>\n      </div>\n      <div class="tab-bar" :class="\'seq\' + TrueTabID"></div>\n      <div class="tab-content" :style="{\'height\': BH + \'px\'}">\n        <div class="body-wrapper" :class="\'seq\' + tabID">\n          <!-- \u90E8\u95E8\u5217\u8868 -->\n          <div class="body">\n            <div class="content" :style="bodyStyle">\n              <xc-tree :data="i" v-for="i in Depts" :key="i.id"></xc-tree>\n              <!-- <div class="item" v-for="i in depts" :class="{\'select\': i.select}" v-text="i.name" @click="i.select = !i.select" :key="\'deptsl\' + i.id"></div> -->\n            </div>\n          </div>\n          <!-- \u804C\u52A1-\u90E8\u95E8 \u5217\u8868 -->\n          <div class="body">\n            <div class="content dutys" :style="bodyStyle">\n              <div class="item" v-for="i in dutys" :key="\'dutysl\' + i.id" :class="{\'select\': i.select}">\n                <p v-text="i.name" @click="toggleDutys(i)" class="cup" title="\u5168\u9009 / \u53D6\u6D88"></p>\n                <p class="min-tag" v-if="false"><span v-for="d in i.depts" :key="\'dutysltag\' + d.id" v-text="d.name" @click="d.select = !d.select" :class="{\'select\': d.select}"></span></p>\n              </div>\n            </div>\n          </div>\n          <!-- \u7528\u6237\u7EC4\u5217\u8868 -->\n          <div class="body">\n            <div class="content" :style="bodyStyle">\n              <div class="item" v-for="i in groups" :class="{\'select\': i.select}" v-text="i.name + \' ( \' + i.users.length + \' )\'" @click="i.select = !i.select" :key="\'groupsl\' + i.id"></div>\n            </div>\n          </div>\n          <!-- \u7528\u6237\u5217\u8868 -->\n          <div class="body">\n            <div class="content" :style="bodyStyle">\n              <div class="item" v-for="i in Users" :class="{\'select\': i.select}" @click="toggleUser(i)" :key="\'usersl\' + i.id">\n                <span v-text="i.name"></span>\n                <i class="el-icon-star-on" v-if="i.follow" @click.stop="follow(i, false)" title="\u53D6\u6D88\u5E38\u7528\u8054\u7CFB\u4EBA"></i>\n                <i class="el-icon-star-off" v-else @click.stop="follow(i, true)" title="\u6DFB\u52A0\u4E3A\u5E38\u7528\u8054\u7CFB\u4EBA"></i>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <slot></slot>\n    <div class="transfer-panel" :style="panelStyle">\n      <!-- \u641C\u7D22\u6846\uFF08\u6DFB\u52A0\u989D\u5916\u4EBA\u5458\uFF09 -->\n      <div class="tab-head" :class="{\'disabled\': disableadd}">\n        <div class="search-select">\n          <input type="text" :style="{width: BW - 55 + \'px\'}" :disabled="disableadd" class="search" v-model="key" :class="{\'error\': key && !user, \'success\': key && user}" @keyup.enter="addUser">\n          <div class="search-content">\n            <div class="item" v-for="i in list" :key="i.id" @click="selectUser(i)">\n              <span v-text="i.name" class="name"></span>\n              <span v-text="i.dept"></span>\n            </div>\n          </div>\n        </div>\n        <button type="button" :class="{\'disable\': !user}" @click="addUser">\u6DFB\u52A0</button>\n      </div>\n      <div class="tab-content" :style="{\'height\': BH + \'px\'}">\n        <div class="content del" :style="bodyStyle">\n          <!-- \u9009\u62E9\u7684\u90E8\u95E8 -->\n          <xc-tree :data="i" v-for="i in Depts" :key="i.id" :result="true"></xc-tree>\n          <!-- <div class="item dept" v-for="i in SDepts" @click="i.select = false" :key="\'deptsr\' + i.id">\n            <span v-text="i.name"></span>\n            <svg class="del" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M641.536 189.781333V64c0-35.157333-23.893333-64-56.490667-64H448.597333c-32.426667 0-66.048 28.842667-66.048 64v125.781333H179.2c7.850667 0-51.2 12.885333-51.2 66.218667 0 35.157333 26.624 64 59.050667 64h649.898666C869.376 320 896 291.157333 896 256c0-53.333333-59.050667-66.218667-59.050667-66.218667h-195.413333zM448 192V128c0-44.544 28.416-64 64-64 36.437333 0 64 19.626667 64 64v64h-128zM320 1024h384c70.4 0 128-57.6 128-128v-512H192v512c0 70.4 57.6 128 128 128z m323.754667-483.584c0-15.616 11.946667-28.416 26.368-28.416 14.506667 0 26.368 12.8 26.368 28.416v341.333333c0 15.701333-11.946667 28.501333-26.453334 28.501334-14.421333 0-26.282667-12.8-26.282666-28.501334v-341.333333z m-158.122667 0c0-15.616 11.946667-28.416 26.368-28.416 14.506667 0 26.368 12.8 26.368 28.416v341.333333c0 15.701333-11.946667 28.501333-26.368 28.501334-14.506667 0-26.368-12.8-26.368-28.501334v-341.333333z m-158.122667 0c0-15.616 11.946667-28.416 26.453334-28.416 14.421333 0 26.282667 12.8 26.282666 28.416v341.333333c0 15.701333-11.946667 28.501333-26.368 28.501334-14.506667 0-26.368-12.8-26.368-28.501334v-341.333333z" p-id="2699"></path></svg>\n          </div> -->\n          <!-- \u9009\u62E9\u7684\u804C\u52A1 -->\n          <div class="item duty" v-for="i in SDutys" :key="\'dutysr\' + i.id" @click="toggleDutys(i)">\n            <p v-text="i.name"></p>\n            <!-- <p class="min-tag">\n              <template v-for="d in i.depts"><span class="select" :key="d.id" v-if="d.select" v-text="d.name" @click="d.select = false"></span></template>\n            </p> -->\n            <svg class="del" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M641.536 189.781333V64c0-35.157333-23.893333-64-56.490667-64H448.597333c-32.426667 0-66.048 28.842667-66.048 64v125.781333H179.2c7.850667 0-51.2 12.885333-51.2 66.218667 0 35.157333 26.624 64 59.050667 64h649.898666C869.376 320 896 291.157333 896 256c0-53.333333-59.050667-66.218667-59.050667-66.218667h-195.413333zM448 192V128c0-44.544 28.416-64 64-64 36.437333 0 64 19.626667 64 64v64h-128zM320 1024h384c70.4 0 128-57.6 128-128v-512H192v512c0 70.4 57.6 128 128 128z m323.754667-483.584c0-15.616 11.946667-28.416 26.368-28.416 14.506667 0 26.368 12.8 26.368 28.416v341.333333c0 15.701333-11.946667 28.501333-26.453334 28.501334-14.421333 0-26.282667-12.8-26.282666-28.501334v-341.333333z m-158.122667 0c0-15.616 11.946667-28.416 26.368-28.416 14.506667 0 26.368 12.8 26.368 28.416v341.333333c0 15.701333-11.946667 28.501333-26.368 28.501334-14.506667 0-26.368-12.8-26.368-28.501334v-341.333333z m-158.122667 0c0-15.616 11.946667-28.416 26.453334-28.416 14.421333 0 26.282667 12.8 26.282666 28.416v341.333333c0 15.701333-11.946667 28.501333-26.368 28.501334-14.506667 0-26.368-12.8-26.368-28.501334v-341.333333z" p-id="2699"></path></svg>\n          </div>\n          <!-- \u9009\u62E9\u7684\u7528\u6237 -->\n          <div class="item user" v-for="i in SUsers" @click="cancelUser(i.id)" :key="\'usersr\' + i.id">\n            <span v-text="i.name"></span>\n            <svg class="del" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M641.536 189.781333V64c0-35.157333-23.893333-64-56.490667-64H448.597333c-32.426667 0-66.048 28.842667-66.048 64v125.781333H179.2c7.850667 0-51.2 12.885333-51.2 66.218667 0 35.157333 26.624 64 59.050667 64h649.898666C869.376 320 896 291.157333 896 256c0-53.333333-59.050667-66.218667-59.050667-66.218667h-195.413333zM448 192V128c0-44.544 28.416-64 64-64 36.437333 0 64 19.626667 64 64v64h-128zM320 1024h384c70.4 0 128-57.6 128-128v-512H192v512c0 70.4 57.6 128 128 128z m323.754667-483.584c0-15.616 11.946667-28.416 26.368-28.416 14.506667 0 26.368 12.8 26.368 28.416v341.333333c0 15.701333-11.946667 28.501333-26.453334 28.501334-14.421333 0-26.282667-12.8-26.282666-28.501334v-341.333333z m-158.122667 0c0-15.616 11.946667-28.416 26.368-28.416 14.506667 0 26.368 12.8 26.368 28.416v341.333333c0 15.701333-11.946667 28.501333-26.368 28.501334-14.506667 0-26.368-12.8-26.368-28.501334v-341.333333z m-158.122667 0c0-15.616 11.946667-28.416 26.453334-28.416 14.421333 0 26.282667 12.8 26.282666 28.416v341.333333c0 15.701333-11.946667 28.501333-26.368 28.501334-14.506667 0-26.368-12.8-26.368-28.501334v-341.333333z" p-id="2699"></path></svg>\n            <!-- <i class="el-icon-delete"></i> -->\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ',
  props: ['data', 'value', 'disabled', 'disableadd', 'size'],
  data: function data() {
    return {
      tabID: -1,
      selectValue: null,
      key: '',
      depts: [],
      dutys: [],
      groups: [],
      users: [],
      usersID: [],
      user: null,
      list: [],
      display: {
        depts: true,
        dutys: true,
        groups: true,
        users: true
      }
    };
  },

  watch: {
    data: 'update',
    key: 'search',
    dutys: {
      handler: 'updateValue',
      deep: true
    }
  },
  methods: {
    selectUser: function selectUser(i) {
      this.user = i;
      this.list = [];
    },
    search: function search() {
      var _this3 = this;

      this.$emit('search', this.key, function (data) {
        if (data.status && data.users) {
          if (data.users.length === 1) _this3.user = data.users[0];
          if (data.users.length >= 1) _this3.list = data.users;
        } else _this3.user = null;
      });
    },
    follow: function follow(i, status) {
      var _this4 = this;

      this.$emit('follow', { id: i.id, name: i.name, follow: status }, function (data) {
        if (data.status) _this4.users.some(function (u) {
          if (u.id === i.id) {
            u.follow = status;
            return true;
          }
          return false;
        });
      });
    },
    addUser: function addUser() {
      var _this5 = this;

      if (this.user) {
        this.user.follow = false;
        if (this.users.every(function (i) {
          return i.id !== _this5.user.id;
        })) this.users.push(this.user);
        this.usersID.push(this.user.id);
        this.key = '';
      }
    },
    update: function update() {
      var _this6 = this;

      if (this.data.display) {
        for (var i in this.display) {
          if (this.data.display[i] === false) this.display[i] = false;else this.display[i] = true;
        }
      }
      var map = ['depts', 'dutys', 'groups', 'users'];
      map.some(function (i, index) {
        if (_this6.display[i]) {
          _this6.tabID = index;
          return true;
        }
        return false;
      });
      this.depts = this.data.depts.map(function (i) {
        return {
          select: false,
          id: i.id,
          pid: i.pid,
          name: i.name,
          child: []
        };
      });
      this.dutys = this.data.dutys.map(function (i) {
        return {
          id: i.id,
          name: i.name,
          select: false,
          depts: i.depts.map(function (d) {
            return {
              id: d.id,
              name: d.name,
              tid: d.tid,
              select: false
            };
          })
        };
      });
      this.groups = this.data.groups.map(function (i) {
        return {
          id: i.id,
          name: i.name,
          select: false,
          users: i.users.map(function (u) {
            return u.id;
          })
        };
      });
      this.users = this.data.users.map(function (i) {
        return { id: i.id, name: i.name, follow: true };
      });
      this.defaultSelect();
    },
    defaultSelect: function defaultSelect() {
      var _this7 = this;

      var tem;
      if (this.value) {
        if (this.value.depts) {
          tem = {};
          this.value.depts.forEach(function (i) {
            tem[i.id] = true;
          });
          this.depts.forEach(function (i) {
            if (tem[i.id]) i.select = true;
          });
        }
        if (this.value.dutys) {
          tem = {};
          this.value.dutys.forEach(function (d) {
            d.depts.forEach(function (i) {
              tem[d.id + '-' + i.id] = true;
            });
          });
          this.dutys.forEach(function (d) {
            d.depts.forEach(function (i) {
              if (tem[d.id + '-' + i.id]) {
                i.select = true;
                d.select = true;
              }
            });
          });
        }
        if (this.value.users) {
          this.value.users.forEach(function (u) {
            if (_this7.users.every(function (i) {
              return i.id !== u.id;
            })) _this7.users.push({ id: u.id, name: u.name, follow: false });
            _this7.usersID.push(u.id);
          });
        }
      }
    },
    toggleDutys: function toggleDutys(i) {
      var s = i.depts.every(function (d) {
        return d.select;
      });
      i.depts.forEach(function (d) {
        d.select = !s;
      });
      i.select = !s;
    },
    cancelUser: function cancelUser(id) {
      var _this8 = this;

      this.groups.forEach(function (i) {
        if (i.select && i.users.some(function (u) {
          return u === id;
        })) {
          i.select = false;
          _this8.usersID = _this8.usersID.concat(i.users.filter(function (u) {
            return u !== id;
          }));
        }
      });
      this.usersID = this.usersID.filter(function (i) {
        return i !== id;
      });
    },
    toggleUser: function toggleUser(i) {
      if (i.select) this.cancelUser(i.id);else this.usersID.push(i.id);
    },
    updateValue: function updateValue() {
      var _this9 = this;

      clearTimeout(this._st);
      this._st = setTimeout(function () {
        _this9.selectValue = {
          depts: _this9.SDepts.map(function (i) {
            return { id: i.id, name: i.name };
          }),
          dutys: _this9.SDutys.map(function (i) {
            return {
              id: i.id,
              name: i.name,
              depts: i.depts.filter(function (d) {
                return d.select;
              }).map(function (d) {
                return { id: d.id, name: d.name, tid: d.tid };
              })
            };
          }),
          users: _this9.SUsers.map(function (i) {
            return { id: i.id, name: i.name };
          })
        };
        _this9.$emit('change');
      }, 242);
    }
  },
  computed: {
    Depts: function Depts() {
      var depts = this.depts;
      var tem = depts.filter(function (i) {
        return !i.pid;
      });
      function loop(t) {
        t.child = depts.filter(function (i) {
          return t.id === i.pid;
        });
        t.child.forEach(function (i) {
          loop(i);
        });
      }
      tem.forEach(function (i) {
        loop(i);
      });
      return tem;
    },
    TrueTabID: function TrueTabID() {
      var t = this.tabID;
      var map = ['depts', 'dutys', 'groups', 'users'];
      for (var i = 0; i <= this.tabID; i++) {
        if (this.display[map[i]] === false) t--;
      }
      return t;
    },
    SDepts: function SDepts() {
      this.updateValue();
      return this.depts.filter(function (i) {
        return i.select;
      });
    },
    SDutys: function SDutys() {
      this.updateValue();
      return this.dutys.filter(function (i) {
        return i.depts.some(function (d) {
          return d.select;
        });
      });
    },
    SUsers: function SUsers() {
      this.updateValue();
      var t = this.usersID;
      this.groups.forEach(function (i) {
        i.select && (t = t.concat(i.users));
      });
      return this.users.filter(function (i) {
        return t.some(function (u) {
          return u === i.id;
        });
      });
    },
    Users: function Users() {
      var t = this.usersID;
      this.groups.forEach(function (i) {
        i.select && (t = t.concat(i.users));
      });
      return this.users.map(function (i) {
        return {
          id: i.id,
          name: i.name,
          follow: i.follow,
          select: t.some(function (u) {
            return u === i.id;
          })
        };
      });
    },
    Value: function Value() {
      return this.selectValue;
    },
    BW: function BW() {
      var width = 240;
      if (this.size && this.size[0]) width = this.size[0];
      if (width < 240) width = 240;
      return width;
    },
    BH: function BH() {
      var height = 100;
      if (this.size && this.size[1]) height = this.size[1];
      if (height < 100) width = 100;
      return height - 34;
    },
    panelStyle: function panelStyle() {
      var width = 240,
          height = 320;
      if (this.size && this.size[0]) {
        width = this.size[0];
        height = this.size[1];
      }
      return {
        width: width + 'px',
        height: height + 'px'
      };
    },
    bodyStyle: function bodyStyle() {
      var width = 260;
      if (this.size && this.size[0]) width = this.size[0] + 20;
      return {
        width: width + 'px'
      };
    }
  },
  mounted: function mounted() {
    this.update();
  }
});