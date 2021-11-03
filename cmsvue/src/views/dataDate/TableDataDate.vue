<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Letter</th>
        <th scope="col">Frequency</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <TableItemDataDate
        :key="item.id"
        :item="item"
        :index="index"
        v-for="(item, index) in items"
      />
    </tbody>
  </table>
</template>

<script>
import TableItemDataDate from "../../components/dataDate/TableItemDataDate.vue";

export default {
  name: "TableDataDate",
  props: ["items"],
  components: { TableItemDataDate },
};
</script>

<style scoped>
table {
  margin-top: 30px;
}
</style>
