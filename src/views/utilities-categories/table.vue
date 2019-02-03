<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" md="6">
        <b-card :header="header_form">
          <b-form v-on:submit.prevent="onSubmit" autocomplete="off">
            <b-form-group
              id="inline_utitilies_type"
              horizontal
              :label-cols="4"
              :label="inline_utitilies_type"
              label-for="inline_utitilies_type"
            >
              <b-col sm="8">
                <b-form-radio-group
                  id="inline_utitilies_type"
                  v-model="form.type"
                  :options="utitilies_type_options"
                ></b-form-radio-group>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_utitilies_name"
              horizontal
              :label-cols="4"
              :label="inline_utitilies_name"
              label-for="inline_utitilies_name"
            >
              <b-col sm="8">
                <b-form-input id="inline_utitilies_name" v-model="form.name"></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_utitilies_price_per_unit_cost"
              horizontal
              :label-cols="4"
              :label="inline_utitilies_price_per_unit_cost"
              label-for="inline_utitilies_price_per_unit_cost"
            >
              <b-col sm="8">
                <b-form-input
                  id="inline_utitilies_price_per_unit_cost"
                  type="number"
                  v-model="form.price_per_unit_cost"
                ></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_utitilies_price_per_unit"
              horizontal
              :label-cols="4"
              :label="inline_utitilies_price_per_unit"
              label-for="inline_utitilies_price_per_unit"
            >
              <b-col sm="8">
                <b-form-input
                  id="inline_utitilies_price_per_unit"
                  type="number"
                  v-model="form.price_per_unit"
                ></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_utitilies_unit_min_rate"
              horizontal
              :label-cols="4"
              :label="inline_utitilies_unit_min_rate"
              label-for="inline_utitilies_unit_min_rate"
            >
              <b-col sm="8">
                <b-form-input
                  id="inline_utitilies_unit_min_rate"
                  type="number"
                  v-model="form.unit_min_rate"
                ></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_utitilies_unit_min_price"
              horizontal
              :label-cols="4"
              :label="inline_utitilies_unit_min_price"
              label-for="inline_utitilies_unit_min_price"
            >
              <b-col sm="8">
                <b-form-input
                  id="inline_utitilies_unit_min_price"
                  type="number"
                  v-model="form.unit_min_price"
                ></b-form-input>
              </b-col>
            </b-form-group>

            <b-row>
              <b-col sm="12" class="text-right">
                <input type="hidden" v-model="form.id">
                <b-button type="submit" class="ml-sm-2" variant="success">บันทึก</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-col>

      <b-col sm="12" md="6">
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

                <template slot="type" slot-scope="data">{{ data.item.type | unit_label }}</template>
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
import {
  getUtilitiesCategories,
  setUtilitiesCategories
} from "@/shared/utilities-categories-services";

export default {
  filters: {
    unit_label: function(unit) {
      const units = [
        { id: "unit", label: "หน่วย" },
        { id: "monthly", label: "รายเดือน" }
      ];

      let results = "";
      units.filter(value => {
        if (value.id == unit) {
          results = value.label;
        }
      });

      return results;
    }
  },

  data: () => {
    return {
      form: {
        id: 0,
        name: null,
        type: "unit",
        price_per_unit_cost: null,
        price_per_unit: null,
        unit_min_rate: null,
        unit_min_price: null,
        status: "active"
      },

      utitilies_type_options: [
        { text: "หน่วย", value: "unit" },
        { text: "รายเดือน", value: "monthly" }
      ],
      fields: [
        // A column that needs custom formatting
        { key: "index", label: "#", class: "text-center" },
        {
          key: "type",
          label: "ประเภท",
          sortable: true,
          class: "text-center"
        },
        {
          key: "name",
          label: "ชื่อ",
          sortable: true,
          class: "text-center"
        },
        {
          key: "price_per_unit_cost",
          label: "ราคาต้นทุน",
          sortable: true,
          class: "text-right"
        },
        {
          key: "price_per_unit",
          label: "ราคาต่อหน่วย",
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
      header_form: "ข้อมูล สิ่งอำนวยความสะดวก",
      header_table: "รายการ ห้องพัก",
      inline_utitilies_name: "ชื่อ",
      inline_utitilies_type: "ประเภท",
      inline_utitilies_price_per_unit_cost: "ต้นทุนต่อหน่วย",
      inline_utitilies_price_per_unit: "ราคาต่อหน่วย",
      inline_utitilies_unit_min_rate: "หน่วยขั้นต่ำ",
      inline_utitilies_unit_min_price: "ราคาขั้นต่ำ"
    };
  },
  created() {
    this.getUtilitiesCategories();
  },
  methods: {
    getUtilitiesCategories() {
      getUtilitiesCategories()
        .then(response => {
          this.items = response.data;
          this.totalRows = this.items.length;
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    setDataToForm(data) {
      this.form.id = data.item.id;
      this.form.name = data.item.name;
      this.form.type = data.item.type;
      this.form.price_per_unit_cost = data.item.price_per_unit_cost;
      this.form.price_per_unit = data.item.price_per_unit;
      this.form.unit_min_rate = data.item.unit_min_rate;
      this.form.unit_min_price = data.item.unit_min_price;
    },

    onSubmit() {
      if (this.form.name == null || this.form.name == "") {
        this.showNotifications({
          message: `พิมพ์ ${this.inline_utitilies_name}`,
          type: "warn"
        });

        return false;
      }

      if (
        this.form.price_per_unit_cost == null ||
        this.form.price_per_unit_cost == ""
      ) {
        this.showNotifications({
          message: `พิมพ์ ${this.inline_utitilies_price_per_unit_cost}`,
          type: "warn"
        });

        return false;
      }

      if (this.form.price_per_unit == null || this.form.price_per_unit == "") {
        this.showNotifications({
          message: `พิมพ์ ${this.inline_utitilies_price_per_unit}`,
          type: "warn"
        });

        return false;
      }

      if (this.form.unit_min_rate == null || this.form.unit_min_rate == "") {
        this.showNotifications({
          message: `พิมพ์ ${this.inline_utitilies_unit_min_rate}`,
          type: "warn"
        });

        return false;
      }

      if (this.form.unit_min_price == null || this.form.unit_min_price == "") {
        this.showNotifications({
          message: `พิมพ์ ${this.inline_utitilies_unit_min_price}`,
          type: "warn"
        });

        return false;
      }

      setUtilitiesCategories(this.form)
        .then(response => {
          this.getUtilitiesCategories();
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
        status: "active"
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