<template>
  <div class="top-bar">
    <img class="top-btn sys-icon" :src="iconUrl" alt="" @click="goHome" />
    <el-popover
      v-model="showLangPop"
      class="lang-dialog"
      popper-class="popover-lang"
      placement="bottom"
      width="300"
      trigger="click"
      @show="resetPop()"
    >
      <div class="popover-content">
        <div class="lang-dialog-header">
          <el-tabs v-model="langName" class="lang-infos">
            <el-tab-pane label="中文" name="CN">
              <p class="tips">提示：</p>
              <p>
                After switching between Chinese and English mode, the current page information will not be saved.
                Confirm whether to switch?
                <br />
                <br />
                切换中英文模式后，将不保存当前页面信息，确认是否切换?
              </p>
            </el-tab-pane>
            <el-tab-pane label="English" name="US">
              <p class="tips">Tips:</p>
              <p>
                After switching between Chinese and English mode, the current page information will not be saved.
                Confirm whether to switch?
                <br />
                <br />
                切换中英文模式后，将不保存当前页面信息，确认是否切换?
              </p>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="lang-dialog-btn">
          <div @click="changeLangRight(false)">{{ langName === 'CN' ? '否' : 'NO' }}</div>
          <div class="lang-yes" @click="changeLangRight(true)">{{ langName === 'CN' ? '是' : 'YES' }}</div>
        </div>
      </div>
      <div slot="reference" class="top-btn language-btn">
        <span :style="{ opacity: $i18n.locale === 'CN' ? 1 : 0.45 }">中</span>
        <span :style="{ opacity: $i18n.locale === 'US' ? 1 : 0.45 }">/ EN</span>
      </div>
    </el-popover>
    <el-badge
      v-if="showSysUpdateNotice"
      :value="sysUpdateNoticeUnRead"
      :max="99"
      :hidden="!sysUpdateNoticeUnRead"
      class="top-bar-badge"
    >
      <img
        class="top-btn sys-update"
        src="../../../../assets/images/pc/home/topBar/icon-sys-update.png"
        :title="$t('entranceLang.sysUpdateTitle')"
        alt=""
        @click="goSystemNotice"
      />
    </el-badge>
    <el-popover
      v-model="showNotificationCenter"
      class="notification-center"
      popper-class="popover-notification"
      placement="bottom-start"
      :width="$i18n.locale === 'CN' ? '416' : '450'"
      trigger="click"
    >
      <!--    通知中心弹框-->
      <notification-center-dialog
        v-if="showNotificationCenter"
        :notification-center-count="notificationCenterCount"
        @changeNotificationShow="changeNotificationShow"
      />
      <div slot="reference" style="margin-right: 30px">
        <el-badge
          :value="notificationCenterCount.total"
          :max="99"
          :hidden="!notificationCenterCount.total"
          class="top-bar-badge"
        >
          <img
            class="notification-center top-btn"
            src="../../../../assets/images/pc/home/topBar/icon-notification.png"
            :title="$t('notificationCenterLang.notificationCenter')"
            alt=""
          />
        </el-badge>
      </div>
    </el-popover>
    <div v-if="hasCIMSModule" class="top-btn cims-enter" @click="goCIMS">{{ $t('systemBaseInfo.ERPLink') }}</div>
    <el-dropdown trigger="click" @command="handleCommand">
      <div class="user-method top-btn">
        <img class="user-photo" :src="decodeURIComponent(userInfo.cosResourceUrl)" alt="" />
        <span class="user-name">{{ userInfo.name }}</span>
        <img class="icon-down" src="../../../../assets/images/pc/home/topBar/icon-down.png" alt="" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-method-dropdown">
        <div v-for="item in userMethodList" :key="item.id">
          <el-dropdown-item
            v-if="!item.checkPermissions || checkMenuPermissions(item.checkPermissions)"
            :command="item"
          >
            <img :src="item.icon" alt="" />
            <span>{{ $t(`${item.langName}`) }}</span>
          </el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="time-zone top-btn">UTC/GMT+08:00</div>
  </div>
</template>

<script>
import logoCue from '@/assets/images/pc/home/topBar/logo-cue.png';
import logoWS from '@/assets/images/pc/home/topBar/logo-wsbiz.png';
import logoXY from '@/assets/images/pc/home/topBar/logo-xybiz.png';
import logoDefault from '@/assets/images/pc/home/topBar/logo-default.png';

