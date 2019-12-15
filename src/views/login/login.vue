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
          <el-input v-model="login_form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="login_form.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-row>
            <el-col :span="17">
              <el-input v-model="login_form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="7">
              <img @click="get_yzm" :src="login_yzm" class="img_yzm" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="login_form.type" @click="login_form.type = !login_form.type">
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

    <!-- 注册的表单 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible" class="enroll_from">
      <el-form :model="form" ref="form">
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            name="image"
            :action="action"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="6" :offset="1">
              <img :src="sendsms_yzm" @click="get_txm" class="img_txm" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="6" :offset="1" class="height">
              <el-button>获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      value = this.login_form.phone;
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
      value = this.login_form.code;
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (value.length != 4) {
        callback(new Error("验证码长度为4位"));
      } else {
        callback();
      }
    };
    var checkPasswork = (rule, value, callback) => {
      value = this.login_form.password;
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error("验证码长度为6~16位"));
      } else {
        callback();
      }
    };
    return {
      imageUrl: "",
      action: process.env.VUE_APP_BASEURL + "/uploads",
      login_yzm:
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now(),
      sendsms_yzm:
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&" + Date.now(),
      login_form: {
        phone: "",
        password: "",
        code: "",
        type: false
      },
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: "change" }],
        password: [
          { required: true, validator: checkPasswork, trigger: "change" }
        ],
        captcha: [
          { required: true, validator: checkCaptcha, trigger: "change" }
        ]
      },
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "60px"
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
    get_txm() {
      this.sendsms_yzm =
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&" + Date.now();
    },
    submitForm(formName) {
      if (!this.login_form.type) {
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
                phone: this.login_form.phone,
                password: this.login_form.password,
                code: this.login_form.code
              }
            }).then(res => {
              window.console.log(res);
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
    },
    enroll_page() {
      this.dialogFormVisible = true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG、png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
      .img_yzm {
        height: 40px;
        width: 100%;
        cursor: pointer;
      }
    }
  }

  .img-box {
    width: 633px;
    height: 435px;
  }

  .enroll_from {
    .el-dialog__body {
      padding: 27px;
      .el-form-item__label {
        text-align: left;
      }
    }
    .img_txm {
      height: 40px;
      width: 100%;
      cursor: pointer;
    }
  }
  .dialog-footer {
    text-align: center;
  }
  .el-col-offset-1 {
    height: 40px;
  }
  .el-dialog__header {
    text-align: center;
    padding: 10px;
    background: linear-gradient(to right, rgb(1, 197, 250), rgb(19, 148, 250));
  }

  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>