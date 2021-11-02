<template>
    <div style="padding: 5rem;">
        <button @click="a++">A</button>
        <button @click="b++">B</button>
        <p>{{ a }}</p>
        <p>{{ b }}</p>
        <p>{{ c }}</p>
    </div>
</template>

<script>
export default {
    name: "test",
    data: () => ({
        a: 1,
        b: 2
    }),
    computed: {
        c() {
            return this.a + this.b
        }
    }
}
</script>

<style scoped>
div {
    color: black;
}
</style>