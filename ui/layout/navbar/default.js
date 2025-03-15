const navDefault = {
  expanded: false,
  items: [
    {
      title: "Dashboard",
      path: "/",
    },
    {      
      title: "Scanning",
      active: false,
      children: [
        {
          title: "Receiving",
          path: "/receiving",
        },
        {
          title: "Sorting",
          path: "/sorting",
        },
        {
          title: "Transfer",
          path: "/transfer",
        },
        {
          title: "Pick",
          path: "/pick",
        },
        {
          title: "Pack",
          path: "/pack",
        },
        {
          title: "Cycle Count",
          path: "/cycle-count",
        },
        {
          title: "Stock Take",
          path: "/stock-take",
        },
      ],
    },
    {
      title: "Inventory",
      active: false,
      children: [
        {
          title: "In Order",
          path: "/in-order",
        },
        {
          title: "Out Order",
          path: "/out-order",
        },
        {
          title: "Summary",
          path: "/summary",
        },
      ],
    },
    {
      title: "Reports",
      active: false,
      children: [
        {
          title: "Stock Balance",
          path: "/stock-balance",
        },
      ],
    },
    {
      title: "Config",
      active: false,
      children: [
        {
          title: "Warehouse",
          path: "/warehouse",
        },
        {
          title: "Location",
          path: "/location",
        },
        {
          title: "Commodity",
          path: "/commodity",
        },
        {
          title: "Customers",
          path: "/customers",
        },
      ],
    },
    {
      title: "Settings",
      active: false,
      children: [
        {
          title: "Profile",
          path: "/profile",
        },
        {
          title: "Feedback",
          path: "/feedback",
        },
        {
          title: "Logs",
          path: "/logs",
        },
      ],
    },

    // {
    //   title: "Billing",
    //   path: "/billing",
    // },
  ],
};
export default navDefault;
