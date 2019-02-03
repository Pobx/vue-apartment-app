<template>
  <div class="animated fadeIn">
    <b-form v-on:submit.prevent="onSubmit" autocomplete="off">
      <b-card header="ข้อมูล ผู้เช่า">
        <b-row>
          <b-col md="12" class="text-right">
            <b-link :to="link_to_table" class="btn btn-danger mr-sm-2">{{ link_to_table_label }}</b-link>
            <b-button type="submit" class="btn btn-success">{{ submit_form_label }}</b-button>
          </b-col>
        </b-row>

        <br>

        <b-row>
          <b-col md="3">
            <b-img-lazy
              thumbnail
              fluid-grow
              :src="image_path"
              alt="Thumbnail"
              class="mb-sm-3"
              v-if="image_path != null"
            />

            <b-form-file
              @change="onSelectedImage"
              placeholder="เลือกไฟล์..."
              v-show="uploadPercentage == 0"
            ></b-form-file>
            <input type="hidden" v-model="form.attached_file_image">
            <b-progress
              :value="uploadPercentage"
              variant="success"
              striped
              :animated="animate"
              class="mt-1"
              v-show="uploadPercentage != 0"
            ></b-progress>
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
                <masked-input
                  type="text"
                  class="form-control"
                  v-model="form.date_of_birth"
                  :mask="[/\d/, /\d/, '/', /\d/, /\d/,'/', /\d/, /\d/, /\d/, /\d/]"
                  :guide="false"
                ></masked-input>
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
                <masked-input
                  type="text"
                  class="form-control"
                  v-model="form.mobile"
                  :mask="[/\d/, /\d/,/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]"
                  :guide="false"
                ></masked-input>
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

    </b-form>
  </div>
</template>

<script>
import { getRenterProfileById, setRenters } from "@/shared/renters-services";
import { uploadImages } from "@/shared/uploads-services";

export default {
  data: () => {
    return {
      form: {
        id: 0,
        id_card: null,
        first_name: null,
        last_name: null,
        attached_file_image: null,
        prefix: null,
        date_of_birth: null,
        address: null,
        mobile: null,
        email: null,
        status: "active"
      },
      prefix_categories_options: [
        { text: "เลือกรายการ", value: null },
        { text: "นาย", value: "mister" },
        { text: "นาง", value: "miss" },
        { text: "นางสาว", value: "mrs" }
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
        { key: "edit", label: "แก้ไข", class: "text-center" },
        { key: "remove", label: "ลบ", class: "text-center" }
      ],
      partners: [],
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      link_to_table_label: "ยกเลิก",
      link_to_table: "/setting/renters",
      submit_form_label: "บันทึก",
      inline_id_card: "บัตรประชาชน",
      inline_prefix_categories: "คำนำหน้า",
      inline_first_name: "ชื่อ",
      inline_last_name: "สกุล",
      inline_date_of_birth: "วันเกิด",
      inline_address: "ที่อยู่",
      inline_mobile: "เบอร์มือถือ",
      inline_email: "อีเมล์",
      image_path: "default_image/no-image.png",
      uploadPercentage: 0,
      animate: true,
      file_path: null
    };
  },
  created() {
    this.form.id = this.$route.params.id || 0;
    if (this.form.id != 0) {
      this.getRenterProfileById();
    }
  },
  methods: {
    getRenterProfileById() {
      getRenterProfileById(this.form.id)
        .then(response => {
          this.form = response.data;
          this.image_path = response.data.image_path;
          this.attached_name = response.data.attached_file_name;

          if (this.attached_name != null) {
            this.file_path = response.data.attached_file_path;
            this.attached_file_id = response.data.attached_file_id;
          }
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    onSubmit() {
      setRenters(this.form)
        .then(response => {
          this.onReset();
          this.showNotifications({
            message: "บันทึกข้อมูลสำเร็จ",
            type: "success"
          });
          this.$router.go(-1);
        })
        .catch(e => {
          this.onReset();
          this.showNotifications({ message: e });
        });
    },

    onReset() {
      this.form = {
        id: 0,
        status: "active"
      };
    },

    onSelectedImage(event) {
      const config = {
        onUploadProgress: progressEvent =>
          (this.uploadPercentage =
            Math.round(progressEvent.loaded / progressEvent.total) * 100)
      };

      let image = event.target.files[0];
      let fd = new FormData();
      fd.append("image", image, image.name);

      uploadImages(fd, config)
        .then(response => {
          if (response.status == 200) {
            this.form.attached_file_image = response.data.link_name;
            this.image_path = response.data.link_path;
            this.uploadPercentage = 0;
          }
        })
        .catch(e => {
          console.log(e);
          this.uploadPercentage = 0;
          this.image_path = "default_image/no-image.png";
        });
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