<template>
  <div class="animated fadeIn">
    <b-card header="รายการ Apartments">
      <b-row>
        <b-col md="12">
          <b-form inline v-on:submit.prevent="onSubmit" autocomplete="off">
            <label class="mr-sm-2" for="inlineFormApartmentsName">Apartment</label>
            <b-form-input
              class="col-md-4"
              v-model="form.name"
              type="text"
              id="inlineFormApartmentsName"
              placeholder="พิมพ์ชื่อ Apartment"
            />&nbsp;
            <input type="hidden" v-model="form.id">
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
            <template slot="edit" slot-scope="data">
              <b-btn
                size="sm"
                variant="warning"
                v-on:click="setDataToForm(data)"
              >{{ data.field.label }}</b-btn>
            </template>
          </b-table>

          <b-pagination size="md" :total-rows="totalRows" v-model="currentPage" :per-page="perPage"></b-pagination>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { getApartments, setApartments } from "@/shared/apartments-services";
export default {
  data: () => {
    return {
      form: {
        id: 0,
        name: null
      },
      fields: [
        // A column that needs custom formatting
        { key: "index", label: "#", class: "text-center" },
        {
          key: "name",
          label: "Apartments",
          sortable: true,
          class: "text-center"
        },
        { key: "edit", label: "แก้ไข", class: "text-center" }
      ],
      items: [],
      currentPage: 1,
      totalRows: 0,
      perPage: 10
    };
  },
  created() {
    this.getApartments();
  },
  methods: {
    getApartments() {
      getApartments()
        .then(response => {
          this.items = response.data;
          this.totalRows = this.items.length;
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
          message: "พิมพ์ชื่อ Apartment",
          type: "warn"
        });

        return false;
      }

      setApartments(this.form)
        .then(response => {
          this.getApartments();
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
        name: null
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