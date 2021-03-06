<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" md="6">
        <b-card :header="header_form">
          <b-form v-on:submit.prevent="onSubmit" autocomplete="off">
            <b-form-group
              id="inline_latest_unit_amount"
              horizontal
              :label-cols="4"
              :label="inline_latest_unit_amount"
              label-for="inline_latest_unit_amount"
            >
              <b-col sm="8">
                <b-form-input
                  id="inline_latest_unit_amount"
                  type="number"
                  v-model="form.latest_unit_amount"
                  readonly
                ></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_current_unit_amount"
              horizontal
              :label-cols="4"
              :label="inline_current_unit_amount"
              label-for="inline_current_unit_amount"
            >
              <b-col sm="8">
                <b-form-input
                  id="inline_current_unit_amount"
                  type="number"
                  v-model="form.current_unit_amount"
                ></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_unit_amount"
              horizontal
              :label-cols="4"
              :label="inline_unit_amount"
              label-for="inline_unit_amount"
            >
              <b-col sm="8">
                <b-form-input id="inline_unit_amount" type="number" v-model="form.unit_amount"></b-form-input>
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
                <b-link :to="link_to_table" class="btn btn-danger mr-sm-2">{{ link_to_table_label }}</b-link>
                <b-button type="submit" class="ml-sm-2" variant="success">{{ submit_form_label }}</b-button>
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
import { setMonthlyUsage } from "@/shared/utilities-monthly-usage-services";

export default {
  data: () => {
    return {
      form: {
        id: 0,
        room_id: null,
        utility_categories_id: null,
        latest_unit_amount: 0,
        current_unit_amount: "",
        unit_amount: "",
        total_price: "",
        price_per_unit: "",
        status: "active"
      },
      utilities_monthly_usage: [],
      unit_min_rate: 1,
      unit_min_price: 1,
      utilities_packages_items: null,
      header_form: null,
      inline_latest_unit_amount: "เลขมิเตอร์ล่าสุด",
      inline_current_unit_amount: "เลขมิเตอร์ที่ใช้ไป",
      inline_unit_amount: "ยอดการใช้งาน",
      inline_total_price: "คิดเป็นเงิน",
      submit_form_label: "บันทึก",
      link_to_table_label: "ยกเลิก",
      link_to_table: "/utilities-monthly-usages"
    };
  },
  created() {
    this.form.room_id = this.$route.params.rooms_id || 0;
    this.form.utility_categories_id =
      this.$route.params.utility_categories_id || 0;
    if (this.form.room_id != 0 && this.form.utility_categories_id != 0) {
      this.getRoomsById(this.form.room_id);
      return false;
    }
    this.$router.go(-1);
  },
  methods: {
    onSubmit() {
      if (
        this.form.current_unit_amount == "" ||
        this.form.unit_amount == "" ||
        this.form.total_price == ""
      ) {
        this.showNotifications({
          message: "พิมพ์ เลขมิเตอร์",
          type: "warn"
        });

        return false;
      }

      setMonthlyUsage(this.form)
        .then(response => {
          this.showNotifications({
            message: "บันทึกข้อมูลสำเร็จ",
            type: "success"
          });
          this.$router.go(-1);
        })
        .catch(e => this.showNotifications({ message: e }));
    },
    getRoomsById(id) {
      getRoomsById(id)
        .then(response => {
          let results = response.data;
          let apartments_name = results.apartments.name || null;
          let rooms_name = results.name || null;
          let utilities = results.utilities_monthly_usage;
          let list_utilities_id = utilities.map(value => {
            if (
              value.utility_categories_id == this.form.utility_categories_id
            ) {
              return value.id;
            }
          });

          let maxValue = Math.max(...list_utilities_id);
          let lastest_utilities_usages = utilities.filter(
            value => value.id == maxValue
          );

          let lastest_utilities_usages_object = Object.assign(
            {},
            ...lastest_utilities_usages
          );

          this.form.latest_unit_amount =
            lastest_utilities_usages_object.current_unit_amount || 0;

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

          this.form.price_per_unit = results.price_per_unit;
          this.unit_min_rate = results.unit_min_rate;
          this.unit_min_price = results.unit_min_price;
        })
        .catch(e => this.showNotifications({ message: e }));
    }
  },
  watch: {
    "form.current_unit_amount": function(newValue, oldValue) {
      if (newValue == "") {
        this.form.unit_amount = "";
        this.form.total_price = "";
      }

      if (parseFloat(newValue) > parseFloat(this.form.latest_unit_amount)) {
        this.form.unit_amount =
          parseFloat(newValue) - parseFloat(this.form.latest_unit_amount);

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