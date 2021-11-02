<template>
    <div>
        <canvas id="barChart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { mapState } from "vuex";

export default {
    name: 'BarChart',
    computed: mapState({
        dataItem: (state) => state.data.all,
    }),
    watch: {
        dataItem: function (dataItem) {
            let data = JSON.parse(JSON.stringify(dataItem))
            function groupBy(list, keyGetter) {
                const map = new Map();
                list.forEach((item) => {
                    const key = keyGetter(item);
                    const collection = map.get(key);
                    if (!collection) {
                        map.set(key, [item]);
                    } else {
                        collection.push(item);
                    }
                });
                return map;
            }

            const grouped = groupBy(data, item => item.letter);

            let dataLength = data.map((m) => {
                return m.letter
            })

            let frequencyData = []

            let filteredDataLength = dataLength.filter(function (item, index) {
                if (dataLength.indexOf(item) == index)
                    return item;
            });

            filteredDataLength.sort((a, b) => a.localeCompare(b)).forEach(item => {
                frequencyData.push(grouped.get(item));
            });

            let filteredFrequencyData = frequencyData.map((m) => {
                return m.map(item => item.frequency).reduce((prev, next) => prev + next);
            })

            let letterData = []

            frequencyData.forEach((m) => {
                return m.forEach(item => {
                    letterData.push(item.letter)
                })
            })

            let filteredLetterData = letterData.filter(function (item, index) {
                if (letterData.indexOf(item) == index)
                    return item;
            });

            const dataItemObj = {
                labels: filteredLetterData,
                datasets: [{
                    label: 'Data Bar Chart',
                    data: filteredFrequencyData,
                    backgroundColor: 'rgb(70,130,180)',

                }]
            };

            const ctx = document.getElementById('barChart');
            new Chart(ctx, {
                type: 'bar',
                data: dataItemObj,
            });
        }
    },
    mounted() {
        this.$store.dispatch("data/getData");
    }
}
</script>

<style scoped>
#barChart {
    width: 900px;
    margin: 100px auto;
}
</style>