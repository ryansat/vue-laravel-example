<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>REGISTER</h4>
            <hr />
            <form @submit.prevent="register">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      v-model="name"
                      class="form-control"
                      placeholder="Full Name"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      v-model="email"
                      class="form-control"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      v-model="password"
                      class="form-control"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Konfirmasi Password</label>
                    <input
                      type="password"
                      v-model="password_confirmation"
                      class="form-control"
                      placeholder="Konfirmasi Password"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-block">
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
import axios from "axios";
export default {
  data() {
    return {
      post: {},
      email: "",
      password: "",
      validation: [],
      name: "",
      password_confirmation: "",
    };
  },
  methods: {
    register() {
      //define variable
      let name = this.name;
      let email = this.email;
      let password = this.password;
      let password_confirmation = this.password_confirmation;
      console.log(name);
      //send server with axios
      axios
        .post("http://localhost:8000/api/register", {
          name,
          email,
          password,
          password_confirmation,
        })
        .then((response) => {
          //redirect ke halaman login
          //console.log("Response : " + response.data.email);
          this.$router.push({
            name: "login",
          });
        })
        .catch((error) => {
          //set validation dari error response
          //   validation.value = error.response.data;
          console.log(error.data);
        });
    },
  },
};
</script>