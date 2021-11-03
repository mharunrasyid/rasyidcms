<template>
  <tr>
    <th>
      <div class="text">{{ index + 1 }}</div>
    </th>
    <td>
      <div v-if="!inputEditCheck" class="text">{{ item.title }}</div>
      <input type="text" class="inputTitle" :data-idTableMap="item._id" v-model="title" v-else />
    </td>
    <td>
      <div v-if="!inputEditCheck" class="text">{{ item.lat }}</div>
      <input
        type="number"
        class="inputLat"
        :data-idTableMap="item._id"
        v-model="lat"
        step="any"
        v-else
      />
    </td>
    <td>
      <div v-if="!inputEditCheck" class="text">{{ item.lng }}</div>
      <input
        type="number"
        class="inputLng"
        :data-idTableMap="item._id"
        v-model="lng"
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
          :data-idTableMap="item._id"
          @click="popUpCheckFunc(true, $event)"
        >
          <fa icon="trash-alt" class="icon" />Delete
        </button>
      </div>
      <div v-else>
        <button
          type="button"
          class="btn btn-primary"
          :data-idTableMap="item._id"
          @click="editInputMap($event)"
        >Save</button>
        <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
      </div>
    </td>
  </tr>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TableItemMap",
  props: ["item", "index"],
  data() {
    return {
      inputEditCheck: false,
      title: this.item.title,
      lat: this.item.lat,
      lng: this.item.lng,
    };
  },
  computed: mapState({
    alertCheck: (state) => state.map.alertCheck,
  }),
  methods: {
    editInputMap(event) {
      let inputTitle = document.querySelector(".inputTitle")
      let inputLat = document.querySelector(".inputLat")
      let inputLng = document.querySelector(".inputLng")
      this.$store.dispatch("map/alertMapFunc", { class: "alert-danger", text: "Input Cannot Be Empty !" });

      this.alertEditMap(true)
      this.inputEditCheck = true;

      let inputEditMap = document.querySelectorAll("td input")

      inputEditMap.forEach(m => {
        if (m.value == "") {
          m.classList.add("danger-input");
        } else {
          m.classList.remove("danger-input");
        }
      })

      if (inputTitle.value != "" && inputLat.value != "" && inputLng.value != "") {
        setTimeout(() => {
          this.alertEditMap(false)
        }, 1500);
        this.inputEditCheck = false;
        this.$store.dispatch("map/alertMapFunc", { class: "alert-primary", text: "Data Updated" });
        this.$store.dispatch("map/editMapFunc", { idMap: event.target.getAttribute('data-idTableMap'), title: inputTitle.value, lat: Number(inputLat.value), lng: Number(inputLng.value) });
      }
    },
    cancelEdit() {
      this.inputEditCheck = false;
      this.alertEditMap(false)
      this.title = this.item.title
      this.lat = this.item.lat
      this.lng = this.item.lng
    },
    alertEditMap(toggle) {
      this.$store.dispatch("map/changeAlertCheck", toggle);
    },
    popUpCheckFunc(toggle, event) {
      this.$store.dispatch("map/changeDeleteMapItem", { id: this.index + 1, idMap: event.target.getAttribute('data-idTableMap') });
      this.$store.dispatch("map/changePopUpCheck", toggle);
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
