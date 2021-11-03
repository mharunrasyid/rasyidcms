<template>
  <form action class="form-add-map form-edit-map" v-on:submit.prevent="searchMap">
    <div class="container-input-add-map">
      <label for="title-search-input">Title</label>
      <input type="text" id="title-search-input" v-model="title" placeholder="title..."/>
    </div>
    <button type="submit" style="display: none"></button>
  </form>
</template>

<script>
export default {
  name: "SearchMap",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    searchMap() {
      this.$store.dispatch("map/searchingMap", this.title);
    },
  },
};
</script>

<style scoped>
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

.container-seach-map {
  margin-top: 25px;
}

.form-edit-map {
  margin-top: 25px;
}
</style>
