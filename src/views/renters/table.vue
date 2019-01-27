<template>
  <div class="animated fadeIn">
    <b-card header="รายการ ผู้เช่า">
      <b-row>
        <b-col md="12" class="text-right">
          <b-link :to="link_to_form" class="btn btn-primary">{{ link_to_form_label }}</b-link>
        </b-col>
      </b-row>

      <br>

      <b-row>
        <b-col md="12">
          <b-table
            bordered
            hover
            responsive="true"
            :current-page="currentPage"
            :per-page="perPage"
            :items="items"
            :fields="fields"
          >
            <template slot="index" slot-scope="data">{{ data.index + 1 }}</template>
            <template slot="rooms" slot-scope="data">
              <span v-for="(room, index) in data.item.rooms" :key="index">
                <span v-if="index > 0">,</span>
                {{ room.name }}
              </span>
            </template>
            <template slot="id_card" slot-scope="data">{{ data.item.id_card }}</template>
            <template
              slot="name"
              slot-scope="data"
            >{{ data.item.first_name }}&nbsp;{{ data.item.last_name }}</template>
            <template slot="mobile" slot-scope="data">{{ data.item.mobile }}</template>
            <template slot="email" slot-scope="data">{{ data.item.email }}</template>

            <template slot="edit" slot-scope="data">
              <router-link
                :to="{ path: 'renters-form/' + data.item.id}"
                class="btn btn-warning btn-sm"
              >{{ data.field.label }}</router-link>
            </template>

            <template slot="status" slot-scope="data">
              <b-btn
                v-if="data.item.status =='disabled'"
                size="sm"
                variant="success"
                v-on:click="onUpdateRentersStatus(data.item.id, 'active')"
              >ON</b-btn>

              <b-btn
                v-if="data.item.status =='active'"
                size="sm"
                variant="danger"
                v-on:click="onUpdateRentersStatus(data.item.id, 'disabled')"
              >OFF</b-btn>
            </template>
          </b-table>

          <b-pagination size="md" :total-rows="totalRows" v-model="currentPage" :per-page="perPage"></b-pagination>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  getRenters,
  setRenters,
  updateRentersStatus
} from "@/shared/renters-services";
export default {
  data: () => {
    return {
      form: {
        id: 0,
        name: null
      },
      fields: [
        // A column that needs custom formatting
        { key: "index", label: "#", class: "text-center" },
        { key: "rooms", label: "หมายเลขห้อง", class: "text-center" },
        { key: "id_card", label: "เลขบัตรประชาชน", class: "text-center" },
        {
          key: "name",
          label: "ชื่อ - สกุล",
          sortable: true,
          class: "text-center"
        },
        { key: "mobile", label: "เบอร์มือถือ", class: "text-center" },
        { key: "email", label: "อีเมล์", class: "text-center" },
        { key: "edit", label: "แก้ไข", class: "text-center" },
        { key: "status", label: "", class: "text-center" }
      ],
      items: [],
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      link_to_form_label: "เพิ่มใหม่",
      link_to_form: "renters-form"
    };
  },
  created() {
    this.getRenters();
  },
  methods: {
    getRenters() {
      getRenters()
        .then(response => {
          this.items = response.data;
          this.totalRows = this.items.length;
        })
        .catch(e => console.log(e));
    },

    onUpdateRentersStatus(id, status) {
      let params = {
        id,
        status
      };

      updateRentersStatus(params)
        .then(response => {
          this.getRenters();
          this.onReset();
          this.showNotifications({
            message: "บันทึกข้อมูลสำเร็จ",
            type: "success"
          });
        })
        .catch(e => {
          this.onReset();
          console.log(e);
        });
    },

    onReset() {
      this.form = {
        id: 0,
        name: null
      };
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