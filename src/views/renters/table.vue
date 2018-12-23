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
            <template
              slot="room_numbers"
              slot-scope="data"
            >{{ data.item.rooms | room_numbers }}</template>
            <template slot="id_card" slot-scope="data">{{ data.item.id_card }}</template>
            <template
              slot="name"
              slot-scope="data"
            >{{ data.item.first_name }}&nbsp;{{ data.item.last_name }}</template>
            <template slot="mobile" slot-scope="data">{{ data.item.mobile }}</template>
            <template slot="email" slot-scope="data">{{ data.item.email }}</template>
            
            <template slot="edit" slot-scope="data">
              <router-link :to="{ path: 'renters-form/' + data.item.id}">{{ data.field.label }}</router-link>
              <!-- <b-btn
                size="sm"
                variant="warning"
                v-on:click="setDataToForm(data)"
              >{{ data.field.label }}</b-btn> -->
            </template>
          </b-table>

          <b-pagination size="md" :total-rows="totalRows" v-model="currentPage" :per-page="perPage"></b-pagination>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { getRenters, setRenters } from "@/shared/renters-services";
export default {
  filters: {
    room_numbers: function(data) {
      // if (typeof data.name != null && typeof data.name !='undefined') {
      //   return data.name;
      // }
      // return typeof data.name;
    }
  },
  data: () => {
    return {
      form: {
        id: 0,
        name: null
      },
      fields: [
        // A column that needs custom formatting
        { key: "index", label: "#", class: "text-center" },
        { key: "room_numbers", label: "หมายเลขห้อง", class: "text-center" },
        { key: "id_card", label: "เลขบัตรประชาชน", class: "text-center" },
        {
          key: "name",
          label: "ชื่อ - สกุล",
          sortable: true,
          class: "text-center"
        },
        { key: "mobile", label: "เบอร์มือถือ", class: "text-center" },
        { key: "email", label: "อีเมล์", class: "text-center" },
        { key: "edit", label: "แก้ไข", class: "text-center" }
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
          console.log(this.items);
        })
        .catch(e => console.log(e));
    },

    setDataToForm(data) {
      // console.log(data.item);
      this.form.id = data.item.id;
      this.form.name = data.item.name;
    },

    onSubmit() {
      if (this.form.name == null) {
        alert("พิมพ์ชื่อ Apartment ด้วยค่ะ");
        return false;
      }

      setRenters(this.form)
        .then(response => {
          // console.log(response);
          this.getRenters();
          this.onReset();
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
  }
};
</script>