import NotificationCenterDialog from '@/components/notification-center/notification-dialog';
import menuConfig from '@/utils/data/pc/menu/config';
import { userMethodList } from '@/utils/data/pc/menu';
import { mapGetters, mapMutations } from 'vuex';
import { Cookies } from 'common/project/js/base';
import { SUBMIT_OK, logoutUrl } from 'api/config';
import { communication } from 'api/getData';
export default {
  name: 'TopBar',
  components: {
    NotificationCenterDialog
  },
  props: {
    //菜单权限
    permissionsList: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      langName: '', //语言设置
      showLangPop: false, //语言设置弹框是否显示
      showSysUpdateNotice: false, //是否展示系统升级通知icon
      sysUpdateNoticeUnRead: 0, //系统升级通知小红点数
      intervalID: null, //系统升级通知小红点数定时器
      showNotificationCenter: false, //是否展示通知中心弹框
      notificationCenterCount: {}, //通知中心红点数字
      notificationInterval: null, //通知中心红点数字定时器
      hasCIMSModule: false, //进销存系统权限
      menuConfig, //菜单数据配置
      userMethodList //用户头像下拉菜单
    };
  },
  computed: {
    iconUrl() {
      let url = '';
      switch (process.env.VUE_APP_ENV) {
        case 'wsbiz':
          url = logoWS;
          break;
        case 'xybiz':
          url = logoXY;
          break;
        case 'release':
          url = logoCue;
          break;
        default:
          url = logoDefault;
      }
      return url;
    },
    ...mapGetters(['userInfo', 'dataAdapt', 'needReloadNotificationCount'])
  },
  watch: {
    needReloadNotificationCount: {
      handler(val) {
        if (val) {
          this.getNotificationCount();
          this.setNeedReloadNotificationCount(false);
        }
      }
    }
  },
  created() {
    //获取语言弹框默认值
    this.langName = this.$i18n.locale;
    //获取系统通知查看权限&小红点数
    this.getSysUpdatePermissionAndUnread();
    //获取通知中心小红点数
    this.getNotificationCount();
    //获取进销存系统权限
    this.getPermissions();
    //刷新系统通知小红点（隔半小时）
    this.intervalID = setInterval(() => {
      this.getSysUpdatePermissionAndUnread();
    }, 1000 * 60 * 30);
    //刷新通知中心小红点
    this.notificationInterval = setInterval(() => {
      this.getNotificationCount();
    }, 59000);
  },
  beforeDestroy() {
    clearInterval(this.intervalID);
    this.intervalID = null;
    clearInterval(this.notificationInterval);
    this.notificationInterval = null;
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'SET_USERINFO',
      setListDataAdapt: 'SET_LISTDATAADAPT',
      setDataAdapt: 'SET_DATAADAPT',
      setNeedReloadNotificationCount: 'SET_RELOADNOTIFICATIONCOUNT'
    }),
    goHome() {
      this.$router.push('/home');
    },
    resetPop() {
      this.langName = this.$i18n.locale;
    },
    changeLangRight(flag) {
      if (flag) {
        communication({
          url: '/modifyLanguage',
          postData: {
            language: this.langName
          }
        }).then(res => {
          if (res.code === 200) {
            this.$i18n.locale = this.langName;
            localStorage.setItem('i18n-locale', this.langName);
            this.$router.go(0);
          } else {
            this.langName = this.$i18n.locale;
            this.$message.error(res.message);
          }
        });
      } else {
        this.langName = this.$i18n.locale;
      }
      this.showLangPop = false;
    },
    getSysUpdatePermissionAndUnread() {
      const _obj = {
        url: 'version_notice/permission',
        isGet: true
      };
      communication(_obj).then(res => {
        if (res.code == SUBMIT_OK) {
          this.showSysUpdateNotice = res.data.canViewNoticeUnreadTip;
          this.sysUpdateNoticeUnRead = res.data.unreadCount;
        }
      });
    },
    goSystemNotice() {
      this.clearUnread();
      this.$router.push({ path: '/home/systemNotice', query: { isEdit: false } });
    },
    clearUnread() {
      const _obj = {
        url: 'version_notice/read',
        isPut: true
      };
      communication(_obj).then(res => {
        if (res.code == SUBMIT_OK) {
          this.sysUpdateNoticeUnRead = 0;
          console.log('清空未读成功');
        }
      });
    },
    getNotificationCount() {
      communication({
        url: '/notification/unReadNums',
        isGet: true
      })
        .then(res => {
          this.notificationCenterCount = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeNotificationShow(val) {
      this.getNotificationCount();
      this.showNotificationCenter = val;
    },
    getPermissions() {
      const _obj = {
        url: 'dataAdapt',
        postData: {
          permissions: { hasCIMSModule: 'CIMS:module:login' },
          configs: ['Entrance:CIMS']
        }
      };
      communication(_obj).then(res => {
        this.hasCIMSModule = res.data.permissions.hasCIMSModule;
        this.enterUrl = res.data.configs['Entrance:CIMS'];
      });
    },
    goCIMS() {
      window.open(
        this.enterUrl +
          '?accesstoken=' +
          localStorage.getItem('setTokenAccess') +
          '&refreshtoken=' +
          localStorage.getItem('setTokenRefresh') +
          '&uid=' +
          this.userInfo.caid
      );
    },
    checkMenuPermissions(menuKey) {
      const permissionsKey = this.menuConfig[menuKey].permissionkey;
      return this.permissionsList[permissionsKey] || false;
    },
    doCheckPermissionsJump(menuKey) {
      //跳转有权限菜单
      const menuConfig = this.menuConfig[menuKey] || null;
      if (!menuConfig) {
        return;
      }
      this.$router.push('/home/' + menuConfig.route);
    },
    logout() {
      this.setListDataAdapt(null);
      this.setDataAdapt({});
      const _obj = {
        url: logoutUrl
      };
      communication(_obj).then(res => {
        if (res.code == SUBMIT_OK) {
          // 退出登录成功
        }
      });
      const needLimitAccount = localStorage.getItem('needLimitAccount');
      localStorage.clear();
      if (needLimitAccount) {
        localStorage.setItem('needLimitAccount', needLimitAccount);
      }
      localStorage.removeItem('myVuexs');
      Cookies.clearAllCookie();
      localStorage.setItem('i18n-locale', this.$i18n.locale);
      this.$router.replace('/');
      location.href = `${location.origin}${location.pathname}`;
      localStorage.setItem('loginOut', 'loginOut');
    },
    handleCommand(command) {
      if (command.router) {
        this.$router.push(command.router);
      } else if (command.checkPermissions) {
        this.doCheckPermissionsJump(command.checkPermissions);
      } else if (command.logout) {
        this.logout();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.top-bar {
  width: 100%;
  height: 48px;
  box-shadow: 8px 0 20px #edeff2;
  background: url(../../../../../static/img/resources/v2/img/headerbg.png) no-repeat;
  padding: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #fff;
  font-size: 14px;
  .top-btn {
    cursor: pointer;
    margin-left: 34px;
  }
  img.top-btn {
    width: 20px;
  }
  .sys-icon {
    width: 60px !important;
    margin-left: 0;
    margin-right: auto;
  }
  .user-method {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 14px;
    .user-photo {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    .user-name {
      margin: 0 9.8px 0 8px;
    }
    .icon-down {
      width: 14px;
    }
  }
  .lang-dialog {
    .lang-btn {
      width: 50px;
      height: 28px;
      background: #fff;
      display: flex;
      margin: auto 30px auto 0;
      border-radius: 20px;
      align-items: center;
      justify-content: center;
      img {
        width: 24px;
      }
    }
  }
}
</style>
<style lang="scss">
.user-method-dropdown {
  .el-dropdown-menu__item {
    height: 32px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    img {
      width: 16px;
      margin-right: 8px;
    }
  }
  .el-dropdown-menu__item:hover {
    background: #f2faff;
    color: rgba(0, 0, 0, 0.85);
  }
}
.popover-lang {
  background-color: #fff;
}
.popover-notification {
  background-color: #fff;
  margin-top: 0 !important;
  padding: 0;
  top: 52px !important;
}
.lang-dialog-header {
  .el-tabs__nav {
    width: 100%;
    .el-tabs__item {
      width: 50%;
      text-align: center;
    }
  }
  .lang-infos {
    .el-tab-pane {
      display: flex;
      p:first-child {
        width: 60px;
      }
      .tips {
        width: 130px !important;
      }
      p {
        word-break: break-word !important;
        text-align: left;
      }
    }
  }
}
.lang-dialog-btn {
  width: 120px;
  margin: 20px auto 0 auto;
  display: flex;
  justify-content: space-between;
  div {
    width: 50px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    border-radius: 5px;
    border: 1px solid #e5e7ea;
    color: #333;
    cursor: pointer;
  }
  .lang-yes {
    background: #7fd422;
    border: none;
    color: #fff;
  }
}
.top-bar-badge {
  .el-badge__content {
    border: none;
    right: 0;
  }
}
</style>
