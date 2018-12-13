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
            <input type="hidden" v-model="form.id"/>
            <b-button type="submit" class="ml-sm-2" variant="success">บันทึก</b-button>
          </b-form>
        </b-col>
      </b-row>

      <br>

      <b-row>
        <b-col md="12">
          <b-table bordered hover responsive :items="items" :fields="fields">
            <template slot="index" slot-scope="data">{{ data.index + 1 }}</template>
            <template slot="edit" slot-scope="data">
              <b-btn
                size="sm"
                variant="warning"
                v-on:click="setDataToForm(data)"
              >{{ data.field.label }}</b-btn>
            </template>
          </b-table>

          <b-pagination size="md" :total-rows="total_rows" v-model="currentPage" :per-page="10"></b-pagination>
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
        { key: "index", label: "No", class: "text-center" },
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
      total_rows: 0
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
          this.total_rows = this.items.length;
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
        alert('พิมพ์ชื่อ Apartment ด้วยค่ะ');
        return false;
      }

      setApartments(this.form)
        .then(response => {
          // console.log(response);
          this.getApartments();
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