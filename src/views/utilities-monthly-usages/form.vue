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
        meter_numbers: "",
        usage_amount: "",
        total_price: "",
        status: "active"
      },
      utilities_monthly_usage: [],
      price_per_unit_cost: 1,
      price_per_unit: 1,
      unit_min_rate: 1,
      unit_min_price: 1,
      latest_amount: 0,
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
      if (this.form.meter_numbers == "" || this.form.usage_amount == "" || this.form.total_price == "") {
        this.showNotifications({
          message: "พิมพ์ เลขมิเตอร์",
          type: "warn"
        });

        return false;
      }

      console.log(this.form);
    },
    getRoomsById(id) {
      getRoomsById(id)
        .then(response => {
          let results = response.data;
          let apartments_name = results.apartments.name || null;
          let rooms_name = results.name || null;
          this.header_form = `${apartments_name} ห้อง ${rooms_name}`;

          this.price_per_unit_cost =
            results.room_categories.price_per_unit_cost;
          this.price_per_unit = results.room_categories.price_per_unit;
          this.unit_min_rate = results.room_categories.unit_min_rate;
          this.unit_min_price = results.room_categories.unit_min_price;
          // this.latest_amount = results.utilities_monthly_usage.latest_amount || 0;

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
          // console.log(results);
        })
        .catch(e => this.showNotifications({ message: e }));
    }
  },
  watch: {
    "form.meter_numbers": function(newValue, oldValue) {
      if (newValue == "") {
        this.form.usage_amount = "";
        this.form.total_price = "";
      }

      if (parseFloat(newValue) > parseFloat(this.latest_amount)) {
        this.form.usage_amount =
          parseFloat(newValue) - parseFloat(this.latest_amount);

        if (this.form.usage_amount <= this.unit_min_rate) {
          this.form.total_price = this.unit_min_price;
        } else {
          this.form.total_price = parseFloat(
            this.form.usage_amount * parseFloat(this.price_per_unit_cost)
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