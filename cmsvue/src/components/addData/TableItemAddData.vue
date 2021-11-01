<template>
  <tr>
    <!-- <form style="display: block"> -->
    <th>
      <div class="text">{{ index + 1 }}</div>
    </th>
    <td>
      <div v-if="!inputEditCheck" class="text">{{ item.letter }}</div>
      <input type="text" v-model="letter" v-else />
    </td>
    <td>
      <div v-if="!inputEditCheck" class="text">{{ item.frequency }}</div>
      <input type="number" v-model="frequency" step="any" v-else />
    </td>
    <td>
      <div v-if="!inputEditCheck">
        <button
          type="button"
          class="btn btn-success"
          @click="inputEditCheck = true"
        >
          <fa icon="pen" class="icon" />
          Update
        </button>
        <button type="button" class="btn btn-danger" @click="popUpCheck = true">
          <fa icon="trash-alt" class="icon" />
          Delete
        </button>
      </div>
      <button
        type="button"
        class="btn btn-secondary"
        @click="inputEditCheck = true"
        v-else
      >
        Save
      </button>
    </td>
    <!-- </form> -->
  </tr>
</template>

<script>
export default {
  name: "TableItemAddData",
  props: ["item", "index"],
  data() {
    return {
      inputEditCheck: false,
      letter: this.item.letter,
      frequency: this.item.frequency,
    };
  },
};
</script>

<style scoped>
td button {
  margin-right: 5px;
}

button .icon {
  font-size: 15px;
  margin-right: 5px;
}

td .text,
th .text {
  margin-top: 6px;
  /* background: red; */
}

th {
  width: 10px;
}

td {
  width: 100px;
    /* background: #000; */
}

td input {
  margin-top: 1px;
  width: 80%;
  max-width: none;
  border: none;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
  padding: 6px 15px;
  border-radius: 5px;
}
</style>
