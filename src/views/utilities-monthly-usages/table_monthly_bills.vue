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

    <b-modal ref="previews_bills" size="lg" :title="previews_bills_label">
      <b-img :src="link_url" fluid alt="Responsive image"/>
      <div slot="modal-footer" class="w-100">
        <a :href="link_url" target="_blank" class="float-right btn btn-primary" download>ดาวน์โหลด</a>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  getBillsByRoomsId,
  getBillsByRoomsIdAndMonth
} from "@/shared/bills-services";

export default {
  data: () => {
    return {
      rooms_id: null,
      link_url: null,
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
      link_to_table_label: "ย้อนกลับ",
      previews_bills_label: 'ข้อมูลใบเสร็จ'
    };
  },
  created() {
    this.rooms_id = this.$route.params.rooms_id || 0;
    if (this.rooms_id != 0) {
      this.getBillsByRoomsId(this.rooms_id);
      return false;
    }

    this.$router.go(-1);
  },
  methods: {
    Download(data) {
      let rooms_id = data.item.room_id;
      let month = data.item.utility_memo_monthly_en;

      getBillsByRoomsIdAndMonth(rooms_id, month)
        .then(response => {
          let results = response.data;
          this.link_url = results.link_url;
          if (this.link_url != null) {
            this.$refs.previews_bills.show();
          }
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    getBillsByRoomsId(rooms_id) {
      getBillsByRoomsId(rooms_id)
        .then(response => {
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