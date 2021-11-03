<template>
  <tr>
    <th>
      <div class="text">{{ index + 1 }}</div>
    </th>
    <td>
      <div v-if="!inputEditCheck" class="text">{{ item.letter }}</div>
      <input type="text" class="inputLetter" :data-idTableData="item._id" v-model="letter" v-else />
    </td>
    <td>
      <div v-if="!inputEditCheck" class="text">{{ item.frequency }}</div>
      <input
        type="number"
        class="inputFrequency"
        :data-idTableData="item._id"
        v-model="frequency"
        step="any"
        v-else
      />
    </td>
    <td>
      <div v-if="!inputEditCheck">
        <button type="button" class="btn btn-success" @click="inputEditCheck = true">
          <fa icon="pen" class="icon" />Update
        </button>
        <button
          type="button"
          class="btn btn-danger"
          :data-idTableData="item._id"
          @click="popUpCheckFunc(true, $event)"
        >
          <fa icon="trash-alt" class="icon" />Delete
        </button>
      </div>
      <div v-else>
        <button
          type="button"
          class="btn btn-primary"
          :data-idTableData="item._id"
          @click="editInputData($event)"
        >Save</button>
        <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
      </div>
    </td>
  </tr>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TableItemData",
  props: ["item", "index"],
  data() {
    return {
      inputEditCheck: false,
      letter: this.item.letter,
      frequency: this.item.frequency,
    };
  },
  computed: mapState({
    alertCheck: (state) => state.data.alertCheck,
  }),
  methods: {
    editInputData(event) {
      let inputLetter = document.querySelector(".inputLetter")
      let inputFrequency = document.querySelector(".inputFrequency")
      this.$store.dispatch("data/alertDataFunc", { class: "alert-danger", text: "Input Cannot Be Empty !" });

      this.alertEditData(true)
      this.inputEditCheck = true;
      if (!inputLetter.value && !inputFrequency.value) {
        inputLetter.classList.add("danger-input");
        inputFrequency.classList.add("danger-input");
      } else if (!inputLetter.value) {
        inputLetter.classList.add("danger-input");
        inputFrequency.classList.remove("danger-input");
      } else if (!inputFrequency.value) {
        inputLetter.classList.remove("danger-input");
        inputFrequency.classList.add("danger-input");
      } else {
        setTimeout(() => {
          this.alertEditData(false)
        }, 1500);
        this.inputEditCheck = false;
        this.$store.dispatch("data/alertDataFunc", { class: "alert-primary", text: "Data Updated" });
        this.$store.dispatch("data/editDataFunc", { idData: event.target.getAttribute('data-idTableData'), letter: inputLetter.value, frequency: Number(inputFrequency.value) });
        inputLetter.classList.remove("danger-input");
        inputFrequency.classList.remove("danger-input");
      }
    },
    cancelEdit() {
      this.inputEditCheck = false;
      this.alertEditData(false)
      this.letter = this.item.letter
      this.frequency = this.item.frequency
    },
    alertEditData(toggle) {
      this.$store.dispatch("data/changeAlertCheck", toggle);
    },
    popUpCheckFunc(toggle, event) {
      this.$store.dispatch("data/changeDeleteDataItem", { id: this.index + 1, idData: event.target.getAttribute('data-idTableData') });
      this.$store.dispatch("data/changePopUpCheck", toggle);
    }
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
}

th {
  width: 10px;
}

td {
  width: 100px;
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

.danger-input {
  border: 2px solid rgb(245, 126, 126);
  background: rgb(246, 215, 218);
}
</style>
