<template>
    <form action="" v-on:submit.prevent="submit">
        <input type="date" class="input">
        <input type="submit" value="Subimt">
    </form>
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
    },
    methods:{
        submit(){
            let date = ["2004", "2022", "2003", "2001", "2023", "2015", "2012", "2021"]

            console.log(date.sort());
            console.log(document.querySelector(".input").value);
        }
    }
}
</script>

<style scoped>
div {
    color: black;
}
</style>