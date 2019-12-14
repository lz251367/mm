<template>
  <!-- 登录页面 -->
  <div class="login">
    <!-- 登录表单 element ui -->
    <div class="login-box">
      <div class="title">
        <img src="../../assets/矢量智能对象 拷贝 9.png" />
        <span class="name">黑马面面</span>
        <i></i>
        <span class="login-text">用户登录</span>
      </div>
      <el-form ref="form" :model="form" id="from-box" :rules="rules">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="7">
              <img @click="get_yzm" :src="login_yzm" class="img-yzm" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="form.type" @click="from.type = !from.type">
            <el-checkbox name="type">
              我已阅读并同意
              <el-link type="primary" @click="onSubmit">用户协议</el-link>和
              <el-link type="primary" @click="onSubmit">隐私条款</el-link>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button class="maxW" type="primary" @click="submitForm('form')">登录</el-button>
          <br />
          <el-button class="maxW" type="success" @click="enroll_page">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 右侧的图片 -->
    <img src="../../assets/login_banner_ele.png" class="img-box" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号码"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字"));
        } else if (value.length != 11) {
          callback(new Error("手机号码的长度为11位"));
        } else if (
          !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
            value
          )
        ) {
          callback(new Error("手机号码格式不正确"));
        } else {
          callback();
        }
      }, 1000);
    };
    var checkCaptcha = (rule, value, callback) => {
      value = this.form.code;
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (value.length != 4) {
        callback(new Error("验证码长度为4位"));
      } else {
        callback();
      }
    };
    return {
      login_yzm:
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now(),
      form: {
        phone: "",
        password: "",
        code: "",
        type: false
      },
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: "change" }],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "change"
          }
        ],
        captcha: [
          { required: true, validator: checkCaptcha, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      window.console.log("submit!");
    },
    get_yzm() {
      this.login_yzm =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now();
    },
    submitForm(formName) {
      if (!this.form.type) {
        this.$message({
          showClose: true,
          message: "请阅读并同意协议",
          type: "error"
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            axios({
              method: "post",
              withCredentials: true,
              url: process.env.VUE_APP_BASEURL + "/login",
              data: {
                phone: this.form.phone,
                password: this.form.password,
                code: this.form.code
              }
            }).then(res => {
              this.login_yzm =
                process.env.VUE_APP_BASEURL +
                "/captcha?type=login&" +
                Date.now();
              if (res.data.code == 200) {
                this.$message({
                  message: "恭喜你，登录成功",
                  type: "success"
                });
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            this.$message({
              showClose: true,
              message: "请将密码、账号或者验证码填写完整",
              type: "error"
            });
          }
        });
      }
    }
  }
};
</script>
    
<style lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  .login-box {
    width: 478px;
    height: 550px;
    box-sizing: border-box;
    padding: 44px;
    background: rgba(245, 245, 245, 1);

    .title {
      display: flex;
      align-items: center;
      margin-bottom: 27px;

      img {
        margin-left: 5px;
        margin-right: 16px;
        width: 22px;
        height: 17px;
      }

      .name {
        margin-right: 14px;
        font-size: 24px;
      }

      i {
        width: 1px;
        height: 28px;
        margin-right: 12px;
        background: rgba(199, 199, 199, 1);
      }

      .login-text {
        font-size: 22px;
      }
    }

    #from-box {
      .maxW {
        width: 100%;
        margin-bottom: 26px;
      }
      .img-yzm {
        height: 40px;
        width: 100%;
      }
    }
  }

  .img-box {
    width: 633px;
    height: 435px;
  }
}
</style>