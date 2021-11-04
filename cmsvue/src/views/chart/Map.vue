<template>
    <div id="container">
        <div id="mapContainer"></div>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from 'leaflet';
import { mapState } from "vuex";

export default {
    name: "Map",
    data() {
        return {
            center: [37, 7749, -122, 4194]
        }
    },
    computed: mapState({
        dataItem: (state) => state.map.all,
    }),
    watch: {
        dataItem: function (dataItem) {
            let data = JSON.parse(JSON.stringify(dataItem))
            let locations = []
            data.forEach((m) => {
                locations.push([m.title, m.lat, m.lng]);
            })

            let positionMap = []

            locations.forEach((m) => {
                positionMap.push([m[1], m[2]])
            });

            const map = L.map('mapContainer').fitBounds(positionMap);
            let mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
            L.tileLayer(
                'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + mapLink + ' Contributors',
                maxZoom: 18,
            }).addTo(map);


            for (var i = 0; i < locations.length; i++) {
                L.marker([locations[i][1], locations[i][2]], { icon: new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] }) })
                    .bindPopup(`<h5 style="font-weight:bold;margin-bottom: 3px;">${locations[i][0]}</h5><spa style="font-size:16px;">this is marker for ${locations[i][0]}</spa>`, {
                        offset: [0, -35], closeOnClick: false, autoClose: false
                    })
                    .addTo(map).openPopup()
            }
        }
    },
    mounted() {
        this.$store.dispatch("map/getMap");
    },
};
</script>

<style scoped>
#mapContainer {
    width: 100%;
    height: 100vh;
}
</style>
