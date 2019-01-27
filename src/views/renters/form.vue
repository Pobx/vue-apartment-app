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
              id="inline_document_file"
              horizontal
              :label-cols="1"
              :label="inline_document_file"
              label-for="inline_document_file"
            >
              <b-col sm="4">
                <b-form-file
                  @change="onSelectedFile"
                  placeholder="เลือกไฟล์..."
                  v-show="uploadPercentageFile == 0"
                ></b-form-file>
                <input type="hidden" v-model="attached_name">
                <input type="hidden" v-model="attached_file_id">

                <b-progress
                  :value="uploadPercentageFile"
                  variant="success"
                  striped
                  :animated="animate"
                  class="mt-1"
                  v-show="uploadPercentageFile != 0"
                ></b-progress>
              </b-col>

              <b-col sm="2" v-if="file_path !=null">
                <a :href="file_path" target="_blank">
                  <i class="fa fa-file fa-2x" aria-hidden="true"></i>
                </a>
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

      <b-card header="ข้อมูลติดต่อฉุกเฉิน">
        <b-row>
          <b-col md="12" class="text-right">
            <b-btn
              v-b-modal.modalEmergencyContacts
              variant="primary"
            >{{ button_modal_partners_label }}</b-btn>
          </b-col>
        </b-row>

        <br>

        <b-row>
          <b-col md="12">
            <b-table bordered hover responsive="true" :items="partners" :fields="fields">
              <template slot="index" slot-scope="data">{{ data.index + 1 }}</template>
              <template
                slot="name"
                slot-scope="data"
              >{{ data.item.first_name }}&nbsp;{{ data.item.last_name }}</template>

              <template slot="edit" slot-scope="data">
                <b-btn
                  size="sm"
                  variant="warning"
                  v-on:click="setPartnersDataOnModalForm(data.item)"
                >{{ data.field.label }}</b-btn>
              </template>

              <template slot="remove" slot-scope="data">
                <b-btn
                  size="sm"
                  variant="danger"
                  v-on:click="removeContact(data.item, data.index)"
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

    <b-modal
      id="modalEmergencyContacts"
      ref="modalEmergencyContacts"
      :title="header_modal_form_label"
      :hide-footer="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
    >
      <b-form v-on:submit.prevent="onAddPartners" autocomplete="off">
        <b-form-group
          id="inline_first_name"
          horizontal
          :label-cols="2"
          :label="inline_first_name"
          label-for="inline_first_name"
        >
          <b-col sm="10">
            <b-form-input id="inline_first_name" required v-model="form_partners.first_name"></b-form-input>
          </b-col>
        </b-form-group>

        <b-form-group
          id="inline_last_name"
          horizontal
          :label-cols="2"
          :label="inline_last_name"
          label-for="inline_last_name"
        >
          <b-col sm="10">
            <b-form-input id="inline_last_name" required v-model="form_partners.last_name"></b-form-input>
          </b-col>
        </b-form-group>

        <b-form-group
          id="inline_mobile"
          horizontal
          :label-cols="2"
          :label="inline_mobile"
          label-for="inline_mobile"
        >
          <b-col sm="10">
            <masked-input
              type="text"
              class="form-control"
              v-model="form_partners.mobile"
              :mask="[/\d/, /\d/,/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]"
              :guide="false"
            ></masked-input>
          </b-col>
        </b-form-group>

        <br>

        <b-row>
          <b-col md="12" class="text-right">
            <input type="hidden" v-model="form_partners.id">
            <b-button
              type="button"
              @click="hideModal"
              class="btn btn-danger mr-sm-2"
            >{{ button_modal_hide_label }}</b-button>
            <b-button type="submit" class="btn btn-success">{{ submit_form_label }}</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { getRenterProfileById, setRenters } from "@/shared/renters-services";
