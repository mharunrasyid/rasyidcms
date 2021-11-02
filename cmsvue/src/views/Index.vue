<template>
  <div class="container-fluid" style="padding:0;">
    <header>
      <fa icon="bookmark" />
      <div class="title">Welcome to Dashboard</div>
    </header>
    <main>
      <div class="content">
        <router-link to="/line" class="item" style="background: #ca5c55">
          <fa icon="signal" />
          <div>Line</div>
        </router-link>
        <router-link to="/pie" class="item" style="background: #e6af5f">
          <fa icon="chart-pie" />
          <div>Pie</div>
        </router-link>
        <router-link to="/bar" class="item" style="background: #457ab2">
          <fa icon="chart-bar" />
          <div>Bar</div>
        </router-link>
        <router-link to="/map" class="item" style="background: #74b467">
          <fa icon="globe-americas" />
          <div>Maps</div>
        </router-link>
        <router-link to="/login" class="item item-admin" style="background: #75beda">
          <fa icon="user" />
          <div>Admin Panel</div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Index",
};
</script>

<style scoped>
.container {
  color: white;
}

header {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  background: #457ab2;
  padding: 7px 15px;
  align-items: center;
  font-weight: bold;
}

.title {
  margin-left: 10px;
}

main {
    box-sizing: border-box;
    padding: 8px 15px;
    border: 2px solid #457ab2;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.content {
  max-width: 1000px;
  margin: auto;
}

a {
  display: flex;
  background: aqua;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin: 8px 0;
  text-decoration: none;
  color: white;
}

a div {
  margin-top: 5px;
}

.item-admin {
  flex-direction: row;
  justify-content: center;
}

.item-admin div {
  margin-left: 7px;
}
</style>
