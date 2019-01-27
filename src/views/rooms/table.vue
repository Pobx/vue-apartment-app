<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" md="4">
        <b-card :header="header_form">
          <b-form v-on:submit.prevent="onSubmit" autocomplete="off">
            <b-form-group
              id="inline_room_apartments"
              horizontal
              :label-cols="4"
              :label="inline_room_apartments"
              label-for="inline_room_apartments"
            >
              <b-col sm="8">
                <b-form-select id="inline_room_apartments" v-model="form.apartments_id">
                  <option :value="null">{{ inline_room_apartments }}</option>
                  <option
                    v-for="item in apartments"
                    :key="item.index"
                    :value="item.id"
                  >{{ item.name }}</option>
                </b-form-select>
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
                <b-form-select id="inline_room_categories" v-model="form.room_categories_id">
                  <option :value="null">{{ inline_selectbox_is_null }}</option>
                  <option
                    v-for="item in room_categories"
                    :key="item.index"
                    :value="item.id"
                  >{{ item.name }}</option>
                </b-form-select>
              </b-col>
            </b-form-group>

            <b-form-group
              id="inline_room_categories"
              horizontal
              :label-cols="4"
              :label="inline_room_categories"
              label-for="inline_utilities_packages"
            >
              <b-col sm="8">
                <b-form-select id="inline_utilities_packages" v-model="form.utilities_packages_id">
                  <option :value="null">{{ inline_selectbox_is_null }}</option>
                  <option
                    v-for="item in items_packages"
                    :key="item.index"
                    :value="item.id"
                  >{{ item.name }}</option>
                </b-form-select>
              </b-col>
            </b-form-group>


            <b-form-group
              id="inline_name"
              horizontal
              :label-cols="4"
              :label="inline_name"
              label-for="inline_name"
            >
              <b-col sm="8">
                <b-form-input id="inline_name" v-model="form.name"></b-form-input>
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
                <b-form-input id="inline_room_price" type="number" v-model="form.price"></b-form-input>
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
                <template slot="apartments_id" slot-scope="data">{{ data.item.apartments.name }}</template>
                <template
                  slot="room_categories_id"
                  slot-scope="data"
                >{{ data.item.room_categories.name }}</template>
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
import { getApartments } from "@/shared/apartments-services";
import { getRoomCategories } from "@/shared/room-categories-services";
import { getPackages } from "@/shared/packages-services";

export default {
  data: () => {
    return {
      form: {
        id: 0,
        name: null,
        apartments_id: null,
        room_categories_id: null,
        price: null,
        status: "active",
        utilities_packages_id: null,
        renters_id: null
      },
      room_categories: [],
      apartments: [],
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
          key: "apartments_id",
          label: "Apartments",
          sortable: true,
          class: "text-center"
        },
        {
          key: "room_categories_id",
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
      items_packages: [],
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      header_form: "ข้อมูล ห้องพัก",
      header_table: "รายการ ห้องพัก",
      inline_name: "หมายเลขห้อง",
      inline_room_categories: "ประเภท",
      inline_utilities_packages: 'Packages',
      inline_room_price: "ราคา",
      inline_room_apartments: "Apartments",
      inline_selectbox_is_null: 'เลือกรายการ'
    };
  },
  created() {
    this.getRooms();
    this.getApartments();
    this.getRoomCategories();
    this.getPackages();
  },
  methods: {
    getRoomCategories() {
      getRoomCategories()
        .then(response => {
          this.room_categories = response.data;
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    getApartments() {
      getApartments()
        .then(response => {
          this.apartments = response.data;
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    getRooms() {
      getRooms()
        .then(response => {
          this.items = response.data;
          this.totalRows = this.items.length;
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    getPackages() {
      getPackages()
        .then(response => {
          let results = response.data;
          this.items_packages = results.filter(
            value => value.status == "active"
          );
        })
        .catch(e => this.showNotifications({ message: e }));
    },

    setDataToForm(data) {
      this.form.id = data.item.id;
      this.form.name = data.item.name;
      this.form.apartments_id = data.item.apartments_id;
      this.form.room_categories_id = data.item.room_categories_id;
      this.form.utilities_packages_id = data.item.utilities_packages_id;
      this.form.renters_id = data.item.renters_id;
      this.form.price = data.item.price;
    },

    onSubmit() {
      if (this.form.apartments_id == null) {
        this.showNotifications({
          message: `เลือก ${this.inline_room_apartments} ด้วยค่ะ`,
          type: "warn"
        });

        return false;
      }

      if (this.form.room_categories_id == null) {
        this.showNotifications({
          message: `เลือก ${this.inline_room_categories} ด้วยค่ะ`,
          type: "warn"
        });

        return false;
      }

      if (this.form.name == null) {
        this.showNotifications({
          message: `พิมพ์ ${this.inline_name} ด้วยค่ะ`,
          type: "warn"
        });

        return false;
      }

      if (this.form.price == null) {
        this.showNotifications({
          message: `พิมพ์ ${this.inline_room_price} ด้วยค่ะ`,
          type: "warn"
        });

        return false;
      }

      setRooms(this.form)
        .then(response => {
          this.getRooms();
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