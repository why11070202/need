<template>
  <div class="home-wrap common-width">
    <headers :leftClick="_leftClick" :refreshPage="true" />
    <div class="v-van-cell-wrap" v-if="tokenList.length">
      <van-cell-group title="">
        <van-cell
          v-for="(items, index) in tokenList"
          :key="index"
          :title="items.name"
          @click="_toLogin(items)"
          is-link />
      </van-cell-group>
    </div>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headers from 'Element/Headers';
  import { getUrlParam } from 'Common/Js';
  
  export default {
    components: {
      Headers
    },
    data() {
      return {
        tokenList: []
      }
    },
    mounted() {
      let token = getUrlParam('accessToken'), userName = getUrlParam('userName');
      if (token && userName) {
        this._toLogin({token, name: userName});
      } else {
        this._getUserList();
      }
    },
    methods: {
      _getUserList() {
        const _self = this;
        let str = '/sso/listMockUser';
        // let str = '/sso/listMockUser';
        
        _self.$post(str, {}).then(res => {
          _self.tokenList = res.map(items => {
            items.name = `${items.userName} ${items.role}`;
            return items;
          })
        })
      },
      _toLogin(items) {
        const _self = this;
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        let loginObj = {
          token: null,
          userName: null
        };
        if (items) {
          loginObj = {
            token: items.token,
            userName: items.name
          };
        } else {
          loginObj = {
            token: getUrlParam('accessToken'),
            userName: getUrlParam('userName')
          };
        }
        let str = '/sso/mockLogin';
        // let str = '/sso/login';
        _self.$post(str, loginObj).then(res => {
          localStorage.setItem('role', JSON.stringify(res.role));
          localStorage.setItem('name', res.userAccount);
          _self.$router.replace('/menu');
        });
      },
      _leftClick() {
        window.parent.postMessage({
          msg: 'close'
        }, '*');
      }
    }
  }
</script>

<style scoped lang="less">
  .home-wrap {
    .v-van-cell-wrap {
      margin-top: 20px;
    }
  }
</style>
