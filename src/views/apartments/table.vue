<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="12">
        <b-card header="Traffic &amp; Sales">
          <b-table bordered hover responsive :items="items" :fields="fields">
            <template slot="index" slot-scope="data">{{ data.index + 1 }}</template>
            <template slot="edit" slot-scope="data">
              <b-btn size="sm" variant="warning" @click="setDataToForm(data)">{{ data.field.label }}</b-btn>
            </template>
          </b-table>

          <b-pagination size="md" :total-rows="total_rows" v-model="currentPage" :per-page="10"></b-pagination>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { getApartments } from "@/shared/apartments-services";
export default {
  data: () => {
    return {
      fields: [
        // A column that needs custom formatting
        { key: "index", label: "No", sortable: true, 'class': 'text-center' },
        { key: "name", label: "Apartments", sortable: true, 'class': 'text-center' },
        { key: "edit", label: "แก้ไข", 'class': 'text-center' }
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
          console.log(this.items);
        })
        .catch(e => {
          console.log(e);
        });
    },

    setDataToForm(data) {
      console.log(data);
    }
    
  }
};
</script>