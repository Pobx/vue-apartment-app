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
                <!-- {{room.utilities_packages_items}} -->
                <b-link
                  v-for="(utilities, index) in room.utilities_packages_items"
                  :key="index"
                  :to="link_to_form+'/'+room.id+'/'+utilities.id"
                  class="btn btn-primary btn-block"
                >{{ utilities.name }}</b-link>

                <b-link
                  :to="link_to_monthly_usages+'/'+room.id"
                  class="btn btn-warning btn-block"
                >{{ btn_monthly_usages_views_label }}</b-link>

                <b-link
                  :to="link_to_monthly_bills+'/'+room.id"
                  class="btn btn-success btn-block"
                >{{ btn_monthly_bill_views_label }}</b-link>
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
      btn_monthly_usages_views_label: "รายการบันทึกข้อมูล",
      btn_monthly_bill_views_label: "รายการบิล",
      room_label: "ห้อง",
      link_to_form: "utilities-monthly-usages-form",
      link_to_monthly_usages: "utilities-rooms-monthly-usages",
      link_to_monthly_bills: "utilities-rooms-monthly-bills"
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
          console.log(this.rooms);
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