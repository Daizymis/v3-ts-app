<template>
  <div class="entrance-wrap">
    <div class="entrance-wrap-left">
      <div class="business-type advertising">
        广告代理
      </div>
      <div class="business-type marketing">
        营销服务/经销业务
      </div>
    </div>
    <div class="entrance-wrap-right">
      <div v-for="(menuList, index) in menus" :key="index" class="system-step" :style="{ flex: menuList.list.length }">
        <div class="system-step-title">
          <div class="step-circle">
            <div class="step-line" :class="{ 'step-line-hidden': index === 0 }"></div>
            <span>{{ index + 1 }}</span>
            <div class="step-line" :class="{ 'step-line-hidden': index === menus.length - 1 }"></div>
          </div>
          <div class="step-desc" :desc-title="menuList.title" v-text="menuList.step"></div>
        </div>
        <div class="step-content">
          <div v-for="(menuChild, childIndex) in menuList.list" :key="childIndex" class="step-content-child-max">
            <div
              v-for="(childList, i) in menuChild"
              :key="i"
              class="step-content-child"
              :style="{ marginTop: i > 0 ? '0.1rem' : '' }"
            >
              <div
                v-for="item in childList"
                :key="item.title"
                class="step-menu"
                :class="[
                  { 'step-menu-EN248': $i18n.locale === 'US' },
                  item.noOpen === true ? 'not-open' : !getPermission(item.permissionKey) ? 'no-permissions' : ''
                ]"
              >
                <div class="step-menu-item" desc-title="内部对账" menu-key="Statement">
                  <img class="menu-icon" :src="item.icon" alt="" />
                  <div class="menu-title">
                    {{ item.title }}
                  </div>
                  <div v-if="item.unread" class="unread">
                    {{ item.unread }}
                  </div>
                  <div
                    v-if="item.noOpen"
                    class="menu-item-tips"
                    :class="{ 'menu-item-tips-EN': $i18n.locale === 'US' }"
                  >
                    <!-- 暂无操作权限 -->
                    {{ $t('entranceLang.noPermissions') }}
                  </div>
                  <div
                    v-else-if="!getPermission(item.permissionKey)"
                    class="menu-item-tips"
                    :class="{ 'menu-item-tips-EN': $i18n.locale === 'US' }"
                  >
                    <!-- 功能未开放 -->
                    {{ $t('entranceLang.notOpen') }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import menus from './menu';

export default {
  data() {
    return {
      menus
    };
  },
  methods: {
    getPermission(key) {
      const permissions = [
        'Entrance::CustPayment',
        'Entrance:RegisterForm',
        'Entrance:CustomerSettings',
        'Entrance:SystemSet',
        'Entrance:TicketReview',
        'Entrance:ProjectApproval',
        'Entrance:Order',
        'Entrance:SalesContractReview',
        'Entrance:SalesOtherContract',
        'Entrance:CostContract',
        'Entrance:CSOrder',
        'Entrance:UniversalProjectApproval',
        'Entrance:Pusher',
        'Entrance:DataShare',
        'Entrance:BackOrder',
        'Entrance:CIMSPurchaseOrder',
        'Entrance:SupplierInvoice',
        'Entrance:BizsOpportunity',
        'Entrance:CustomerAccount',
        'Entrance:CIMSAfterPurchaseOrder',
        'Entrance:BatchReOrder',
        'Entrance:Statement',
        'Entrance:StatementStamp',
        'Entrance:OuterStatement',
        'Entrance:BackPayment',
        'Entrance:SaleOrder'
      ];
      return permissions.includes(key);
    }
  }
};
</script>
<style lang="scss" scoped>
$tabHeight: 2.7rem;
.entrance-wrap {
  /*max-width: 13.52rem;*/
  margin: 0 1rem;
  font-family: 'PingFang SC', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  font-size: 0.14rem;
  display: flex;
  justify-content: center;
  &-left {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    margin-right: 0.08rem;
    .business-type {
      width: 46px;
      height: $tabHeight;
      padding: 0 10px;
      display: flex;
      align-items: center;
      border-radius: 0.02rem;
      text-align: center;
      color: #fff;
      &-EN {
        width: 0.96rem;
        padding: 0;
        word-break: break-word;
      }
    }
    .advertising {
      background: #1b99f3;
      box-shadow: 0.02rem 0.06rem 0.08rem rgba(27, 153, 243, 0.15);
    }
    .marketing {
      background: #4d6ef3;
      margin-top: 0.16rem;
      box-shadow: 0.02rem 0.06rem 0.08rem rgba(77, 110, 243, 0.15);
      &-EN {
        margin-top: 0.1rem;
        white-space: pre-line;
      }
    }
  }
  &-right {
    flex: auto;
    display: flex;
    .system-step {
      width: 1.84rem;
      .step-desc {
        color: #63abff;
        text-align: center;
        line-height: 0.18rem;
        margin-top: 0.1rem;
      }
      .step-circle {
        height: 0.36rem;
        display: flex;
        align-items: center;
        span {
          width: 0.36rem;
          height: 0.36rem;
          border-radius: 50%;
          text-align: center;
          line-height: 0.36rem;
          background: #63abff;
          color: #fff;
          margin: 0 0.08rem;
        }
        .step-line {
          height: 1px;
          background: linear-gradient(to left, transparent 0%, transparent 50%, #63abff 50%, #63abff 100%) repeat-x;
          background-size: 0.1rem 0.01rem;
          margin: 0;
          flex-grow: 1;
        }
        .step-line-hidden {
          opacity: 0;
        }
      }
      &-EN {
        width: 1.34rem;
        .step-desc {
          white-space: pre-line;
        }
      }
      &-EN258 {
        width: 2.58rem;
        .step-desc {
          white-space: pre-line;
        }
      }
      &:hover {
        .step-circle span {
          width: 0.4rem;
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.2rem;
          background: #2185f9;
          box-shadow: 0 0.04rem 0.06rem rgba(33, 133, 249, 0.2);
        }
        .step-desc {
          font-size: 0.16rem;
          color: #2185f9;
        }
      }
    }
    .active-step {
      .step-circle span {
        width: 0.4rem;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.2rem;
        background: #2185f9;
        box-shadow: 0 0.04rem 0.06rem rgba(33, 133, 249, 0.2);
      }

      .step-desc {
        font-size: 0.16rem;
        color: #2185f9;
      }
    }
    .step-content {
      height: 2 * $tabHeight + 0.16rem;
      margin-top: 0.36rem;
      display: flex;
      flex-direction: row;
    }
    .step-menu {
      flex: 1;
      width: 100%;
    }
    .step-content-child-max {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0 0.05rem;
    }
    .step-content-child {
      flex: 1;
      height: 100%;
      background: #ffffff;
      border-radius: 0.04rem;
      padding: 0.26rem 0.08rem;
    }
    .step-menu-item {
      width: 100%;
      height: 0.46rem;
      padding: 0.13rem 0.08rem;
      display: flex;
      /*align-items: center;*/
      cursor: pointer;
      position: relative;
      &:hover {
        background: #eaf5ff;
        border-radius: 0.04rem;
      }
    }
    .menu-icon {
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
      margin-right: 0.08rem;
    }
    .menu-title {
      /*order: 2;*/
      line-height: 0.18rem;
      margin-top: 0.08rem;
      white-space: pre-line;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }
    .unread {
      padding: 0 5px;
      min-width: 23px;
      line-height: 16px;
      align-self: baseline;
      text-align: center;
      border-radius: 10px;
      background: #ff5b63;
      font-size: 0.12rem;
      color: #fff;
      margin-left: auto;
    }
  }
  .not-open {
    color: #a6a6a6;
    cursor: default;
    .unread {
      background: #e2e2e2;
    }
    &:hover {
      background: #fff;
      border-radius: 0.04rem;
      .menu-item-tips {
        display: block;
        background: rgba(91, 147, 213, 0.85);
      }
    }
  }
  .menu-item-tips {
    display: none;
    position: absolute;
    width: 1.02rem;
    height: 0.38rem;
    background: rgba(33, 133, 249, 0.85);
    box-shadow: 0 0.04rem 0.04rem rgba(91, 147, 213, 0.2);
    border-radius: 0.04rem;
    color: #fff;
    line-height: 0.38rem;
    text-align: center;
    left: 45%;
    top: 50%;
    z-index: 1;
    &-EN {
      width: 1.22rem;
    }
  }
  .no-permissions {
    cursor: default;
    img {
      opacity: 0.3;
    }
    color: #c3c3c3;
    .unread {
      background: #e2e2e2;
    }
    &:hover {
      background: #fff;
      .menu-item-tips {
        display: block;
      }
    }
  }
}
@media (max-width: 1000px) {
  .menu-title {
    display: none;
  }
}
</style>
