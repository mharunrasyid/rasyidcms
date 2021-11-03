<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Latitude</th>
        <th scope="col">Longitude</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <TableItemMap
        :key="item.id"
        :item="item"
        :index="index"
        v-for="(item, index) in items"
      />
    </tbody>
  </table>
</template>

<script>
import TableItemMap from "../../components/map/TableItemMap.vue";

export default {
  name: "TableMap",
  props: ["items"],
  components: { TableItemMap },
};
</script>

<style scoped>
table {
  margin-top: 30px;
}
</style>
