<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" md="6">
        <b-card :header="header_form">
          
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { getRoomsById } from "@/shared/rooms-services";
import { setMonthlyUsage } from "@/shared/utilities-monthly-usage-services";

export default {
  data: () => {
    return {
      form: {
        id: 0,
        room_id: null,
        utility_categories_id: null,
        meter_numbers: "",
        unit_amount: "",
        total_price: "",
        price_per_unit: "",
        status: "active"
      },
      utilities_monthly_usage: [],
      unit_min_rate: 1,
      unit_min_price: 1,
      latest_amount: 0,
      utilities_packages_items: null,
      header_form: null,
      inline_latest_amount: "เลขมิเตอร์ล่าสุด",
      inline_meter_numbers: "เลขมิเตอร์ที่ใช้ไป",
      inline_unit_amount: "ยอดการใช้งาน",
      inline_total_price: "คิดเป็นเงิน",
      submit_form_label: "บันทึก",
      link_to_table_label: "ยกเลิก",
      link_to_table: "/utilities-monthly-usages"
    };
  },
  created() {
    this.form.room_id = this.$route.params.rooms_id || 0;
    if (this.form.room_id != 0) {
      this.getRoomsById(this.form.room_id);
      return false;
    }

    this.$router.go(-1);
  },
  methods: {
    getRoomsById(id) {
      getRoomsById(id)
        .then(response => {
          let results = response.data;
          let apartments_name = results.apartments.name || null;
          let rooms_name = results.name || null;

          this.header_form = `${apartments_name} ห้อง ${rooms_name}`;
        })
        .catch(e => this.showNotifications({ message: e }));
    },
  },
  watch: {
    "form.meter_numbers": function(newValue, oldValue) {
      if (newValue == "") {
        this.form.unit_amount = "";
        this.form.total_price = "";
      }

      if (parseFloat(newValue) > parseFloat(this.latest_amount)) {
        this.form.unit_amount =
          parseFloat(newValue) - parseFloat(this.latest_amount);

        if (this.form.unit_amount <= this.unit_min_rate) {
          this.form.total_price = this.unit_min_price;
        } else {
          this.form.total_price = parseFloat(
            this.form.unit_amount * parseFloat(this.form.price_per_unit)
          );
        }
      }
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