export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "primary",
        text: "NEW"
      }
    },
    {
      title: true,
      name: "MAIN MENU",
      class: "",
      wrapper: {
        element: "",
        attributes: {}
      }
    },
    {
      name: "Setting",
      url: "/setting",
      icon: "fa fa-gears",
      children: [
        {
          name: "ข้อมูล Apartments",
          url: "/setting/apartments",
          icon: "fa fa-building"
        },
        {
          name: "ข้อมูล ประเภทห้องพัก",
          url: "/setting/room-categories",
          icon: "fa fa-building"
        },
        {
          name: "ข้อมูล ห้องพัก",
          url: "/setting/rooms",
          icon: "fa fa-building"
        },
        {
          name: "ข้อมูล สิ่งอำนวยความสะดวก",
          url: "/setting/utilities-categories",
          icon: "fa fa-building"
        },
        {
          name: "ข้อมูล Packages",
          url: "/setting/utilities-packages",
          icon: "fa fa-book"
        },
        {
          name: "ข้อมูล ผู้เช่า",
          url: "/setting/renters",
          icon: "fa fa-building"
        }
      ]
    }
  ]
};