<template>
  <div class="animated fadeIn">Hi from apartments table !</div>
</template>

<script>
import { getApartments } from "@/shared/apartments-services";
export default {
  data: () => {
    return {
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