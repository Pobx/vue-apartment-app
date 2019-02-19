<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" md="6">
        <b-card :header="header_form">
          <b-table
            bordered
            hover
            responsive="true"
            :current-page="currentPage"
            :per-page="perPage"
            :items="utilities_monthly_usage"
            :fields="fields"
          >
            <template slot="index" slot-scope="data">{{ data.index + 1 }}</template>
            <template
              slot="utility_memo_date_th"
              slot-scope="data"
            >{{ data.item.utility_memo_monthly_th}}</template>

            <template slot="download" slot-scope="data">
              <b-btn size="sm" variant="success" v-on:click="Download(data)">{{ data.field.label }}</b-btn>
            </template>
          </b-table>

          <b-link :to="link_to_table" class="btn btn-warning float-right">{{ link_to_table_label }}</b-link>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { getBillsByRoomsId } from "@/shared/bills-services";

export default {
  data: () => {
    return {
      form: {
        id: 0,
        room_id: null,
        utility_categories_id: null,
        latest_unit_amount: "",
        current_unit_amount: "",
        unit_amount: "",
        total_price: "",
        price_per_unit: "",
        status: "disabled"
      },
      fields: [
        { key: "index", label: "#", class: "text-center" },
        {
          key: "utility_memo_date_th",
          label: "เดือน",
          class: "text-center"
        },
        { key: "download", label: "ดาวน์โหลด", class: "text-center" }
      ],
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      utilities_monthly_usage: [],
      header_form: null,
      link_to_table: "/utilities-monthly-usages",
      link_to_table_label: "ย้อนกลับ"
    };
  },
  created() {
    this.form.room_id = this.$route.params.rooms_id || 0;
    if (this.form.room_id != 0) {
      this.getBillsByRoomsId(this.form.room_id);
      return false;
    }

    this.$router.go(-1);
  },
  methods: {
    Download(data) {
      this.form.id = data.item.id;
      this.form.price_per_unit = data.item.price_per_unit;
      this.form.room_id = data.item.room_id;
      this.form.total_price = data.item.total_price;
      this.form.unit_amount = data.item.unit_amount;
      this.form.utility_categories_id = data.item.utility_categories_id;
      this.form.current_unit_amount = data.item.current_unit_amount;
      this.form.latest_unit_amount = data.item.latest_unit_amount;
    },

    getBillsByRoomsId(rooms_id) {
      getBillsByRoomsId(rooms_id)
        .then(response => {
          console.log(response);
          let results = response.data;
          let apartments_name = results.apartments.name || null;
          let rooms_name = results.name || null;

          this.utilities_monthly_usage = results.utilities_monthly_usage;
          this.header_form = `${apartments_name} ห้อง ${rooms_name}`;
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