<template>
  <div class="container-fluid" style="padding: 0">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/home" style="opacity: 0.5">
          Content Management System
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                class="nav-link active"
                aria-current="page"
                to="/home"
              >
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/data">Data</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/dataDate">
                Data Date
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/maps">Maps</router-link>
            </li>
          </ul>
          <button
            type="button"
            class="btn btn-dark"
            style="background: black"
            @click="logout()"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
    <main>
      <div class="card">
        <div class="card-header">Welcome, {{ emailUser }}</div>
      </div>
    </main>
  </div>
</template>

<script>
import { userToken, logoutUser } from "../api";

export default {
  name: "adminPage",
  data() {
    return {
      emailUser: "",
    };
  },
  mounted() {
    if (!localStorage.getItem("token")) {
      return this.$router.push("login");
    }

    userToken(localStorage.getItem("token"))
      .then((res) => {
        this.emailUser = res.data.email;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    logout() {
      logoutUser(localStorage.getItem("token"))
        .then(() => {
          localStorage.removeItem("token")
          return this.$router.push("login");
        })
        .catch((err) => {
         return console.log(err);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active {
  background: #000;
  border-radius: 5px;
  padding: 10px;
  display: table;
  width: auto;
}
.card {
  width: 95%;
  max-width: 1000px;
  margin: 30px auto;
}
.card-header {
  padding: 20px 15px;
  color: black;
  font-size: 28px;
  font-weight: bold;
}
</style>
