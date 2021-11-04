<template>
    <div>
        <h1>Data Pie Chart</h1>
        <canvas id="pieChart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { mapState } from "vuex";

export default {
    name: 'PieChart',
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

            let backgroundChart = [
                "#98ACC4",
                "#8A89A5",
                "#7B6887",
                "#6A496A",
                "#AAAE88",
                "#DFA17C",
                "#9AC6B8",
                "#43333F",
                "#C98A7F",
                "#7A927F",
                "#9E8688",
                "#999DA0",
            ]

            var dataItemObj = {
                labels: filteredLetterData,
                datasets: [
                    {
                        data: filteredFrequencyData,
                        backgroundColor: backgroundChart
                    }]
            };

            const ctx = document.getElementById('pieChart');
            new Chart(ctx, {
                type: 'pie',
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
h1 {
    color: rgb(126, 125, 125);
    text-align: center;
    font-weight: bold;
    margin-top: 50px;
}

#pieChart {
    width: 600px;
    margin: 40px auto;
}
</style>