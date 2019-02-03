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

            <template slot="partners" slot-scope="data">
              <b-btn
                @click="showPartnersModal(data.item.id)"
                variant="primary"
              >{{ button_modal_partners_label }}</b-btn>
            </template>

            <template slot="attached_files" slot-scope="data">
              <b-btn
                @click="showAttachedFilesModal(data.item.id)"
                variant="primary"
              >{{ button_modal_attached_files_label }}</b-btn>
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

    <b-modal
      id="modalPartners"
      ref="modalPartners"
      size="lg"
      :title="header_modal_form_label"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
    >
      <b-form v-on:submit.prevent="onSubmitPartners" autocomplete="off">
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
              required
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

            <b-button type="submit" class="btn btn-success">{{ submit_form_label }}</b-button>
          </b-col>
        </b-row>
      </b-form>

      <br>

      <b-row>
        <b-col md="12">
          <b-table bordered hover responsive="true" :items="partners" :fields="partners_fields">
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
                v-on:click="removePartnersById(data.item)"
              >{{ data.field.label }}</b-btn>
            </template>
          </b-table>
        </b-col>
      </b-row>

      <div slot="modal-footer">
        <b-button
          type="button"
          @click="hidePartnersModal"
          class="btn btn-danger mr-sm-2"
        >{{ button_modal_hide_label }}</b-button>
      </div>
    </b-modal>

    <b-modal
      id="modalAttachedFiles"
      ref="modalAttachedFiles"
      size="lg"
      :title="header_modal_form_attached_files_label"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
    >
      <b-form inline v-on:submit.prevent="onSubmitAttachedFiles" autocomplete="off">
        <b-form-file placeholder="เลือกไฟล์..." @change="onSelectedFile" class="col-md-10"></b-form-file>
        <b-button type="submit" class="btn btn-success ml-sm-2">{{ submit_form_label }}</b-button>
      </b-form>

      <br>

      <b-row>
        <b-col md="12">
          <b-table
            bordered
            hover
            responsive="true"
            :items="attached_files"
            :fields="attached_fields"
          >
            <template slot="index" slot-scope="data">{{ data.index + 1 }}</template>
            <template slot="attached_name" slot-scope="data">
              <b-link :href="data.item.attached_file_path" target="_blank">ไฟล์เอกสาร</b-link>
            </template>

            <template slot="remove" slot-scope="data">
              <b-btn
                size="sm"
                variant="danger"
                v-on:click="removeAttachedFiles(data.item)"
              >{{ data.field.label }}</b-btn>
            </template>
          </b-table>
        </b-col>
      </b-row>

      <div slot="modal-footer">
        <b-button
          type="button"
          @click="hideAttachedFilesModal"
          class="btn btn-danger mr-sm-2"
        >{{ button_modal_hide_label }}</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  getRenters,
  setRenters,
  updateRentersStatus
} from "@/shared/renters-services";

import {
  getPartnersByRentersId,
  removePartnersById,
  setPartners
} from "@/shared/partners-services";

import {
  getAttachedFilesByRentersId,
  removeAttachedFiles
} from "@/shared/attached-files-services";

import { uploadFiles } from "@/shared/uploads-services";
import { setAttachedFile } from "@/shared/attached-files-services";

