<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="login" autocomplete="off">
                  <h1>เข้าใช้งาน</h1>
                  <!-- <p class="text-muted">Sign In to your account</p> -->
                  <b-input-group class="mb-3 col-sm-10">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      v-model="form.username"
                    />
                  </b-input-group>

                  <b-input-group class="mb-4 col-sm-10">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      v-model="form.password"
                    />
                  </b-input-group>

                  <b-row>
                    <b-col class="col-sm-10 text-right">
                      <b-button type="submit" variant="primary" class="px-4 mr-2">Login</b-button>
                    </b-col>
                    <!-- <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>-->
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <!-- <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>-->
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      returnUrl: ""
    };
  },
  created() {
    localStorage.removeItem("user");

    this.returnUrl = this.$route.query.returnUrl || '/';
  },

  methods: {
    login() {
      // console.log(this.form);
      if (this.form.username == "admin" && this.form.password == "admin") {
        let user = {
          id: 1,
          token: "95hvjrni"
        };

        localStorage.setItem("user", JSON.stringify(user));
        this.$router.push(this.returnUrl);
      } else {
        this.showNotifications({
          message: "Username และ Password ไม่ถูกต้อง",
        });
      }
    }
  },
  notifications: {
    showNotifications: {
      title: "ระบบแจ้งเตือน",
      message: "เกิดข้อผิดพลาด...โปรดติดต่อผู้ดูแลระบบ",
      type: "error"
    }
  }
};
</script>
