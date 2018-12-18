<template>
  <div class="animated fadeIn">
    <b-card header="ข้อมูล ผู้เช่า">
      <b-row>
        <b-col md="12" class="text-right">
          <b-link :to="link_to_form" class="btn btn-primary">{{ link_to_form_label }}</b-link>
        </b-col>
      </b-row>

      <br>

      
    </b-card>
  </div>
</template>

<script>
import { getRenters, setRenters } from "@/shared/renters-services";

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
          label: "ชื่อ - สกุล",
          sortable: true,
          class: "text-center"
        },
        { key: "room_numbers", label: "หมายเลขห้อง", class: "text-center" },
        { key: "link_file", label: "ไฟล์เอกสาร", class: "text-center" },
        { key: "edit", label: "แก้ไข", class: "text-center" }
      ],
      items: [],
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      link_to_form_label: 'เพิ่มใหม่',
      link_to_form: 'setting/renters-form'
    };
  },
  created() {
    // this.getRenters();
  },
  methods: {
    getRenters() {
      getRenters()
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

      setRenters(this.form)
        .then(response => {
          // console.log(response);
          this.getRenters();
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