<template>
  <div class="card" :class="{ 'card-active': btnAddToggle }">
    <div class="card-header">
      <form action class="form-add-data" v-on:submit.prevent="addData">
        <div class="container-input-add-data">
          <label for="letter-add-input">Letter</label>
          <input type="text" id="letter-add-input" v-model="letter" placeholder="A" required />
        </div>
        <div class="container-input-add-data">
          <label for="frequency-add-input">Frequency</label>
          <input
            type="number"
            id="frequency-add-input"
            placeholder="0.0000"
            step="any"
            v-model="frequency"
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
  name: "FormAddData",
  props: ["btnAddToggle"],
  data() {
    return {
      letter: "",
      frequency: "",
    };
  },
  methods: {
    addData() {
      this.alertAddData(true);
      setTimeout(() => {
        this.alertAddData(false);
      }, 1500);
      this.$store.dispatch("data/alertDataFunc", { class: "alert-primary", text: "Data Added" });
      this.$store.dispatch("data/addData", { letter: this.letter, frequency: this.frequency });
      this.letter = "";
      this.frequency = "";
      this.btnAddToggleFunc(false)
    },
    alertAddData(toggle) {
      this.$store.dispatch("data/changeAlertCheck", toggle);
    },
    btnAddToggleFunc(toggle) {
      this.$store.dispatch("data/changeBtnAddToggle", toggle);
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

.form-add-data {
  display: flex;
  align-items: center;
}

.container-input-add-data label,
.container-input-add-data input {
  margin-right: 15px;
}

.container-input-add-data label {
  font-weight: bold;
}

.container-input-add-data input {
  border: none;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
  padding: 6px 15px;
  border-radius: 5px;
}

.form-add-data button {
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