import { uploadImages, uploadFiles } from "@/shared/uploads-services";
import {
  getPartnersByRentersId,
  removePartnersById,
  setPartners
} from "@/shared/partners-services";
import { setAttachedFile } from "@/shared/attached-files-services";

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
      form_partners: {
        id: 0,
        mobile: null,
        first_name: null,
        last_name: null,
        renters_id: null
      },
      prefix_categories_options: [
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
      inline_document_file: "ไฟล์เอกสาร",
      inline_address: "ที่อยู่",
      inline_mobile: "เบอร์มือถือ",
      inline_email: "อีเมล์",
      inline_contact_mobile: "เบอร์มือถือ",
      inline_contact_fullname: "ชื่อ - สกุล",
      button_add_new_contact_label: "เพิ่มข้อมูล",
      button_modal_partners_label: "เพิ่มข้อมูล",
      header_modal_form_label: "ข้อมูลติดต่อฉุกเฉิน",
      button_modal_hide_label: "ปิด",
      image_path: "default_image/no-image.png",
      uploadPercentage: 0,
      animate: true,
      uploadPercentageFile: 0,
      attached_file_id: 0,
      attached_name: null,
      file_path: null
    };
  },
  created() {
    this.form.id = this.$route.params.id || 0;
    if (this.form.id != 0) {
      this.getRenterProfileById();
      this.getPartnersByRentersId();
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
          let renters_id = response.data.id;
          this.onSubmitAttachedFile(renters_id);
          this.onSubmitPartners(renters_id);
          this.onReset();
          this.showNotifications({
            message: "บันทึกข้อมูลสำเร็จ",
            type: "success"
          });
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

    onAddPartners() {
      if (this.form_partners.id != null) {
        this.onUpdatePartner();
        return false;
      }

      this.partners.push(this.form_partners);
      this.form_partners = {
        id: 0
      };
    },

    getPartnersByRentersId() {
      getPartnersByRentersId(this.form.id)
        .then(response => {
          this.partners = response.data;
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    hideModal() {
      this.form_partners = {};
      this.$refs.modalEmergencyContacts.hide();
    },

    removeContact(data, index) {
      if (data.id == 0) {
        this.partners.splice(index, 1);
      } else {
        removePartnersById(data.id)
          .then(response => {
            if (response.status) {
              this.getPartnersByRentersId();
            }
          })
          .catch(e => this.showNotifications({ message: e }));
      }
    },

    onSubmitPartners(renters_id) {
      this.partners.map(value => {
        (value.renters_id = renters_id), (value.status = "active");
      });

      setPartners(this.partners)
        .then(response => {
          if (response.status == 201) {
            this.$router.go(-1);
          }
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    onUpdatePartner() {
      setPartners(this.form_partners)
        .then(response => {
          if (response.status == 200) {
            this.showNotifications({
              message: "บันทึกข้อมูลสำเร็จ",
              type: "success"
            });
            this.getPartnersByRentersId();
            this.$refs.modalEmergencyContacts.hide();
          }
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    onSubmitAttachedFile(renters_id) {
      let data = {
        id: this.attached_file_id,
        renters_id: renters_id,
        attached_name: this.attached_name,
        status: "active"
      };

      if (this.attached_name != null) {
        setAttachedFile(data);
      }
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
    },

    onSelectedFile(event) {
      const config = {
        onUploadProgress: progressEvent =>
          (this.uploadPercentageFile =
            Math.round(progressEvent.loaded / progressEvent.total) * 100)
      };

      let file = event.target.files[0];
      let fd = new FormData();
      fd.append("file", file, file.name);

      uploadFiles(fd, config)
        .then(response => {
          if (response.status == 200) {
            this.attached_name = response.data.link_name;
            this.file_path = response.data.link_path;
            this.uploadPercentageFile = 0;
          }
        })
        .catch(e => {
          console.log(e);
          this.uploadPercentageFile = 0;
          this.image_path = "default_image/no-image.png";
        });
    },

    setPartnersDataOnModalForm(data) {
      this.$refs.modalEmergencyContacts.show();
      this.form_partners.id = data.id;
      this.form_partners.mobile = data.mobile;
      this.form_partners.first_name = data.first_name;
      this.form_partners.last_name = data.last_name;
      this.form_partners.renters_id = data.renters_id;
      this.form_partners.status = "active";
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