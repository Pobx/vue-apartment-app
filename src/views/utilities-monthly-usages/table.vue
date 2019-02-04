<template>
  <div class="animated fadeIn">
    <b-card no-body>
      <b-tabs card v-model="tabIndex">
        <b-tab v-for="(apartment, index) in apartments" :key="index" :title="apartment.name" @click="getRooms(apartment.id)">Tab Contents 1</b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { getApartments, setApartments } from "@/shared/apartments-services";
export default {
  data: () => {
    return {
      tabIndex: 0,
      apartments: []
    };
  },
  created() {
    this.getApartments();
    this.getRooms(1);
  },
  methods: {
    getApartments() {
      getApartments()
        .then(response => {
          this.apartments = response.data;
          console.log(this.apartments);
          this.totalRows = this.apartments.length;
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    getRooms(id = null) {
      console.log(id);
    }
  },
  notifications: {
    showNotifications: {
      title: "ระบบแจ้งเตือน",
      message: "เกิดข้อผิดพลาด...โปรดติดต่อผู้ดูแลระบบ",
      type: "error"
    }
  }
};
</script>