<template>
  <div class="animated fadeIn">
    <b-card header="รายการ Packages">
      <b-row>
        <b-col md="12">
          <b-form inline v-on:submit.prevent="onSubmit" autocomplete="off">
            <label class="mr-sm-2" for="inlineFormApartmentsName">Packages</label>
            <b-form-input
              class="col-md-4"
              v-model="form.name"
              type="text"
              id="inlineFormApartmentsName"
              placeholder="พิมพ์ชื่อ Packages"
            />&nbsp;
            <input type="hidden" v-model="form.id">
            <input type="hidden" v-model="form.status">
            <b-button type="submit" class="ml-sm-2" variant="success">บันทึก</b-button>
          </b-form>
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
            <template slot="utilities" slot-scope="data">utilities</template>
            <template slot="edit" slot-scope="data">
              <b-btn
                size="sm"
                variant="warning"
                v-on:click="setDataToForm(data)"
              >{{ data.field.label }}</b-btn>
            </template>

            <template slot="add-utilities" slot-scope="data">
              <b-btn
                v-b-modal.modalUtilities
                size="sm"
                variant="primary"
                v-on:click="setDataToFormPackagesItems(data)"
              >{{ button_modal_utilities_label }}</b-btn>
            </template>

            <template slot="status" slot-scope="data">ON/OFF</template>
          </b-table>

          <b-pagination size="md" :total-rows="totalRows" v-model="currentPage" :per-page="perPage"></b-pagination>
        </b-col>
      </b-row>
    </b-card>

    <b-modal
      id="modalUtilities"
      ref="modalUtilities"
      size="lg"
      :title="header_modal_form_label"
      :hide-footer="true"
    >
      <b-form v-on:submit.prevent="onSubmitUtilities" autocomplete="off">
        <b-form-group
          id="inline_utilities_name"
          horizontal
          :label-cols="2"
          :label="inline_utilities_name"
          label-for="inline_utilities_name"
        >
          <b-col sm="10">
            <b-form-select
              id="inline_prefix_categories"
              v-model="form_utilities.utility_categories_id"
            >
              <option
                v-for="(utility, index) in utility_categories_options"
                :key="index"
                :value="utility.id"
              >{{ utility.name }}</option>
            </b-form-select>
          </b-col>
        </b-form-group>

        <br>
        <b-row>
          <b-col md="12">
            <b-table
              bordered
              hover
              responsive="true"
              :items="utilities_items"
              :fields="utilities_fields"
            >
              <template slot="index" slot-scope="data">{{ data.index + 1 }}</template>
              <template slot="utilities" slot-scope="data">{{ data.item.utilities_name }}</template>
              <template slot="remove" slot-scope="data">
                <b-btn
                  size="sm"
                  variant="danger"
                  v-on:click="onRemovePackagesItems(data)"
                >{{ data.field.label }}</b-btn>
              </template>
            </b-table>
          </b-col>
        </b-row>
        <br>

        <b-row>
          <b-col md="12" class="text-right">
            <input type="hidden" v-model="form_utilities.id">
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
import { getPackages, setPackages } from "@/shared/packages-services";
import { getUtilitiesCategories } from "@/shared/utilities-categories-services";
import {
  setPackagesItems,
  getPackagesItemsByPackagesId
} from "@/shared/packages-items-services";

export default {
  data: () => {
    return {
      form: {
        id: 0,
        name: null,
        status: "active"
      },
      form_utilities: {
        id: 0,
        utilities_packages_id: null,
        utility_categories_id: null,
        status: "active"
      },
      fields: [
        // A column that needs custom formatting
        { key: "index", label: "#", class: "text-center" },
        {
          key: "name",
          label: "Packages",
          sortable: true,
          class: "text-center"
        },
        { key: "utilities", label: "รายการ", class: "text-center" },
        { key: "edit", label: "แก้ไข", class: "text-center" },
        { key: "add-utilities", label: "เพิ่มรายการ", class: "text-center" },
        { key: "status", label: "สถานะ", class: "text-center" }
      ],
      utilities_fields: [
        { key: "index", label: "#", class: "text-center" },
        {
          key: "name",
          label: "รายการ"
        },
        { key: "remove", label: "ลบ", class: "text-center" }
      ],
      items: [],
      utilities_items: [],
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      header_modal_form_label: "ข้อมูลสิ่งอำนวยความสะดวก",
      button_modal_utilities_label: "เพิ่มข้อมูลสิ่งอำนวยความสะดวก",
      inline_utilities_name: "รายการ",
      button_modal_hide_label: "ปิด",
      submit_form_label: "บันทึก",
      utility_categories_options: []
    };
  },
  created() {
    this.getPackages();
    this.getUtilitiesCategories();
  },
  methods: {
    getPackages() {
      getPackages()
        .then(response => {
          this.items = response.data;
          this.totalRows = this.items.length;
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    getUtilitiesCategories() {
      getUtilitiesCategories()
        .then(response => {
          this.utility_categories_options = response.data;
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    getPackagesItemsByPackagesId() {
      getPackagesItemsByPackagesId(this.form_utilities.utilities_packages_id)
        .then(response => {
          this.utilities_items = response.data;
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    setDataToForm(data) {
      this.form.id = data.item.id;
      this.form.name = data.item.name;
    },

    onSubmit() {
      if (this.form.name == null) {
        this.showNotifications({
          message: "พิมพ์ชื่อ Packages ด้วยค่ะ",
          type: "warn"
        });

        return false;
      }

      setPackages(this.form)
        .then(response => {
          this.getPackages();
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
        name: null,
        status: "active"
      };

      this.form_utilities = {
        id: 0,
        utilities_packages_id: null,
        utility_categories_id: null,
        status: "active"
      };
    },

    hideModal() {
      this.$refs.modalUtilities.hide();
    },

    setDataToFormPackagesItems(data) {
      this.form_utilities.utilities_packages_id = data.item.id || null;
      this.getPackagesItemsByPackagesId();
    },

    onSubmitUtilities() {
      if (
        this.form_utilities.utilities_packages_id == null ||
        this.form_utilities.utility_categories_id == null
      ) {
        this.showNotifications({
          message: "ไม่สามารถทำรายการได้ กรุณาลองใหม่อีกครั้ง",
          type: "warn"
        });

        return false;
      }

      setPackagesItems(this.form_utilities)
        .then(response => {
          this.hideModal();
          this.getPackages();
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

    onRemovePackagesItems(data) {
      console.log(data);
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