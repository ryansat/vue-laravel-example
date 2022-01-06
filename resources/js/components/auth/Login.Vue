<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div v-if="loginFailed" class="alert alert-danger">
          Email atau Password Anda salah.
        </div>
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>LOGIN</h4>
            <hr />
            <form @submit.prevent="login">
              <div class="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  placeholder="Email Address"
                />
              </div>
              <div v-if="validation.email" class="mt-2 alert alert-danger">
                {{ validation.email[0] }}
              </div>

              <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <div v-if="validation.password" class="mt-2 alert alert-danger">
                {{ validation.password[0] }}
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                LOGIN
              </button>
              <button
                v-on:click="register"
                type="button"
                class="btn btn-primary btn-block"
              >
                REGISTER
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { reactive, ref } from 'vue'
// import { useRouter } from 'vue-router'
import axios from "axios";
export default {
  data() {
    return {
      post: {},
      email: "",
      password: "",
      loginFailed: "",
      validation: [],
    };
  },
  methods: {
    register() {
      this.$router.push({
        name: "register",
      });
    },
    login() {
      //inisialisasi vue router on Composition API
      // const router = useRouter()

      //state user
      // const user = reactive({
      //     email: '',
      //     password: '',
      // })

      // //state validation
      const validation = [];

      // //state loginFailed
      // const loginFailed = ref(null)

      //define variable
      let email = this.email;
      let password = this.password;

      //send server with axios
      axios
        .post("http://localhost:8000/api/login", {
          email,
          password,
        })
        .then((response) => {
          console.log(response.data.success);

          localStorage.setItem("token", response.data.token[0].api_token);
          var token = localStorage.getItem("token");
          console.log(response.data);
          //redirect ke halaman dashboard
          this.$router.push({
            name: "dashboard",
          });

          //set state loggedIn to true
          loginFailed.value = true;
        })
        .catch((error) => {
          //set validation dari error response
          validation.value = error.response;
        });
    },
  },
};
</script>
