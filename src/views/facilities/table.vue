<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" md="6">
        <b-card :header="header_form">
          <b-form v-on:submit.prevent="onSubmit" autocomplete="off">
            <b-form-group
              id="inline_facilities_categories"
              horizontal
              :label-cols="4"
              :label="inline_facilities_categories"
              label-for="inline_facilities_categories"
            >
              <b-col sm="8">
                <b-form-radio-group
                  id="inline_facilities_categories"
                  v-model="form.facilities_categories"
                  :options="facilities_categories_options"
                ></b-form-radio-group>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_facilities_name"
              horizontal
              :label-cols="4"
              :label="inline_facilities_name"
              label-for="inline_facilities_name"
            >
              <b-col sm="8">
                <b-form-input id="inline_facilities_name" required v-model="form.facilities_name"></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_facilities_cost_per_unit"
              horizontal
              :label-cols="4"
              :label="inline_facilities_cost_per_unit"
              label-for="inline_facilities_cost_per_unit"
            >
              <b-col sm="8">
                <b-form-input id="inline_facilities_cost_per_unit" required v-model="form.facilities_cost_per_unit"></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_facilities_price_per_unit"
              horizontal
              :label-cols="4"
              :label="inline_facilities_price_per_unit"
              label-for="inline_facilities_price_per_unit"
            >
              <b-col sm="8">
                <b-form-input
                  id="inline_facilities_price_per_unit"
                  type="number"
                  required
                  v-model="form.facilities_price_per_unit"
                ></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_facilities_min_per_unit"
              horizontal
              :label-cols="4"
              :label="inline_facilities_min_per_unit"
              label-for="inline_facilities_min_per_unit"
            >
              <b-col sm="8">
                <b-form-input
                  id="inline_facilities_min_per_unit"
                  type="number"
                  required
                  v-model="form.facilities_min_per_unit"
                ></b-form-input>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_facilities_min_cost"
              horizontal
              :label-cols="4"
              :label="inline_facilities_min_cost"
              label-for="inline_facilities_min_cost"
            >
              <b-col sm="8">
                <b-form-input
                  id="inline_facilities_min_cost"
                  type="number"
                  required
                  v-model="form.facilities_min_cost"
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
import { getFacilities, setFacilities } from "@/shared/facilities-services";
export default {
  data: () => {
    return {
      form: {
        id: 0,
        facilities_name: null,
        facilities_categories: 1,
        facilities_price: null,
        facilities_cost_per_unit: null,
        facilities_price_per_unit: null,
        facilities_min_per_unit: null,
        facilities_min_cost: null
      },
      facilities_categories_options: [
        { text: "คิดหน่วย", value: 1 },
        { text: "รายเดือน", value: 2 }
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
      inline_facilities_name: "ชื่อ",
      inline_facilities_categories: "ประเภท",
      inline_facilities_price: "ราคา",
      inline_facilities_cost_per_unit: 'ต้นทุนต่อหน่วย',
      inline_facilities_price_per_unit: 'ราคาต่อหน่วย',
      inline_facilities_min_per_unit: 'หน่วยขั้นต่ำ',
      inline_facilities_min_cost: 'ราคาขั้นต่ำ',
    };
  },
  created() {
    // this.getFacilities();
  },
  methods: {
    getFacilities() {
      getFacilities()
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

      setFacilities(this.form)
        .then(response => {
          // console.log(response);
          this.getFacilities();
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
        facilities_numbers: null
      };
    }
  }
};
</script>