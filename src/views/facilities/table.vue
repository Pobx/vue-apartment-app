<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" md="4">
        <b-card :header="header_form">
          <b-form v-on:submit.prevent="onSubmit" autocomplete="off">
            <b-form-group
              id="inline_room_numbers"
              horizontal
              :label-cols="4"
              :label="inline_room_numbers"
              label-for="inline_room_numbers"
            >
              <b-col sm="8">
                <b-form-input id="inline_room_numbers" required v-model="form.room_numbers"></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_room_categories"
              horizontal
              :label-cols="4"
              :label="inline_room_categories"
              label-for="inline_room_categories"
            >
              <b-col sm="8">
                <b-form-radio-group
                  id="inline_room_categories"
                  v-model="form.room_categories"
                  :options="room_categories_options"
                ></b-form-radio-group>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_room_price"
              horizontal
              :label-cols="4"
              :label="inline_room_price"
              label-for="inline_room_price"
            >
              <b-col sm="8">
                <b-form-input
                  id="inline_room_price"
                  type="number"
                  required
                  v-model="form.room_price"
                ></b-form-input>
              </b-col>
            </b-form-group>

            <!-- <input type="hidden" v-model="form.id"> -->
            <!-- <b-button type="submit" class="ml-sm-2" variant="success">บันทึก</b-button> -->
          </b-form>
        </b-card>
      </b-col>

      <b-col sm="12" md="8">
        <b-card :header="header_table">
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
                <template slot="edit" slot-scope="data">
                  <b-btn
                    size="sm"
                    variant="warning"
                    v-on:click="setDataToForm(data)"
                  >{{ data.field.label }}</b-btn>
                </template>
              </b-table>

              <b-pagination
                size="md"
                :total-rows="totalRows"
                v-model="currentPage"
                :per-page="perPage"
              ></b-pagination>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { getRooms, setRooms } from "@/shared/rooms-services";
export default {
  data: () => {
    return {
      form: {
        id: 0,
        room_numbers: null,
        room_categories: 1,
        room_price: null
      },
      room_categories_options: [
        { text: "ห้องรายวัน", value: 1 },
        { text: "ห้องรายเดือ", value: 2 }
      ],
      fields: [
        // A column that needs custom formatting
        { key: "index", label: "#", class: "text-center" },
        {
          key: "name",
          label: "หมายเลขห้อง",
          sortable: true,
          class: "text-center"
        },
        {
          key: "categories_name",
          label: "ประเภท",
          sortable: true,
          class: "text-center"
        },
        {
          key: "price",
          label: "ราคา",
          sortable: true,
          class: "text-right"
        },
        {
          key: "status",
          label: "สถานะ",
          sortable: true,
          class: "text-center"
        },
        { key: "edit", label: "แก้ไข", class: "text-center" }
      ],
      items: [],
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      header_form: "ข้อมูลห้องพัก",
      header_table: "รายการ ห้องพัก",
      inline_room_numbers: "หมายเลขห้อง",
      inline_room_categories: "ประเภท",
      inline_room_price: "ราคา"
    };
  },
  created() {
    // this.getRooms();
  },
  methods: {
    getRooms() {
      getRooms()
        .then(response => {
          this.items = response.data;
          this.totalRows = this.items.length;
          // console.log(this.items);
        })
        .catch(e => console.log(e));
    },

    setDataToForm(data) {
      console.log(data.item);
      // this.form.id = data.item.id;
      // this.form.name = data.item.name;
    },

    onSubmit() {
      if (this.form.name == null) {
        alert("พิมพ์ชื่อ Apartment ด้วยค่ะ");
        return false;
      }

      setRooms(this.form)
        .then(response => {
          // console.log(response);
          this.getRooms();
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
        room_numbers: null
      };
    }
  }
};
</script>