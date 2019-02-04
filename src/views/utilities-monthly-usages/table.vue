<template>
  <div class="animated fadeIn">
    <b-card no-body>
      <b-tabs card v-model="tabIndex">
        <b-tab
          v-for="(apartment, index) in apartments"
          :key="index"
          :title="apartment.name"
          @click="getRoomsByApartmentsId(apartment.id)"
        >
          <b-row>
            <b-col cols="12" sm="2" md="2" lg="2" v-for="(room, index) in rooms" :key="index">
              <b-card :title="room_label+ ' ' +room.name" style="max-width: 15rem;">
                <!-- <p class="card-text">{{ room_label }}&nbsp;{{ room.name }}</p> -->
                <b-link
                  :to="link_to_form+'/'+room.id"
                  class="btn btn-primary btn-block"
                >{{ btn_monthly_usages_label }}</b-link>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { getApartments, setApartments } from "@/shared/apartments-services";
import { getRoomsByApartmentsId } from "@/shared/rooms-services";
export default {
  data: () => {
    return {
      tabIndex: 0,
      apartments: [],
      rooms: [],
      btn_monthly_usages_label: "บันทึกข้อมูล",
      room_label: "ห้อง",
      link_to_form: "utilities-monthly-usages-form"
    };
  },
  created() {
    this.getApartments();
    this.getRoomsByApartmentsId(1);
  },
  methods: {
    getApartments() {
      getApartments()
        .then(response => {
          this.apartments = response.data;
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    getRoomsByApartmentsId(id = null) {
      getRoomsByApartmentsId(id)
        .then(response => {
          let results = response.data;
          this.rooms = results.filter(value => value.room_categories_id == "2");
        })
        .catch(e => this.showNotifications({ message: e }));
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