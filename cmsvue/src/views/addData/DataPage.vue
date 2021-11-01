<template>
  <div class="container-fluid" style="padding: 0">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/home" style="opacity: 0.5">Content Management System</router-link>
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
              <router-link class="nav-link" aria-current="page" to="/home">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/data">Data</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/dataDate">Data Date</router-link>
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
          >Logout</button>
        </div>
      </div>
    </nav>
    <main>
      <div class="container-add-data">
        <button class="btn-add-data" @click="btnAddToggleFunc(true)">
          <fa icon="plus" />add
        </button>
        <FormAddData :btnAddToggle="btnAddToggle" />
      </div>
      <div class="container-seach-data">
        <div class="header-search-data">
          <div>Search</div>
          <hr />
        </div>
        <SearchAddData />
      </div>
      <div class="container-table-data">
        <TableAddData :items="dataItem" />
      </div>
      <div class="alert alert-danger" role="alert" v-if="alertCheck">Input tidak boleh kosong !</div>
    </main>
    <div class="modal" tabindex="-1" v-if="popUpCheck">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Data</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete the data ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger">delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logoutUser } from "../../api";
import FormAddData from "../../components/addData/FormAddData.vue";
import SearchAddData from "../../components/addData/SearchAddData.vue";
import TableAddData from "./TableAddData.vue";
import { mapState } from "vuex";

export default {
  name: "DataPage",
  components: { FormAddData, SearchAddData, TableAddData },
  data() {
    return {
      popUpCheck: false,
      alertCheck: false,
    };
  },
  computed: mapState({
    dataItem: (state) => state.data.all,
    btnAddToggle: (state) => state.data.btnAddToggle,
  }),
  mounted() {
    if (!localStorage.getItem("token")) {
      return this.$router.push("login");
    }
    this.$store.dispatch("data/getData");
  },
  methods: {
    logout() {
      logoutUser(localStorage.getItem("token"))
        .then(() => {
          localStorage.removeItem("token");
          return this.$router.push("login");
        })
        .catch((err) => {
          return console.log(err);
        });
    },
    btnAddToggleFunc(toggle) {
      this.$store.dispatch("data/changeBtnAddToggle", toggle);
    }
  },
};
</script>

<style scoped>
.active {
  background: #000;
  border-radius: 5px;
}

.nav-link {
  padding: 10px;
  display: table;
  width: auto;
}

main {
  position: relative;
  width: 97%;
  max-width: 1000px;
  color: #000;
  margin: 40px auto;
}

.btn-add-data {
  border: none;
  outline: none;
  padding: 7px 12px;
  color: white;
  background: #457ab2;
  border-radius: 5px;
  margin-bottom: 20px;
}

.header-search-data div {
  font-size: 30px;
}

.header-search-data hr {
  margin-top: 0;
}

.modal {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  background: rgb(0, 0, 0, 0.3);
  color: black;
}

.modal-dialog {
  margin: auto !important;
}

.alert {
  position: absolute;
  top: -15px;
  right: 0;
}
</style>
