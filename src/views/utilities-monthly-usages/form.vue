<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" md="6">
        <b-card :header="header_form">
          <b-form v-on:submit.prevent="onSubmit" autocomplete="off">
            <b-form-group
              id="inline_latest_amount"
              horizontal
              :label-cols="4"
              :label="inline_latest_amount"
              label-for="inline_latest_amount"
            >
              <b-col sm="8">
                <b-form-input id="inline_latest_amount" v-model="form.latest_amount"></b-form-input>
              </b-col>
            </b-form-group>

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

export default {
  data: () => {
    return {
      form: {
        id: 0,
        latest_amount: null,
        meter_numbers: null,
        usage_amount: null,
        total_price: null,
        status: "active"
      },
      header_form: "xxxx",
      inline_latest_amount: "เดือน",
      inline_meter_numbers: "เลขมิเตอร์",
      inline_usage_amount: "ยอดการใช้งาน",
      inline_total_price: "คิดเป็นเงิน"
    };
  },
  created() {
    this.form.id = this.$route.params.id || null;
    if (this.form.id == null) {
      this.$router.go(-1);
    }

    this.getRoomsById(this.form.id);
  },
  methods: {
    onSubmit() {},
    getRoomsById(id) {
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