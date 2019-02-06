<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" md="6">
        <b-card :header="header_form">
          <b-form v-on:submit.prevent="onSubmit" autocomplete="off">
            <b-form-group
              id="inline_meter_numbers"
              horizontal
              :label-cols="4"
              :label="inline_meter_numbers"
              label-for="inline_meter_numbers"
            >
              <b-col sm="8">
                <b-form-input id="inline_meter_numbers" type="number" v-model="form.meter_numbers"></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_usage_amount"
              horizontal
              :label-cols="4"
              :label="inline_usage_amount"
              label-for="inline_usage_amount"
            >
              <b-col sm="8">
                <b-form-input id="inline_usage_amount" type="number" v-model="form.usage_amount"></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_total_price"
              horizontal
              :label-cols="4"
              :label="inline_total_price"
              label-for="inline_total_price"
            >
              <b-col sm="8">
                <b-form-input id="inline_total_price" type="number" v-model="form.total_price"></b-form-input>
              </b-col>
            </b-form-group>

            <b-row>
              <b-col sm="12" class="text-right">
                <input type="hidden" v-model="form.id">
                <b-button type="submit" class="ml-sm-2" variant="success">บันทึก</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { getRoomsById } from "@/shared/rooms-services";
import { getUtilitiesCategoriesById } from "@/shared/utilities-categories-services";

export default {
  data: () => {
    return {
      form: {
        id: 0,
        utility_categories_id: null,
        latest_amount: null,
        meter_numbers: null,
        usage_amount: null,
        total_price: null,
        status: "active"
      },
      utilities_packages_items: null,
      header_form: null,
      inline_meter_numbers: "เลขมิเตอร์",
      inline_usage_amount: "ยอดการใช้งาน",
      inline_total_price: "คิดเป็นเงิน"
    };
  },
  created() {
    this.form.id = this.$route.params.rooms_id || 0;
    this.form.utility_categories_id =
      this.$route.params.utility_categories_id || 0;
    if (this.form.id != 0 && this.form.utility_categories_id != 0) {
      this.getRoomsById(this.form.id);
      return false;
    }
    this.$router.go(-1);
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    },
    getRoomsById(id) {
      getRoomsById(id)
        .then(response => {
          let results = response.data;
          let apartments_name = results.apartments.name || null;
          let rooms_name = results.name || null;
          this.header_form = `${apartments_name} ห้อง ${rooms_name}`;
          this.getUtilitiesCategoriesById(this.form.utility_categories_id);
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    getUtilitiesCategoriesById(id) {
      getUtilitiesCategoriesById(id)
        .then(response => {
          let results = response.data;
          this.header_form = `${this.header_form} (<strong>${
            results.name
          }</strong>)`;
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