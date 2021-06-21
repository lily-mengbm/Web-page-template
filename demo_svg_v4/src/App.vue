<template>
  <div id="app">
    <span class="svg-container svg-container_login">
        <svg-icon icon-class="user" />
    </span>
    <div class="svg-container">
       <svg-icon icon-class="password"></svg-icon>
     </div>
    <div class="svg-container">
      <svg-icon icon-class="404"></svg-icon>
    </div>
    <div class="icon-list">
      <div v-for="(item, index) in iconList" :key="index">
        <svg-icon :icon-class="item" style="height: 30px;width: 16px;color: purple;" />
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import icons from './assets/icons/requireIcons.js'
export default {
  name: 'App',
  data () {
    return {
      iconList: icons
    }
  }
}
</script>

<style>
  .svg-container {
      font-size: 40px;
      color: blue;
  }
  .icon-list {
    height: 200px;
    overflow-y: scroll;
  }
</style>
