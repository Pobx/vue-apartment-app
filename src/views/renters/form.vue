<template>
  <div class="animated fadeIn">
    <b-form v-on:submit.prevent="onSubmit" autocomplete="off">
      <b-card header="ข้อมูล ผู้เช่า">
        <b-row>
          <b-col md="12" class="text-right">
            <b-link :to="link_to_table" class="btn btn-danger mr-sm-2">{{ link_to_table_label }}</b-link>
            <b-button class="btn btn-success">{{ submit_form_label }}</b-button>
          </b-col>
        </b-row>

        <br>

        <b-row>
          <b-col md="3">
            <b-img
              thumbnail
              fluid-grow
              src="https://picsum.photos/250/250/?image=54"
              alt="Thumbnail"
              class="mb-sm-3"
            />

            <b-form-file v-model="form.new_file" placeholder="เลือกไฟล์..."></b-form-file>
          </b-col>

          <b-col md="9">
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
              id="inline_first_name"
              horizontal
              :label-cols="1"
              :label="inline_first_name"
              label-for="inline_first_name"
            >
              <b-col sm="4">
                <b-form-input id="inline_first_name" required v-model="form.first_name"></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_last_name"
              horizontal
              :label-cols="1"
              :label="inline_last_name"
              label-for="inline_last_name"
            >
              <b-col sm="4">
                <b-form-input id="inline_last_name" required v-model="form.last_name"></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_date_of_birth"
              horizontal
              :label-cols="1"
              :label="inline_date_of_birth"
              label-for="inline_date_of_birth"
            >
              <b-col sm="4">
                <b-form-input id="inline_date_of_birth" required v-model="form.date_of_birth"></b-form-input>
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
      </b-card>

      <b-card header="ข้อมูลติดต่อฉุกเฉิน">
        <b-form inline>
          <label for="inline_contact_mobile">{{ inline_contact_mobile }}</label>
          <b-input
            class="mb-2 mr-sm-2 ml-sm-2 mb-sm-0 col-sm-4"
            id="inline_contact_mobile"
            v-model="form_contact.mobile"
          />

          <label for="inline_contact_fullname">{{ inline_contact_fullname }}</label>
          <b-input
            class="mb-2 mr-sm-2 ml-sm-2 mb-sm-0 col-sm-4"
            id="inline_contact_fullname"
            v-model="form_contact.fullname"
          />

          <b-button variant="primary">{{ button_add_new_contact_label }}</b-button>
        </b-form>

        <br>

        <b-row>
          <b-col md="12">
            <b-table
              bordered
              hover
              responsive="true"
              :items="items"
              :fields="fields"
            >
              <template slot="index" slot-scope="data">{{ data.index + 1 }}</template>
              <template slot="remove" slot-scope="data">
                <b-btn
                  size="sm"
                  variant="danger"
                  v-on:click="setDataToForm(data)"
                >{{ data.field.label }}</b-btn>
              </template>
            </b-table>
          </b-col>
        </b-row>

        <br>

        <b-row>
          <b-col md="12" class="text-right">
            <b-link :to="link_to_table" class="btn btn-danger mr-sm-2">{{ link_to_table_label }}</b-link>
            <b-button type="submit" class="btn btn-success">{{ submit_form_label }}</b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-form>
  </div>
</template>

<script>
import { getRenterProfileById, setRenters } from "@/shared/renters-services";

export default {
  data: () => {
    return {
      form: {
        id: 0,
        id_card: null,
        first_name: null,
        last_name: null,
        new_file: null,
        old_file: null,
        prefix: null,
        date_of_birth: null,
        document: null,
        address: null,
        mobile: null,
        email: null
      },
      form_contact: {
        mobile: null,
        fullname: null
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
        { key: "mobile", label: "เบอร์ติดต่อ", class: "text-center" },
        { key: "remove", label: "ลบ", class: "text-center" }
      ],
      items: [],
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      link_to_table_label: "ยกเลิก",
      link_to_table: "/setting/renters",
      submit_form_label: "บันทึก",
      inline_id_card: "บัตรประชาชน",
      inline_prefix_categories: "คำนำหน้า",
      inline_first_name: "ชื่อ",
      inline_last_name: 'สกุล',
      inline_date_of_birth: "วันเกิด",
      inline_document_file: "ไฟล์เอกสาร",
      inline_address: "ที่อยู่",
      inline_mobile: "เบอร์มือถือ",
      inline_email: "อีเมล์",
      inline_contact_mobile: "เบอร์มือถือ",
      inline_contact_fullname: "ชื่อ - สกุล",
      button_add_new_contact_label: "เพิ่มข้อมูล"
    };
  },
  created() {
    this.getRenterProfileById();
  },
  methods: {
    getRenterProfileById() {
      this.form.id = this.$route.params.id || 0;
      getRenterProfileById(this.form.id)
        .then(response => {
          this.form = response.data
          this.form.old_file = response.data.attached_file_image;
          console.log(this.form);
        })
        .catch(e => console.log(e));
    },

    onSubmit() {
      setRenters(this.form)
        .then(response => {
          console.log(response);
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
        status: 'active'
      };
    }
  }
};
</script>