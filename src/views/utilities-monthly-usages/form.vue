<template>
  <div class="animated fadeIn"></div>
</template>

<script>
import { getApartments, setApartments } from "@/shared/apartments-services";
export default {
  data: () => {
    return {
      form: {
        id: null
      }
    };
  },
  created() {
    this.form.id = this.$route.params.id || null;
    if (this.form.id == null) {
      this.$router.go(-1);
    }

    console.log(this.form.id);
  },
  methods: {},
  notifications: {
    showNotifications: {
      title: "ระบบแจ้งเตือน",
      message: "เกิดข้อผิดพลาด...โปรดติดต่อผู้ดูแลระบบ",
      type: "error"
    }
  }
};
</script>