<template>
  <div class="card" :class="{ 'card-active': btnAddToggle }">
    <div class="card-header">
      <form action class="form-add-map" v-on:submit.prevent="addData">
        <div class="container-input-add-map">
          <label for="title-add-input">Title</label>
          <input type="text" id="title-add-input" v-model="title" required placeholder="title of map" />
        </div>
        <div class="container-input-add-map">
          <label for="lat-add-input">Latitude</label>
          <input
            type="number"
            id="lat-add-input"
            placeholder="0.0000"
            step="any"
            v-model="lat"
            required
          />
        </div>
        <div class="container-input-add-map">
          <label for="lng-add-input">Longitude</label>
          <input
            type="number"
            id="lng-add-input"
            placeholder="0.0000"
            step="any"
            v-model="lng"
            required
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormAddMap",
  props: ["btnAddToggle"],
  data() {
    return {
      title: "",
      lat: "",
      lng: "",
    };
  },
  methods: {
    addData() {
      this.alertAddMap(true);
      setTimeout(() => {
        this.alertAddMap(false);
      }, 1500);
      this.$store.dispatch("map/alertMapFunc", { class: "alert-primary", text: "Data Added" });
      this.$store.dispatch("map/addMap", { title: this.title, lat: this.lat, lng: this.lng });
      this.title = "";
      this.lat = "";
      this.lng = "";
      this.btnAddToggleFunc(false)
    },
    alertAddMap(toggle) {
      this.$store.dispatch("map/changeAlertCheck", toggle);
    },
    btnAddToggleFunc(toggle) {
      this.$store.dispatch("map/changeBtnAddToggle", toggle);
    }
  },
};
</script>

<style scoped>
.card {
  display: none;
}

.card-header {
  padding: 18px 20px;
}

.form-add-map {
  display: flex;
  align-items: center;
}

.container-input-add-map label,
.container-input-add-map input {
  margin-right: 15px;
}

.container-input-add-map label {
  font-weight: bold;
}

.container-input-add-map input {
  border: none;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
  padding: 6px 15px;
  border-radius: 5px;
}

.form-add-map button {
  border: none;
  outline: none;
  padding: 7px 12px;
  border-radius: 5px;
  color: #000;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
}

.card-active {
  display: flex;
  margin-bottom: 25px;
}
</style>
