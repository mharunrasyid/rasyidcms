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
              <router-link class="nav-link" to="/dataDate">Data Date</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/maps">Maps</router-link>
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
        :class="{ [`${alertMap.class}`]: alertCheck }"
        role="alert"
        v-if="alertCheck"
      >{{ alertMap.text }}</div>
      <div class="container-add-map">
        <button class="btn-add-map" @click="btnAddToggleFunc(true)">
          <fa icon="plus" style="margin-right: 8px;" />add
        </button>
        <FormAddMap :btnAddToggle="btnAddToggle" />
      </div>
      <div class="container-seach-map">
        <div class="header-search-map">
          <div>Search</div>
          <hr />
        </div>
        <SearchMap />
      </div>
      <div class="container-table-map">
        <TableMap :items="mapItem" />
      </div>
    </main>
    <div class="modal" tabindex="-1" v-if="popUpCheck">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Map</h5>
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
              <b>{{ deleteMapItem.id }}</b>" ?
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="popUpCheckFunc(false)"
            >Close</button>
            <button type="button" class="btn btn-danger" @click="deleteMap()">delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logoutUser } from "../../api";
import FormAddMap from "../../components/map/FormAddMap.vue";
import SearchMap from "../../components/map/SearchMap.vue";
import TableMap from "./TableMap.vue";
import { mapState } from "vuex";

export default {
  name: "MapPage",
  components: { FormAddMap, SearchMap, TableMap },
  computed: mapState({
    mapItem: (state) => state.map.all,
    deleteMapItem: (state) => state.map.deleteMapItem,
    alertMap: (state) => state.map.alertMap,
    btnAddToggle: (state) => state.map.btnAddToggle,
    popUpCheck: (state) => state.map.popUpCheck,
    alertCheck: (state) => state.map.alertCheck,
  }),
  mounted() {
    if (!localStorage.getItem("token")) {
      return this.$router.push("login");
    }
    this.$store.dispatch("map/getMap");
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
    deleteMap() {
      this.alertDeleteMap(true);
      setTimeout(() => {
        this.alertDeleteMap(false);
      }, 1500);
      this.$store.dispatch("map/alertMapFunc", { class: "alert-primary", text: "Data Deleted" });
      this.$store.dispatch("map/deleteMapFunc", this.deleteMapItem.idMap);
      this.popUpCheckFunc(false);
    },
    alertDeleteMap(toggle) {
      this.$store.dispatch("map/changeAlertCheck", toggle);
    },
    btnAddToggleFunc(toggle) {
      this.$store.dispatch("map/changeBtnAddToggle", toggle);
    },
    popUpCheckFunc(toggle) {
      this.$store.dispatch("map/changePopUpCheck", toggle);
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
  max-width: 1200px;
  color: #000;
  margin: 40px auto;
}

.btn-add-map {
  border: none;
  outline: none;
  padding: 7px 12px;
  color: white;
  background: #457ab2;
  border-radius: 5px;
  margin-bottom: 20px;
}

.header-search-map div {
  font-size: 30px;
}

.header-search-map hr {
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
