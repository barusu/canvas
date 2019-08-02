Vue.component('xc-tree', {
  name: 'tree',
  template: `
  <div class="xc-tree" v-if="isShow">
    <div class="item" @click="select(data)" :class="{'select': data.select}" :style="style">
      <span class="arrow" :class="{'open': status}" @click.stop="status = !status">
        <svg v-if="hasChild" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="10" height="10">
          <path d="M802.68856889 453.16323555l-381.64837605-381.64837603a83.2203173 83.2203173 0 0 0-142.05708173 58.83676446L278.98311111 893.64837602a83.2203173 83.2203173 0 0 0 142.05708173 58.83676446l381.64837605-381.64837603a83.2203173 83.2203173 0 0 0 0-117.6735289z"></path>
        </svg>
      </span>
      <span v-text="data.name" class="txt"></span>
    </div>
    <xc-tree v-show="status" :data="i" :level="Level + 1" v-for="i in data.child" :key="i.id" :result="result"></xc-tree>
  </div>
  `,
  props: ['data', 'level', 'result'],
  data() {
    return {
      status: false
    };
  },
  methods: {
    select(data) {
      if(this.result) {
        if(data.select) data.select = false;
        return;
      }
      if(data.select) {
        if(this.getStatus(data)) this.check(data, false);
        else data.select = false;
      }else {
        this.check(data, true);
      }
    },
    check(data, flag) {
      data.select = flag;
      if(data.child) {
        data.child.forEach(i => {
          this.check(i, flag);
        });
      }
    },
    getStatus(data) {
      if(!data.select) return false;
      if(data.child) {
        return data.child.every(i => this.getStatus(i));
      }
      return true;
    }
  },
  computed: {
    hasChild() {
      // console.log(this.data);
      if(this.data && this.data.child && this.data.child.length) return true;
      return false;
    },
    Level() {
      return this.level || 0;
    },
    style() {
      return {
        paddingLeft: this.Level * 10 + 5 + 'px'
      };
    },
    isShow() {
      function loop(item) {
        if(item.select) return true;
        if(item.child) {
          return item.child.some(i => loop(i));
        }
        return false;
      }
      if(this.result) return loop(this.data);
      return true;
    }
  }
});
Vue.component('o-transfer', {
  name: 'oTransfer',
  template: `
  <div class="o-transfer" :class="{'disabled': disabled}">
    <div class="transfer-panel" :style="panelStyle">
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
      <div class="tab-content" :style="{'height': BH + 'px'}">
        <div class="body-wrapper" :class="'seq' + tabID">
          <!-- 部门列表 -->
          <div class="body">
            <div class="content" :style="bodyStyle">
              <xc-tree :data="i" v-for="i in Depts" :key="i.id"></xc-tree>
              <!-- <div class="item" v-for="i in depts" :class="{'select': i.select}" v-text="i.name" @click="i.select = !i.select" :key="'deptsl' + i.id"></div> -->
            </div>
          </div>
          <!-- 职务-部门 列表 -->
          <div class="body">
            <div class="content dutys" :style="bodyStyle">
              <div class="item" v-for="i in dutys" :key="'dutysl' + i.id" :class="{'select': i.select}">
                <p v-text="i.name" @click="toggleDutys(i)" class="cup" title="全选 / 取消"></p>
                <p class="min-tag" v-if="false"><span v-for="d in i.depts" :key="'dutysltag' + d.id" v-text="d.name" @click="d.select = !d.select" :class="{'select': d.select}"></span></p>
              </div>
            </div>
          </div>
          <!-- 用户组列表 -->
          <div class="body">
            <div class="content" :style="bodyStyle">
              <div class="item" v-for="i in groups" :class="{'select': i.select}" v-text="i.name + ' ( ' + i.users.length + ' )'" @click="i.select = !i.select" :key="'groupsl' + i.id"></div>
            </div>
          </div>
          <!-- 用户列表 -->
          <div class="body">
            <div class="content" :style="bodyStyle">
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
    <slot></slot>
    <div class="transfer-panel" :style="panelStyle">
      <!-- 搜索框（添加额外人员） -->
      <div class="tab-head" :class="{'disabled': disableadd}">
        <div class="search-select">
          <input type="text" :style="{width: BW - 55 + 'px'}" :disabled="disableadd" class="search" v-model="key" :class="{'error': key && !user, 'success': key && user}" @keyup.enter="addUser">
          <div class="search-content">
            <div class="item" v-for="i in list" :key="i.id" @click="selectUser(i)">
              <span v-text="i.name" class="name"></span>
              <span v-text="i.dept"></span>
            </div>
          </div>
        </div>
        <button type="button" :class="{'disable': !user}" @click="addUser">添加</button>
      </div>
      <div class="tab-content" :style="{'height': BH + 'px'}">
        <div class="content del" :style="bodyStyle">
          <!-- 选择的部门 -->
          <xc-tree :data="i" v-for="i in Depts" :key="i.id" :result="true"></xc-tree>
          <!-- <div class="item dept" v-for="i in SDepts" @click="i.select = false" :key="'deptsr' + i.id">
            <span v-text="i.name"></span>
            <svg class="del" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M641.536 189.781333V64c0-35.157333-23.893333-64-56.490667-64H448.597333c-32.426667 0-66.048 28.842667-66.048 64v125.781333H179.2c7.850667 0-51.2 12.885333-51.2 66.218667 0 35.157333 26.624 64 59.050667 64h649.898666C869.376 320 896 291.157333 896 256c0-53.333333-59.050667-66.218667-59.050667-66.218667h-195.413333zM448 192V128c0-44.544 28.416-64 64-64 36.437333 0 64 19.626667 64 64v64h-128zM320 1024h384c70.4 0 128-57.6 128-128v-512H192v512c0 70.4 57.6 128 128 128z m323.754667-483.584c0-15.616 11.946667-28.416 26.368-28.416 14.506667 0 26.368 12.8 26.368 28.416v341.333333c0 15.701333-11.946667 28.501333-26.453334 28.501334-14.421333 0-26.282667-12.8-26.282666-28.501334v-341.333333z m-158.122667 0c0-15.616 11.946667-28.416 26.368-28.416 14.506667 0 26.368 12.8 26.368 28.416v341.333333c0 15.701333-11.946667 28.501333-26.368 28.501334-14.506667 0-26.368-12.8-26.368-28.501334v-341.333333z m-158.122667 0c0-15.616 11.946667-28.416 26.453334-28.416 14.421333 0 26.282667 12.8 26.282666 28.416v341.333333c0 15.701333-11.946667 28.501333-26.368 28.501334-14.506667 0-26.368-12.8-26.368-28.501334v-341.333333z" p-id="2699"></path></svg>
          </div> -->
          <!-- 选择的职务 -->
          <div class="item duty" v-for="i in SDutys" :key="'dutysr' + i.id" @click="toggleDutys(i)">
            <p v-text="i.name"></p>
            <!-- <p class="min-tag">
              <template v-for="d in i.depts"><span class="select" :key="d.id" v-if="d.select" v-text="d.name" @click="d.select = false"></span></template>
            </p> -->
            <svg class="del" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M641.536 189.781333V64c0-35.157333-23.893333-64-56.490667-64H448.597333c-32.426667 0-66.048 28.842667-66.048 64v125.781333H179.2c7.850667 0-51.2 12.885333-51.2 66.218667 0 35.157333 26.624 64 59.050667 64h649.898666C869.376 320 896 291.157333 896 256c0-53.333333-59.050667-66.218667-59.050667-66.218667h-195.413333zM448 192V128c0-44.544 28.416-64 64-64 36.437333 0 64 19.626667 64 64v64h-128zM320 1024h384c70.4 0 128-57.6 128-128v-512H192v512c0 70.4 57.6 128 128 128z m323.754667-483.584c0-15.616 11.946667-28.416 26.368-28.416 14.506667 0 26.368 12.8 26.368 28.416v341.333333c0 15.701333-11.946667 28.501333-26.453334 28.501334-14.421333 0-26.282667-12.8-26.282666-28.501334v-341.333333z m-158.122667 0c0-15.616 11.946667-28.416 26.368-28.416 14.506667 0 26.368 12.8 26.368 28.416v341.333333c0 15.701333-11.946667 28.501333-26.368 28.501334-14.506667 0-26.368-12.8-26.368-28.501334v-341.333333z m-158.122667 0c0-15.616 11.946667-28.416 26.453334-28.416 14.421333 0 26.282667 12.8 26.282666 28.416v341.333333c0 15.701333-11.946667 28.501333-26.368 28.501334-14.506667 0-26.368-12.8-26.368-28.501334v-341.333333z" p-id="2699"></path></svg>
          </div>
          <!-- 选择的用户 -->
          <div class="item user" v-for="i in SUsers" @click="cancelUser(i.id)" :key="'usersr' + i.id">
            <span v-text="i.name"></span>
            <svg class="del" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M641.536 189.781333V64c0-35.157333-23.893333-64-56.490667-64H448.597333c-32.426667 0-66.048 28.842667-66.048 64v125.781333H179.2c7.850667 0-51.2 12.885333-51.2 66.218667 0 35.157333 26.624 64 59.050667 64h649.898666C869.376 320 896 291.157333 896 256c0-53.333333-59.050667-66.218667-59.050667-66.218667h-195.413333zM448 192V128c0-44.544 28.416-64 64-64 36.437333 0 64 19.626667 64 64v64h-128zM320 1024h384c70.4 0 128-57.6 128-128v-512H192v512c0 70.4 57.6 128 128 128z m323.754667-483.584c0-15.616 11.946667-28.416 26.368-28.416 14.506667 0 26.368 12.8 26.368 28.416v341.333333c0 15.701333-11.946667 28.501333-26.453334 28.501334-14.421333 0-26.282667-12.8-26.282666-28.501334v-341.333333z m-158.122667 0c0-15.616 11.946667-28.416 26.368-28.416 14.506667 0 26.368 12.8 26.368 28.416v341.333333c0 15.701333-11.946667 28.501333-26.368 28.501334-14.506667 0-26.368-12.8-26.368-28.501334v-341.333333z m-158.122667 0c0-15.616 11.946667-28.416 26.453334-28.416 14.421333 0 26.282667 12.8 26.282666 28.416v341.333333c0 15.701333-11.946667 28.501333-26.368 28.501334-14.506667 0-26.368-12.8-26.368-28.501334v-341.333333z" p-id="2699"></path></svg>
            <!-- <i class="el-icon-delete"></i> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  props: ['data', 'value', 'disabled', 'disableadd', 'size'],
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
          if(u.id === i.id) {
            u.follow = status;
            return true;
          }
          return false;
        });
      });
    },
    addUser() {
      if(this.user) {
        this.user.follow = false;
        if(this.users.every(i => i.id !== this.user.id)) this.users.push(this.user);
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
      const map = ['depts', 'dutys', 'groups', 'users'];
      map.some((i, index) => {
        if(this.display[i]) {
          this.tabID = index;
          return true;
        }
        return false;
      });
      this.depts = this.data.depts.map(i => ({
        select: false,
        id: i.id,
        pid: i.pid,
        name: i.name,
        child: []
      }));
      this.dutys = this.data.dutys.map(i => ({
        id: i.id,
        name: i.name,
        select: false,
        depts: i.depts.map(d => ({
          id: d.id,
          name: d.name,
          tid: d.tid,
          select: false
        }))
      }));
      this.groups = this.data.groups.map(i => ({
        id: i.id,
        name: i.name,
        select: false,
        users: i.users.map(u => u.id)
      }));
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
              if(tem[d.id + '-' + i.id]) {
                i.select = true;
                d.select = true;
              }
            });
          });
        }
        if(this.value.users) {
          this.value.users.forEach(u => {
            if(this.users.every(i => i.id !== u.id)) this.users.push({id: u.id, name: u.name, follow: false});
            this.usersID.push(u.id);
          });
        }
      }
    },
    toggleDutys(i) {
      var s = i.depts.every(d => d.select);
      i.depts.forEach(d => {d.select = !s;});
      i.select = !s;
    },
    cancelUser(id) {
      this.groups.forEach(i => {
        if(i.select && i.users.some(u => u === id)) {
          i.select = false;
          this.usersID = this.usersID.concat(i.users.filter(u => u !== id));
        }
      });
      this.usersID = this.usersID.filter(i => i !== id);
    },
    toggleUser(i) {
      if(i.select) this.cancelUser(i.id);
      else this.usersID.push(i.id);
    },
    updateValue() {
      clearTimeout(this._st);
      this._st = setTimeout(() => {
        this.selectValue = {
          depts: this.SDepts.map(i => ({id: i.id, name: i.name})),
          dutys: this.SDutys.map(i => ({
            id: i.id,
            name: i.name,
            depts: i.depts.filter(d => d.select).map(d => ({id: d.id, name: d.name, tid: d.tid}))
          })),
          users: this.SUsers.map(i => ({id: i.id, name: i.name}))
        };
        this.$emit('change');
      }, 242);
    }
  },
  computed: {
    Depts() {
      var depts = this.depts;
      var tem = depts.filter(i => !i.pid);
      function loop(t) {
        t.child = depts.filter(i => t.id === i.pid);
        t.child.forEach(i => {
          loop(i);
        });
      }
      tem.forEach(i => {
        loop(i);
      });
      return tem;
    },
    TrueTabID() {
      var t = this.tabID;
      const map = ['depts', 'dutys', 'groups', 'users'];
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
      return this.users.filter(i => t.some(u => u === i.id));
    },
    Users() {
      var t = this.usersID;
      this.groups.forEach(i => {
        i.select && (t = t.concat(i.users));
      });
      return this.users.map(i => ({
        id: i.id,
        name: i.name,
        follow: i.follow,
        select: t.some(u => u === i.id)
      }));
    },
    Value() {
      return this.selectValue;
    },
    BW() {
      var width = 240;
      if(this.size && this.size[0]) width = this.size[0];
      if(width < 240) width = 240;
      return width;
    },
    BH() {
      var height = 100;
      if(this.size && this.size[1]) height = this.size[1];
      if(height < 100) width = 100;
      return height - 34;
    },
    panelStyle() {
      var width = 240, height = 320;
      if(this.size && this.size[0]) {
        width = this.size[0];
        height = this.size[1];
      }
      return {
        width: width + 'px',
        height: height + 'px'
      };
    },
    bodyStyle() {
      var width = 260;
      if(this.size && this.size[0]) width = this.size[0] + 20;
      return {
        width: width + 'px'
      };
    }
  },
  mounted() {
    this.update();
  }
});
