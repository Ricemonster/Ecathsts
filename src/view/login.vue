<template>
  <div class="app">
    <video :src="videoSrc" muted autoplay loop></video>
    <div class="mask">
      <div class="box">
        <div class="top">
          <img src="../assets/image/topLine.png" onclick="return false" />
        </div>
        <div class="user">
          <div class="user-input">
            <img src="../assets/image/username.png" alt />
            <input v-model="userName" type="text" placeholder="请输入用户名" />
          </div>
          <div class="user-input">
            <img src="../assets/image/password.png" alt />
            <input @keyup.enter="submit" v-model="passWord" type="password" placeholder="请输入密码" />
          </div>
          <div class="submit" @click="submit">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoSrc: "http://106.54.118.27/vido/login1.mp4",
      userName: "",
      passWord: ""
    };
  },
  methods: {
    submit: function() {
      let userName = "admin";
      let passWord = "123456";
      if (this.userName === userName && this.passWord === passWord) {
        this.$router.push({
          name: "home"
        });
      } else {
        this.userName = "";
        this.passWord = "";
        this.$message.error("账号或密码输入有误，请重新输入!");
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.app {
  width: 100vw;
  overflow: hidden;
  height: 100vh;
  position: relative;
}

video {
  height: 100%;
  width: 100%;
  object-fit: fill;
}

.mask {
  position: absolute;
  height: 95%;
  width: 95%;
  top: 0px;
  left: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .box {
    height: 510px;
    width: 600px;

    .top {
      margin-top: 30px;

      img {
        min-width: 600px;
      }
    }

    .user {
      margin-top: 30px;
    }

    .user-input {
      width: 90%;
      height: 80px;
      margin: 0 auto;
      border-radius: 10px;
      border: 3px solid #48D5CC;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 40px;

      img {
        margin-left: 30px;
        height: 40px;
        width: 40px;
      }
    }

    .submit {
      width: 90%;
      height: 80px;
      margin: 0 auto;
      background: #00FBD5;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      font-size: 30px;
      font-weight: bold;
      letter-spacing: 10px;
      cursor: pointer;
    }
  }
}

input {
  margin-top: 12px;
  background: none;
  outline: none;
  border: none;
  height: 50px;
  width: 400px;
  color: #00FBD5;
  margin-left: 30px;
  font-size: 28px;
  letter-spacing: 3px;
}

input:focus {
  border: none;
}

::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color: #00FBD5;
}

:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #00FBD5;
  opacity: 1;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #00FBD5;
  opacity: 1;
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #00FBD5;
}
</style>
