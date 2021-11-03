<template>
  <form
    action=""
    class="form-add-data-date form-edit-data-date"
    v-on:submit.prevent="searchDataDate"
  >
    <div class="container-input-add-data-date">
      <label for="letter-seacrh-input">Letter</label>
      <input
        type="date"
        id="letter-seacrh-input"
        v-model="letter"
      />
    </div>
    <div class="container-input-add-data-date">
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
  name: "SearchDataDate",
  data() {
    return {
      letter: "",
      frequency: "",
    };
  },
  methods: {
    searchDataDate() {
      this.$store.dispatch("dataDate/searchingDataDate",{ letter:this.letter, frequency:this.frequency});
    },
  },
};
</script>

<style scoped>
.form-add-data-date {
  display: flex;
  align-items: center;
}

.container-input-add-data-date label,
.container-input-add-data-date input {
  margin-right: 15px;
}

.container-input-add-data-date label {
  font-weight: bold;
}

.container-input-add-data-date input {
  border: none;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
  padding: 6px 15px;
  border-radius: 5px;
}

.container-seach-data-date {
  margin-top: 25px;
}

.form-edit-data-date {
  margin-top: 25px;
}
</style>
