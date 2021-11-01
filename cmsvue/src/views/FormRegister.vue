<template>
  <div class="container">
    <div class="sub-container">
      <header>
        <router-link to="/login" class="form-btn"> Login </router-link>
        <router-link to="/register" style="color: #579c66" class="form-btn">
          Register
        </router-link>
      </header>
      <main>
        <form v-on:submit.prevent="registerForm">
          <input v-model="email" type="email" placeholder="Email" required />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
          />
          <input
            v-model="retypepass"
            type="password"
            placeholder="Confirm Password"
            required
          />
          <button type="submit">REGISTER NOW</button>
        </form>
      </main>
    </div>
  </div>
</template>

<script>
import { register } from "../api";

export default {
  name: "FormRegister",
  data() {
    return {
      email: "",
      password: "",
      retypepass: "",
    };
  },
  methods: {
    registerForm: function () {
      register(this.email, this.password, this.retypepass)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          this.$router.push("home");
        })
        .catch((err) => {
          console.log(err);
        });
      this.email = "";
      this.password = "";
      this.retypepass = "";
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  padding: 0 20px;
  height: 100vh;
}

.sub-container {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 5px;
  margin: auto;
  width: 100%;
  max-width: 700px;
  padding: 0 20px;
}

header {
  display: flex;
  width: 90%;
  padding: 15px;
  font-weight: bold;
  font-size: 20px;
  margin: auto;
  justify-content: space-around;
  border-bottom: 1px solid rgb(223, 223, 223);
}

header .form-btn,
header .form-btn:hover {
  color: #787b7d;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

form input {
  color: grey;
  margin-bottom: 15px;
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 5px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}

form button {
  width: 100%;
  max-width: 270px;
  margin: auto;
  border: none;
  padding: 15px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  outline: none;
  background: #6fb0db;
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>
