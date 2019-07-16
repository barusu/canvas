Vue.component('o-transfer', {
  name: 'oTransfer',
  template: `
  <div class="o-transfer">
    <div class="transfer-panel">
      <div class="tab-head">
        <div class="tab-item" :class="{'select': tabID === 0}" @click="tabID = 0" v-if="display.depts">
          <span :data-num="SDepts.length">部门</span>
        </div>
        <div class="tab-item" :class="{'select': tabID === 1}" @click="tabID = 1" v-if="display.dutys">
          <span :data-num="SDutys.length">职务</span>
        </div>
        <div class="tab-item" :class="{'select': tabID === 2}" @click="tabID = 2" v-if="display.groups">
          <span>群组</span>
        </div>
        <div class="tab-item" :class="{'select': tabID === 3}" @click="tabID = 3" v-if="display.users">
          <span :data-num="SUsers.length">用户</span>
        </div>
      </div>
      <div class="tab-bar" :class="'seq' + TrueTabID"></div>
      <div class="tab-content">
        <div class="body-wrapper" :class="'seq' + tabID">
          <!-- 部门列表 -->
          <div class="body">
            <div class="content">
              <div class="item" v-for="i in depts" :class="{'select': i.select}" v-text="i.name" @click="i.select = !i.select" :key="'deptsl' + i.id"></div>
            </div>
          </div>
          <!-- 职务-部门 列表 -->
          <div class="body">
            <div class="content dutys">
              <div class="item" v-for="i in dutys" :key="'dutysl' + i.id">
                <p v-text="i.name" @click="toggleDutys(i)" class="cup" title="全选 / 取消"></p>
                <p class="min-tag"><span v-for="d in i.depts" :key="'dutysltag' + d.id" v-text="d.name" @click="d.select = !d.select" :class="{'select': d.select}"></span></p>
              </div>
            </div>
          </div>
          <!-- 用户组列表 -->
          <div class="body">
            <div class="content">
              <div class="item" v-for="i in groups" :class="{'select': i.select}" v-text="i.name + ' ( ' + i.users.length + ' )'" @click="i.select = !i.select" :key="'groupsl' + i.id"></div>
            </div>
          </div>
          <!-- 用户列表 -->
          <div class="body">
            <div class="content">
              <div class="item" v-for="i in Users" :class="{'select': i.select}" @click="toggleUser(i)" :key="'usersl' + i.id">
                <span v-text="i.name"></span>
                <i class="el-icon-star-on" v-if="i.follow" @click.stop="follow(i, false)" title="取消常用联系人"></i>
                <i class="el-icon-star-off" v-else @click.stop="follow(i, true)" title="添加为常用联系人"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <slot><slot/>
    <div class="transfer-panel">
      <!-- 搜索框（添加额外人员） -->
      <div class="tab-head">
        <div class="search-select">
          <input type="text" class="search" v-model="key" :class="{'error': key && !user, 'success': key && user}" @keyup.enter="addUser">
          <div class="search-content">
            <div class="item" v-for="i in list" @click="selectUser(i)">
              <span v-text="i.name" class="name"></span>
              <span v-text="i.dept"></span>
            </div>
          </div>
        </div>
        <button type="button" :class="{'disable': !user}" @click="addUser">添加</button>
      </div>
      <div class="tab-content">
        <div class="content del">
          <!-- 选择的部门 -->
          <div class="item dept" v-for="i in SDepts" @click="i.select = false" :key="'deptsr' + i.id">
            <span v-text="i.name"></span>
            <i class="el-icon-delete"></i>
          </div>
          <!-- 选择的职务 -->
          <div class="item duty" v-for="i in SDutys" :key="'dutysr' + i.id">
            <p v-text="i.name"></p>
            <p class="min-tag">
              <template v-for="d in i.depts"><span class="select" :key="d.id" v-if="d.select" v-text="d.name" @click="d.select = false"></span></template>
            </p>
          </div>
          <!-- 选择的用户 -->
          <div class="item user" v-for="i in SUsers" @click="cancelUser(i.id)" :key="'usersr' + i.id">
            <span v-text="i.name"></span>
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  props: ['data', 'value'],
  data() {
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
    selectUser(i) {
      this.user = i;
      this.list = [];
    },
    search() {
      this.$emit('search', this.key, data => {
        if(data.status && data.users) {
          if(data.users.length === 1) this.user = data.users[0];
          if(data.users.length >= 1) this.list = data.users;
        }else this.user = null;
      });
    },
    follow(i, status) {
      this.$emit('follow', {id: i.id, name: i.name, follow: status}, data => {
        if(data.status) this.users.some(u => {
          if(u.id == i.id) {
            u.follow = status;
            return true;
          }else return false;
        });
      });
    },
    addUser() {
      if(this.user) {
        this.user.follow = false;
        if(this.users.every(i => i.id != this.user.id)) this.users.push(this.user);
        this.usersID.push(this.user.id);
        this.key = '';
      }
    },
    update() {
      if(this.data.display) {
        for(var i in this.display) {
          if(this.data.display[i] === false) this.display[i] = false;
          else this.display[i] = true;
        }
      }
      const map = ["depts", "dutys", "groups", "users"];
      map.some((i, index) => {
        if(this.display[i]) {
          this.tabID = index;
          return true;
        }
        return false;
      });
      this.depts = this.data.depts.map(i => {
        return {
          select: false,
          id: i.id,
          name: i.name
        };
      });
      this.dutys = this.data.dutys.map(i => {
        return {
          id: i.id,
          name: i.name,
          depts: i.depts.map(d => {
            return {
              id: d.id,
              name: d.name,
              tid: d.tid,
              select: false
            };
          })
        };
      });
      this.groups = this.data.groups.map(i => {
        return {
          id: i.id,
          name: i.name,
          select: false,
          users: i.users.map(u => u.id)
        };
      });
      this.users = this.data.users.map(i => ({id: i.id, name: i.name, follow: true}));
      this.defaultSelect();
    },
    defaultSelect() {
      var tem;
      if(this.value) {
        if(this.value.depts) {
          tem = {};
          this.value.depts.forEach(i => {
            tem[i.id] = true;
          });
          this.depts.forEach(i => {
            if(tem[i.id]) i.select = true;
          });
        }
        if(this.value.dutys) {
          tem = {};
          this.value.dutys.forEach(d => {
            d.depts.forEach(i => {
              tem[d.id + '-' + i.id] = true;
            });
          });
          this.dutys.forEach(d => {
            d.depts.forEach(i => {
              if(tem[d.id + '-' + i.id]) i.select = true;
            });
          });
        }
        if(this.value.users) {
          this.value.users.forEach(u => {
            if(this.users.every(i => i.id != u.id)) this.users.push({id: u.id, name: u.name, follow: false});
            this.usersID.push(u.id);
          });
        }
      }
    },
    toggleDutys(i) {
      var s = i.depts.every(d => d.select);
      i.depts.forEach(d => {d.select = !s;});
    },
    cancelUser(id) {
      this.groups.forEach(i => {
        if(i.select && i.users.some(u => u == id)) {
          i.select = false;
          this.usersID = this.usersID.concat(i.users.filter(u => u != id));
        }
      });
      this.usersID = this.usersID.filter(i => i != id);
    },
    toggleUser(i) {
      if(i.select) this.cancelUser(i.id);
      else this.usersID.push(i.id);
    },
    updateValue() {
      clearTimeout(this._st);
      this._st = setTimeout(() => {
        this.selectValue = {
          "depts": this.SDepts.map(i => ({id: i.id, name: i.name})),
          "dutys": this.SDutys.map(i => {
            return {
              id: i.id,
              name: i.name,
              depts: i.depts.filter(d => d.select).map(d => ({id: d.id, name: d.name, tid: d.tid}))
            };
          }),
          "users": this.SUsers.map(i => ({id: i.id, name: i.name}))
        };
        this.$emit('change');
      }, 242);
    }
  },
  computed: {
    TrueTabID() {
      var t = this.tabID;
      const map = ["depts", "dutys", "groups", "users"];
      for(var i = 0; i <= this.tabID; i++) {
        if(this.display[map[i]] === false) t--;
      }
      return t;
    },
    SDepts() {
      this.updateValue();
      return this.depts.filter(i => i.select);
    },
    SDutys() {
      this.updateValue();
      return this.dutys.filter(i => i.depts.some(d => d.select));
    },
    SUsers() {
      this.updateValue();
      var t = this.usersID;
      this.groups.forEach(i => {
        i.select && (t = t.concat(i.users));
      });
      return this.users.filter(i => t.some(u => u == i.id));
    },
    Users() {
      var t = this.usersID;
      this.groups.forEach(i => {
        i.select && (t = t.concat(i.users));
      });
      return this.users.map(i => {
        return {
          id: i.id,
          name: i.name,
          follow: i.follow,
          select: t.some(u => u == i.id)
        };
      });
    },
    Value() {
      return this.selectValue;
    }
  },
  mounted() {
    this.update();
  }
});