export default {
  data: () => {
    return {
      form_partners: {
        id: 0,
        mobile: null,
        first_name: null,
        last_name: null,
        renters_id: null,
        status: "active"
      },
      form_attached_files: {
        id: 0,
        renters_id: null,
        attached_name: null,
        status: "active"
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
        { key: "partners", label: "ติดต่อฉุกเฉิน", class: "text-center" },
        { key: "attached_files", label: "ไฟล์เอกสาร", class: "text-center" },
        { key: "edit", label: "แก้ไข", class: "text-center" },
        { key: "status", label: "", class: "text-center" }
      ],
      partners_fields: [
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
      attached_fields: [
        // A column that needs custom formatting
        { key: "index", label: "#", class: "text-center" },
        {
          key: "attached_name",
          label: "ชื่อไฟล์",
          class: "text-center"
        },
        { key: "remove", label: "ลบ", class: "text-center" }
      ],
      items: [],
      partners: [],
      attached_files: [],
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      link_to_form_label: "เพิ่มใหม่",
      link_to_form: "renters-form",
      inline_first_name: "ชื่อ",
      inline_last_name: "สกุล",
      inline_mobile: "เบอร์มือถือ",
      submit_form_label: "บันทึก",
      button_modal_partners_label: "ข้อมูลติดต่อฉุกเฉิน",
      header_modal_form_label: "ข้อมูลติดต่อฉุกเฉิน",
      header_modal_form_attached_files_label: "ข้อมูลเอกสาร",
      button_modal_attached_files_label: "ข้อมูลเอกสาร",
      button_modal_hide_label: "ปิด"
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

    hidePartnersModal() {
      this.form_partners = {
        id: 0
      };

      this.$refs.modalPartners.hide();
    },

    onSubmitPartners() {
      setPartners(this.form_partners)
        .then(response => {
          if (response.status == 201 || 200) {
            this.showNotifications({
              message: "บันทึกข้อมูลสำเร็จ",
              type: "success"
            });

            let renters_id = response.data.renters_id || null;
            this.getPartnersByRentersId(renters_id);
            this.form_partners.form_partners = renters_id;
            this.resetPartnersFormModal();
          }
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    getPartnersByRentersId(id = null) {
      getPartnersByRentersId(id)
        .then(response => {
          this.partners = response.data;
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    showPartnersModal(id) {
      this.getPartnersByRentersId(id);
      this.form_partners.renters_id = id;
      this.$refs.modalPartners.show();
    },

    showAttachedFilesModal(id) {
      this.getAttachedFilesByRentersId(id);
      this.form_attached_files.renters_id = id;
      this.$refs.modalAttachedFiles.show();
    },

    hideAttachedFilesModal() {
      this.form_attached_files = {
        id: 0,
        renters_id: null,
        attached_name: null,
        status: "active"
      };

      this.$refs.modalAttachedFiles.hide();
    },

    setPartnersDataOnModalForm(data) {
      this.form_partners.id = data.id;
      this.form_partners.mobile = data.mobile;
      this.form_partners.first_name = data.first_name;
      this.form_partners.last_name = data.last_name;
      this.form_partners.renters_id = data.renters_id;
      this.form_partners.status = "active";
    },

    removePartnersById(data) {
      let params = {
        id: data.id,
        status: "disabled",
        renters_id: data.renters_id
      };

      removePartnersById(params)
        .then(response => {
          if (response.status == 200) {
            let renters_id = response.data.renters_id || null;
            this.getPartnersByRentersId(renters_id);
          }
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    removeAttachedFiles(data) {
      let params = {
        id: data.id,
        attached_name: data.attached_name,
        status: "disabled",
        renters_id: data.renters_id
      };

      removeAttachedFiles(params)
        .then(response => {
          if (response.status == 200) {
            let renters_id = response.data.renters_id || null;
            this.getAttachedFilesByRentersId(renters_id);
          }
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    resetPartnersFormModal() {
      this.form_partners.id = 0;
      this.form_partners.mobile = null;
      this.form_partners.first_name = null;
      this.form_partners.last_name = null;
      this.form_partners.status = "active";
    },

    getAttachedFilesByRentersId(id = null) {
      getAttachedFilesByRentersId(id)
        .then(response => {
          this.attached_files = response.data;
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    onSelectedFile(event) {
      let config = {};
      let file = event.target.files[0];
      let fd = new FormData();
      fd.append("file", file, file.name);

      uploadFiles(fd, config)
        .then(response => {
          if (response.status == 200) {
            this.form_attached_files.attached_name = response.data.link_name;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },

    onSubmitAttachedFiles() {
      setAttachedFile(this.form_attached_files)
        .then(response => {
          if (response.status == 201) {
            let renters_id = response.data.renters_id || null;
            this.getAttachedFilesByRentersId(renters_id);
          }
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