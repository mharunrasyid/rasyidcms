<template>
  <form
    action=""
    class="form-add-data form-edit-data"
    v-on:submit.prevent="searchData"
  >
    <div class="container-input-add-data">
      <label for="letter-seacrh-input">Letter</label>
      <input
        type="text"
        id="letter-seacrh-input"
        placeholder="A"
        v-model="letter"
      />
    </div>
    <div class="container-input-add-data">
      <label for="frequency-seacrh-input">Frequency</label>
      <input
        type="number"
        id="frequency-seacrh-input"
        placeholder="0.0000"
        step="any"
        v-model="frequency"
      />
    </div>
    <button type="submit" style="display: none"></button>
  </form>
</template>

<script>
export default {
  name: "SearchData",
  data() {
    return {
      letter: "",
      frequency: "",
    };
  },
  methods: {
    searchData() {
      this.$store.dispatch("data/searchingData",{ letter:this.letter, frequency:this.frequency});
    },
  },
};
</script>

<style scoped>
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

.container-seach-data {
  margin-top: 25px;
}

.form-edit-data {
  margin-top: 25px;
}
</style>
