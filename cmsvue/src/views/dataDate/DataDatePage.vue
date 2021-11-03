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
              <router-link class="nav-link" to="/data">Data</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/dataDate">Data Date</router-link>
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
      <div
        class="alert"
        :class="{ [`${alertDataDate.class}`]: alertCheck }"
        role="alert"
        v-if="alertCheck"
      >{{ alertDataDate.text }}</div>
      <div class="container-add-data-date">
        <button class="btn-add-data-date" @click="btnAddToggleFunc(true)">
          <fa icon="plus" style="margin-right: 8px;" />add
        </button>
        <FormAddDataDate :btnAddToggle="btnAddToggle" />
      </div>
      <div class="container-seach-data-date">
        <div class="header-search-data-date">
          <div>Search</div>
          <hr />
        </div>
        <SearchDataDate />
      </div>
      <div class="container-table-data-date">
        <TableDataDate :items="dataDateItem" />
      </div>
    </main>
    <div class="modal" tabindex="-1" v-if="popUpCheck">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Data Date</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="popUpCheckFunc(false)"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              Are you sure you want to delete the column by id
              "
              <b>{{ deleteDataDateItem.id }}</b>" ?
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="popUpCheckFunc(false)"
            >Close</button>
            <button type="button" class="btn btn-danger" @click="deleteDataDate()">delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logoutUser } from "../../api";
import FormAddDataDate from "../../components/dataDate/FormAddDataDate.vue";
import SearchDataDate from "../../components/dataDate/SearchDataDate.vue";
import TableDataDate from "./TableDataDate.vue";
import { mapState } from "vuex";

export default {
  name: "DataDatePage",
  components: { FormAddDataDate, SearchDataDate, TableDataDate },
  computed: mapState({
    dataDateItem: (state) => state.dataDate.all,
    deleteDataDateItem: (state) => state.dataDate.deleteDataDateItem,
    alertDataDate: (state) => state.dataDate.alertDataDate,
    btnAddToggle: (state) => state.dataDate.btnAddToggle,
    popUpCheck: (state) => state.dataDate.popUpCheck,
    alertCheck: (state) => state.dataDate.alertCheck,
  }),
  mounted() {
    if (!localStorage.getItem("token")) {
      return this.$router.push("login");
    }
    this.$store.dispatch("dataDate/getDataDate");
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
    deleteDataDate() {
      this.alertDeleteDataDate(true);
      setTimeout(() => {
        this.alertDeleteDataDate(false);
      }, 1500);
      this.$store.dispatch("dataDate/alertDataDateFunc", { class: "alert-primary", text: "Data Deleted" });
      this.$store.dispatch("dataDate/deleteDataDateFunc", this.deleteDataDateItem.idDataDate);
      this.popUpCheckFunc(false);
    },
    alertDeleteDataDate(toggle) {
      this.$store.dispatch("dataDate/changeAlertCheck", toggle);
    },
    btnAddToggleFunc(toggle) {
      this.$store.dispatch("dataDate/changeBtnAddToggle", toggle);
    },
    popUpCheckFunc(toggle) {
      this.$store.dispatch("dataDate/changePopUpCheck", toggle);
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

.btn-add-data-date {
  border: none;
  outline: none;
  padding: 7px 12px;
  color: white;
  background: #457ab2;
  border-radius: 5px;
  margin-bottom: 20px;
}

.header-search-data-date div {
  font-size: 30px;
}

.header-search-data-date hr {
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
  width: 100%;
}
</style>
