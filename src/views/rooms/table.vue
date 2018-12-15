<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card header="perPage"></b-card>
      </b-col>
    </b-row>

    <br>

    <!-- <b-row>
        <b-col md="12">
          <b-table 
            bordered 
            hover 
            responsive=true
            :current-page="currentPage"
            :per-page="perPage"  
            :items="items" 
            :fields="fields">
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
    </b-row>-->
  </div>
</template>

<script>
import { getRooms, setRooms } from "@/shared/rooms-services";
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
          label: "หมายเลขห้อง",
          sortable: true,
          class: "text-center"
        },
        {
          key: "name",
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
      perPage: 10
    };
  },
  created() {
    // this.getRooms();
  },
  methods: {
    getRooms() {
      getRooms()
        .then(response => {
          this.items = response.data;
          this.totalRows = this.items.length;
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
        alert("พิมพ์ชื่อ Apartment ด้วยค่ะ");
        return false;
      }

      setRooms(this.form)
        .then(response => {
          // console.log(response);
          this.getRooms();
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