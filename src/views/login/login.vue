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
      <el-form ref="form" :model="form" id="from-box">
        <el-form-item>
          <el-input v-model="form.name1" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.name2"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.name3" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="7">
              <img src="../../assets/yzm.png" alt="" @click="onSubmit" class="img-yzm">
            </el-col>
          </el-row>
          
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="form.type">
            <el-checkbox name="type">
                我已阅读并同意<el-link type="primary" @click="onSubmit" >用户协议</el-link>和<el-link type="primary" @click="onSubmit">隐私条款</el-link>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button class="maxW" type="primary" @click="onSubmit">登录</el-button> <br>
          <el-button class="maxW" type="success" @click="onSubmit">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 右侧的图片 -->
    <img src="../../assets/login_banner_ele.png" class="img-box" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name1: "",
        name2: "",
        name3: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      window.console.log("submit!");
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
        background:linear-gradient(225deg,rgba(20,147,250,1),rgba(1,198,250,1));

        .login-box {
            width: 478px;
            height: 550px;
            box-sizing: border-box;
            padding: 44px;
            background:rgba(245,245,245,1);

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
                    background:rgba(199,199,199,1);
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
                }
            }

        }

        .img-box {
            width: 633px;
            height: 435px;
        }
    }
</style>