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
          name: "ข้อมูล ประเภทห้อง",
          url: "/setting/room-categories",
          icon: "fa fa-building"
        }
      ]
    }
  ]
};