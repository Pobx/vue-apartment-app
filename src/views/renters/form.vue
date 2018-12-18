<template>
  <div class="animated fadeIn">
    <b-card header="ข้อมูล ผู้เช่า">
      <b-form v-on:submit.prevent="onSubmit" autocomplete="off">
        <b-row>
          <b-col md="12" class="text-right">
            <b-link :to="link_to_table" class="btn btn-danger mr-sm-2">{{ link_to_table_label }}</b-link>
            <b-button class="btn btn-success">{{ submit_form_label }}</b-button>
          </b-col>
        </b-row>

        <br>
        <b-row>
          <b-col md="2">
            <b-img
              thumbnail
              fluid
              src="https://picsum.photos/250/250/?image=54"
              alt="Thumbnail"
              class="mb-sm-2"
            />

            <b-form-file v-model="form.image" placeholder="เลือกไฟล์..."></b-form-file>
          </b-col>

          <b-col md="10">
            <b-form-group
              id="inline_id_card"
              horizontal
              :label-cols="1"
              :label="inline_id_card"
              label-for="inline_id_card"
            >
              <b-col sm="4">
                <b-form-input id="inline_id_card" required v-model="form.id_card"></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_prefix_categories"
              horizontal
              :label-cols="1"
              :label="inline_prefix_categories"
              label-for="inline_prefix_categories"
            >
              <b-col sm="4">
                <b-form-select
                  id="inline_prefix_categories"
                  v-model="form.prefix"
                  :options="prefix_categories_options"
                ></b-form-select>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_fullname"
              horizontal
              :label-cols="1"
              :label="inline_fullname"
              label-for="inline_fullname"
            >
              <b-col sm="4">
                <b-form-input id="inline_fullname" required v-model="form.fullname"></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_birthday"
              horizontal
              :label-cols="1"
              :label="inline_birthday"
              label-for="inline_birthday"
            >
              <b-col sm="4">
                <b-form-input id="inline_birthday" required v-model="form.birthday"></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_document_file"
              horizontal
              :label-cols="1"
              :label="inline_document_file"
              label-for="inline_document_file"
            >
              <b-col sm="4">
                <b-form-file v-model="form.document" placeholder="เลือกไฟล์..."></b-form-file>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_address"
              horizontal
              :label-cols="1"
              :label="inline_address"
              label-for="inline_address"
            >
              <b-col sm="4">
                <b-form-textarea id="inline_address" v-model="form.address" :rows="3" :max-rows="6"></b-form-textarea>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_mobile"
              horizontal
              :label-cols="1"
              :label="inline_mobile"
              label-for="inline_mobile"
            >
              <b-col sm="4">
                <b-form-input id="inline_mobile" required v-model="form.mobile"></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_email"
              horizontal
              :label-cols="1"
              :label="inline_email"
              label-for="inline_email"
            >
              <b-col sm="4">
                <b-form-input id="inline_email" required v-model="form.email"></b-form-input>
              </b-col>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12" class="text-right">
            <b-link :to="link_to_table" class="btn btn-danger mr-sm-2">{{ link_to_table_label }}</b-link>
            <b-button class="btn btn-success">{{ submit_form_label }}</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { getRenters, setRenters } from "@/shared/renters-services";

export default {
  data: () => {
    return {
      form: {
        id: 0,
        id_card: null,
        image: null,
        prefix: null,
        fullname: null,
        birthday: null,
        document: null,
        address: null,
        mobile: null,
        email: null
      },
      prefix_categories_options: [
        { text: "นาย", value: "male" },
        { text: "นาง", value: "female" },
        { text: "นางสาว", value: "female" }
      ],
      fields: [
        // A column that needs custom formatting
        { key: "index", label: "#", class: "text-center" },
        {
          key: "name",
          label: "ชื่อ - สกุล",
          sortable: true,
          class: "text-center"
        },
        { key: "room_numbers", label: "หมายเลขห้อง", class: "text-center" },
        { key: "link_file", label: "ไฟล์เอกสาร", class: "text-center" },
        { key: "edit", label: "แก้ไข", class: "text-center" }
      ],
      items: [],
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      link_to_table_label: "ยกเลิก",
      link_to_table: "setting/renters",
      submit_form_label: "บันทึก",
      inline_id_card: "บัตรประชาชน",
      inline_prefix_categories: "คำนำหน้า",
      inline_fullname: "ชื่อ - สกุล",
      inline_birthday: "วันเกิด",
      inline_document_file: "ไฟล์เอกสาร",
      inline_address: "ที่อยู่",
      inline_mobile: "เบอร์มือถือ",
      inline_email: "อีเมล์"
    };
  },
  created() {
    // this.getRenters();
  },
  methods: {
    getRenters() {
      getRenters()
        .then(response => {
          this.items = response.data;
          this.totalRows = this.items.length;
          // console.log(this.items);
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