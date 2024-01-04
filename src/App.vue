<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-danger bg-opacity-75">
    <a class="navbar-brand fw-bolder fs-2 ms-3" href="#">臺南旅遊網</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse text-end" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item me-xl-5">
          <select
            id="area"
            class="form-control"
            v-if="select.city.length"
            v-model="select.areaName"
            @change="
              removeMarker();
              updateMap();
            "
          >
            <option value="">-- Select One --</option>
            <option
              :value="a.AreaName"
              v-for="a in cityName.find((city) => city.CityName === select.city).AreaList"
              :key="a.AreaName"
            >
              {{ a.AreaName }}
            </option>
          </select>
        </li>
      </ul>
    </div>
  </nav>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-xl-9 col-sm-12">
        <div id="map"></div>
      </div>
      <!-- 使用vbind綁id -->
      <!-- https://blog.twtnn.com/2022/03/vuejsv-forid.html -->
      <div class="col-xl-3 col-sm-12">
        <div
          class="accordion"
          v-bind:id="'accordionExample' + index"
          v-for="(item, index) in data"
          :key="index"
        >
          <div class="accordion-item" v-if="item.district === select.areaName">
            <h2 class="accordion-header" v-bind:id="'heading' + index">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                v-bind:data-bs-target="'#collapse' + index"
                aria-expanded="false"
                v-bind:aria-controls="'collapse' + index"
              >
                {{ item.name }}
              </button>
            </h2>
            <div
              v-bind:id="'collapse' + index"
              class="accordion-collapse collapse"
              v-bind:aria-labelledby="'heading' + index"
              v-bind:data-bs-parent="'#accordionExample' + index"
            >
              <div class="accordion-body">
                <h5><i class="bi bi-geo-alt-fill text-danger fs-5"></i> 地址</h5>
                <blockquote>
                  <a
                    :href="`https://www.google.com.tw/maps/place/${item.address}`"
                    target="_blank"
                    title="Google Map"
                    >{{ item.address }}</a
                  >
                </blockquote>
                <h5><i class="bi bi-info-circle-fill text-danger fs-5"></i> 介紹</h5>
                <blockquote>{{ item.introduction }}</blockquote>
                <h5><i class="bi bi-calendar-event text-danger fs-5"></i> 營業時間</h5>
                <blockquote>{{ item.open_time }}</blockquote>
                <h5><i class="bi bi-telephone text-danger fs-5"></i> 電話</h5>
                <blockquote>
                  <a :href="`tel:${item.tel}`">{{ item.tel }}</a>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="col-xl-3 col-sm-12">
        <ul class="list-group">
          <template v-for="(item, key) in data" :key="key">
            <a class="list-group-item text-left" v-if="item.district === select.areaName">
              <h5>{{ item.name }}</h5>
              地址:
              <a
                href="https://www.google.com.tw/maps/place/${attraction.address}"
                target="_blank"
                >{{ item.address }}</a
              ><br />
              介紹：{{ item.introduction }} 電話：{{ item.tel }}
            </a>
          </template>
        </ul>
      </div> -->
    </div>
  </div>
  <ContactUs></ContactUs>
  <Footer></Footer>
</template>

<script>
// 匯入leaflet
import L from 'leaflet';
// 加入地區
import cityName from './assets/cityName.json';
// 加入ContactUs
import ContactUs from './components/ContactUs.vue';
// 加入Footer
import Footer from './components/Footer.vue';
// icon大小參數設定
const iconsConfig = {
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
};
const icons = {
  blue: new L.Icon({
    iconUrl:
      'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    ...iconsConfig,
  }),
};
let osmMap = {};

console.log(L);
export default {
  name: 'App',
  data: () => ({
    data: [],
    cityName,
    select: {
      city: '臺南市',
      areaName: '東區',
    },
  }),
  components: {
    ContactUs,
    Footer,
  },
  methods: {
    // 透過filter取得資料
    updateMap() {
      const attractions = this.data.filter((city) => city.district === this.select.areaName);
      console.log('att', attractions);
      attractions.forEach((attraction) => {
        const { lat, long } = attraction;
        L.marker([lat, long], { icon: icons.blue }).addTo(osmMap)
          .bindPopup(`<strong>${attraction.name}</strong><br>
        地址: <a href="https://www.google.com.tw/maps/place/${attraction.address}" target="_blank">${attraction.address}</a><br>
        電話: ${attraction.tel}<br>
          <small>最後更新時間: ${attraction.update_time}</small>`);
      });
      this.penTo(attractions[0]);
    },
    // 刪除原圖層
    removeMarker() {
      osmMap.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          osmMap.removeLayer(layer);
        }
      });
    },
    // 移動到新圖層位置
    penTo(item) {
      const { lat, long } = item;
      osmMap.panTo([lat, long]);
    },
  },
  mounted() {
    // eslint-disable-next-line operator-linebreak
    const url =
      'https://data.tainan.gov.tw/api/3/action/datastore_search_sql?sql=SELECT * from "d500829c-e3f1-4a45-b5ec-9a5a01415533"';
    // 使用axios取得遠端資料
    this.$http.get(url).then((response) => {
      this.data = response.data.result.records;
      console.log('data', this.data);
      this.updateMap();
    });
    osmMap = L.map('map', {
      center: [22.9970861, 120.2104083],
      zoom: 15,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '<a target="_blank" href="https://www.openstreetmap.org/">© OpenStreetMap 貢獻者</a>',
      maxZoom: 18,
    }).addTo(osmMap);
    // L.marker([25.03, 121.55], { icon: icons.blue }).addTo(osmMap);
  },
};
</script>

<style lang="scss">
@import 'bootstrap/scss/bootstrap';

#map {
  height: 100vh;
}

.home {
  position: relative;
}

.highlight {
  background: #e9ffe3;
}

.toolbox {
  height: 100vh;
  overflow-y: auto;

  a {
    cursor: pointer;
  }
}
@media screen and (max-width: 1200px) {
  #map {
    height: 60vh;
  }
}
</style>
