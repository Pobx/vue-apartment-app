<template>
  <div class="animated fadeIn">Hi from apartments table !</div>
</template>

<script>
import { getApartments } from "@/shared/apartments-services";
export default {
  data: () => {
    return {
      fields: [
        // A column that needs custom formatting
        { key: 'index', label: 'No' },
        { key: 'name', label: 'Apartments' },
        { key: 'status', label: 'แก้ไข' }
      ],
      items: []
    };
  },
  created() {
    this.getApartments();
  },
  methods: {
    getApartments() {
      getApartments()
        .then(response => {
          console.log(response);
          this.items = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>