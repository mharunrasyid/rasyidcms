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
      <TableItemData
        :key="item.id"
        :item="item"
        :index="index"
        v-for="(item, index) in items"
      />
    </tbody>
  </table>
</template>

<script>
import TableItemData from "../../components/data/TableItemData.vue";

export default {
  name: "TableData",
  props: ["items"],
  components: { TableItemData },
};
</script>

<style scoped>
table {
  margin-top: 30px;
}
</style>
