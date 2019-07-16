'use strict';

Vue.component('o-transfer', {
  name: 'oTransfer',
  template: '\n  <div class="o-transfer">\n    <div class="transfer-panel">\n      <div class="tab-head">\n        <div class="tab-item" :class="{\'select\': tabID === 0}" @click="tabID = 0" v-if="display.depts">\n          <span :data-num="SDepts.length">\u90E8\u95E8</span>\n        </div>\n        <div class="tab-item" :class="{\'select\': tabID === 1}" @click="tabID = 1" v-if="display.dutys">\n          <span :data-num="SDutys.length">\u804C\u52A1</span>\n        </div>\n        <div class="tab-item" :class="{\'select\': tabID === 2}" @click="tabID = 2" v-if="display.groups">\n          <span>\u7FA4\u7EC4</span>\n        </div>\n        <div class="tab-item" :class="{\'select\': tabID === 3}" @click="tabID = 3" v-if="display.users">\n          <span :data-num="SUsers.length">\u7528\u6237</span>\n        </div>\n      </div>\n      <div class="tab-bar" :class="\'seq\' + TrueTabID"></div>\n      <div class="tab-content">\n        <div class="body-wrapper" :class="\'seq\' + tabID">\n          <!-- \u90E8\u95E8\u5217\u8868 -->\n          <div class="body">\n            <div class="content">\n              <div class="item" v-for="i in depts" :class="{\'select\': i.select}" v-text="i.name" @click="i.select = !i.select" :key="\'deptsl\' + i.id"></div>\n            </div>\n          </div>\n          <!-- \u804C\u52A1-\u90E8\u95E8 \u5217\u8868 -->\n          <div class="body">\n            <div class="content dutys">\n              <div class="item" v-for="i in dutys" :key="\'dutysl\' + i.id">\n                <p v-text="i.name" @click="toggleDutys(i)" class="cup" title="\u5168\u9009 / \u53D6\u6D88"></p>\n                <p class="min-tag"><span v-for="d in i.depts" :key="\'dutysltag\' + d.id" v-text="d.name" @click="d.select = !d.select" :class="{\'select\': d.select}"></span></p>\n              </div>\n            </div>\n          </div>\n          <!-- \u7528\u6237\u7EC4\u5217\u8868 -->\n          <div class="body">\n            <div class="content">\n              <div class="item" v-for="i in groups" :class="{\'select\': i.select}" v-text="i.name + \' ( \' + i.users.length + \' )\'" @click="i.select = !i.select" :key="\'groupsl\' + i.id"></div>\n            </div>\n          </div>\n          <!-- \u7528\u6237\u5217\u8868 -->\n          <div class="body">\n            <div class="content">\n              <div class="item" v-for="i in Users" :class="{\'select\': i.select}" @click="toggleUser(i)" :key="\'usersl\' + i.id">\n                <span v-text="i.name"></span>\n                <i class="el-icon-star-on" v-if="i.follow" @click.stop="follow(i, false)" title="\u53D6\u6D88\u5E38\u7528\u8054\u7CFB\u4EBA"></i>\n                <i class="el-icon-star-off" v-else @click.stop="follow(i, true)" title="\u6DFB\u52A0\u4E3A\u5E38\u7528\u8054\u7CFB\u4EBA"></i>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <slot><slot/>\n    <div class="transfer-panel">\n      <!-- \u641C\u7D22\u6846\uFF08\u6DFB\u52A0\u989D\u5916\u4EBA\u5458\uFF09 -->\n      <div class="tab-head">\n        <div class="search-select">\n          <input type="text" class="search" v-model="key" :class="{\'error\': key && !user, \'success\': key && user}" @keyup.enter="addUser">\n          <div class="search-content">\n            <div class="item" v-for="i in list" @click="selectUser(i)">\n              <span v-text="i.name" class="name"></span>\n              <span v-text="i.dept"></span>\n            </div>\n          </div>\n        </div>\n        <button type="button" :class="{\'disable\': !user}" @click="addUser">\u6DFB\u52A0</button>\n      </div>\n      <div class="tab-content">\n        <div class="content del">\n          <!-- \u9009\u62E9\u7684\u90E8\u95E8 -->\n          <div class="item dept" v-for="i in SDepts" @click="i.select = false" :key="\'deptsr\' + i.id">\n            <span v-text="i.name"></span>\n            <i class="el-icon-delete"></i>\n          </div>\n          <!-- \u9009\u62E9\u7684\u804C\u52A1 -->\n          <div class="item duty" v-for="i in SDutys" :key="\'dutysr\' + i.id">\n            <p v-text="i.name"></p>\n            <p class="min-tag">\n              <template v-for="d in i.depts"><span class="select" :key="d.id" v-if="d.select" v-text="d.name" @click="d.select = false"></span></template>\n            </p>\n          </div>\n          <!-- \u9009\u62E9\u7684\u7528\u6237 -->\n          <div class="item user" v-for="i in SUsers" @click="cancelUser(i.id)" :key="\'usersr\' + i.id">\n            <span v-text="i.name"></span>\n            <i class="el-icon-delete"></i>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ',
  props: ['data', 'value'],
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
        "depts": true,
        "dutys": true,
        "groups": true,
        "users": true
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
      var _this = this;

      this.$emit('search', this.key, function (data) {
        if (data.status && data.users) {
          if (data.users.length === 1) _this.user = data.users[0];
          if (data.users.length >= 1) _this.list = data.users;
        } else _this.user = null;
      });
    },
    follow: function follow(i, status) {
      var _this2 = this;

      this.$emit('follow', { id: i.id, name: i.name, follow: status }, function (data) {
        if (data.status) _this2.users.some(function (u) {
          if (u.id == i.id) {
            u.follow = status;
            return true;
          } else return false;
        });
      });
    },
    addUser: function addUser() {
      var _this3 = this;

      if (this.user) {
        this.user.follow = false;
        if (this.users.every(function (i) {
          return i.id != _this3.user.id;
        })) this.users.push(this.user);
        this.usersID.push(this.user.id);
        this.key = '';
      }
    },
    update: function update() {
      var _this4 = this;

      if (this.data.display) {
        for (var i in this.display) {
          if (this.data.display[i] === false) this.display[i] = false;else this.display[i] = true;
        }
      }
      var map = ["depts", "dutys", "groups", "users"];
      map.some(function (i, index) {
        if (_this4.display[i]) {
          _this4.tabID = index;
          return true;
        }
        return false;
      });
      this.depts = this.data.depts.map(function (i) {
        return {
          select: false,
          id: i.id,
          name: i.name
        };
      });
      this.dutys = this.data.dutys.map(function (i) {
        return {
          id: i.id,
          name: i.name,
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
      var _this5 = this;

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
              if (tem[d.id + '-' + i.id]) i.select = true;
            });
          });
        }
        if (this.value.users) {
          this.value.users.forEach(function (u) {
            if (_this5.users.every(function (i) {
              return i.id != u.id;
            })) _this5.users.push({ id: u.id, name: u.name, follow: false });
            _this5.usersID.push(u.id);
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
    },
    cancelUser: function cancelUser(id) {
      var _this6 = this;

      this.groups.forEach(function (i) {
        if (i.select && i.users.some(function (u) {
          return u == id;
        })) {
          i.select = false;
          _this6.usersID = _this6.usersID.concat(i.users.filter(function (u) {
            return u != id;
          }));
        }
      });
      this.usersID = this.usersID.filter(function (i) {
        return i != id;
      });
    },
    toggleUser: function toggleUser(i) {
      if (i.select) this.cancelUser(i.id);else this.usersID.push(i.id);
    },
    updateValue: function updateValue() {
      var _this7 = this;

      clearTimeout(this._st);
      this._st = setTimeout(function () {
        _this7.selectValue = {
          "depts": _this7.SDepts.map(function (i) {
            return { id: i.id, name: i.name };
          }),
          "dutys": _this7.SDutys.map(function (i) {
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
          "users": _this7.SUsers.map(function (i) {
            return { id: i.id, name: i.name };
          })
        };
        _this7.$emit('change');
      }, 242);
    }
  },
  computed: {
    TrueTabID: function TrueTabID() {
      var t = this.tabID;
      var map = ["depts", "dutys", "groups", "users"];
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
          return u == i.id;
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
            return u == i.id;
          })
        };
      });
    },
    Value: function Value() {
      return this.selectValue;
    }
  },
  mounted: function mounted() {
    this.update();
  }
});