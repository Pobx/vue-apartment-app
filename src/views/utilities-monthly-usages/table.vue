<template>
  <div class="animated fadeIn">
   APARTMENTS
  </div>
</template>

<script>
import { getApartments, setApartments } from "@/shared/apartments-services";
export default {
  data: () => {
    return {
    }
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

    
  }
};
</script>