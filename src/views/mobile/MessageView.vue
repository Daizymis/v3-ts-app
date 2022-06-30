<template>
  <van-sticky>
    <div class="top-nav">
      <span>Message<span class="num">(35)</span></span>
    </div>
  </van-sticky>
  <van-swipe-cell>
    <div class="flex-center">
      <van-image
        round
        width="1.2rem"
        height="1.2rem"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </div>
    <template #right>
      <van-button color="#7232dd" class="btn">config</van-button>
      <van-button type="primary" class="btn">marked</van-button>
      <van-button square text="remove" type="danger" class="btn" />
    </template>
  </van-swipe-cell>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.top-nav {
  height: 48px;
  font-size: 25px;
  line-height: 48px;
  text-align: left;
  padding-left: 8px;
  .num {
    font-size: 12px;
    margin-left: 2px;
  }
}
.btn {
  height: 100%;
  width: 90px;
}
</style>
