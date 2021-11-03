<template>
    <div>
        <h1>Data Date Line Chart</h1>
        <canvas id="lineChart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { mapState } from "vuex";

export default {
    name: 'LineChart',
    computed: mapState({
        dataItem: (state) => state.dataDate.all,
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

            const grouped = groupBy(data, item => {
                return item.letter.split("-").shift()
            });

            let dataLength = data.map((m) => {
                return m.letter.split("-").shift()
            })

            let frequencyData = []

            let filteredDataLength = dataLength.filter(function (item, index) {
                if (dataLength.indexOf(item) == index)
                    return item;
            });

            filteredDataLength.sort().forEach(item => {
                frequencyData.push(grouped.get(item));
            });

            let filteredFrequencyData = frequencyData.map((m) => {
                return m.map(item => item.frequency).reduce((prev, next) => prev + next);
            })

            let letterData = []

            frequencyData.forEach((m) => {
                return m.forEach(item => {
                    letterData.push(item.letter.split("-").shift())
                })
            })

            let filteredLetterData = letterData.filter(function (item, index) {
                if (letterData.indexOf(item) == index)
                    return item;
            });

            var dataItemObj = {
                labels: filteredLetterData,
                datasets: [
                    {
                        label: 'Data Date Line Chart',
                        data: filteredFrequencyData,
                        fill: false,
                        borderColor: 'rgb(70,130,180)',
                        backgroundColor: 'rgb(70,130,180)',
                        tension: 0.1
                    }]
            };

            const ctx = document.getElementById('lineChart');
            new Chart(ctx, {
                type: 'line',
                data: dataItemObj,
            });
        }
    },
    mounted() {
        this.$store.dispatch("dataDate/getDataDate");
    }
}
</script>

<style scoped>
h1 {
    color: rgb(126, 125, 125);
    text-align: center;
    font-weight: bold;
    margin-top: 50px;
}

#lineChart {
    width: 900px;
    margin: 40px auto;
}
</style>