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
        <TableItemAddData :key="item.id" :item="item" :index="index" v-for="(item, index) in items" />
    </tbody>
  </table>
</template>

<script>
import TableItemAddData from "../../components/addData/TableItemAddData.vue";

export default {
  name: "TableAddData",
  props: ["items"],
  components: { TableItemAddData },
};
</script>

<style scoped>
table {
    margin-top: 30px;
}
</style>
