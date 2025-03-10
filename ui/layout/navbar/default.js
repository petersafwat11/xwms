const navDefault = {
    expanded:false,
    items:[
        {
            title:"Dashboard",
            path:"/"
        },
        {
            title:"Scanning",
            active:false,
            children:[
                {
                    title:"Receiving",
                    path:"/receiving"
                },
                {
                    title:"Sorting",
                    path:"/sorting"
                },
                {
                    title:"Transfer",
                    path:"/transfer"
                },
                {
                    title:"Pick",
                    path:"/pick"
                },
                {
                    title:"Pack",
                    path:"/pack"
                },
                {
                    title:"Cycle Count",
                    path:"/cycle-count"
                },
                {
                    title:"Stock Take",
                    path:"/stock-take"
                },
            ]
            
        },
        {
            title:"Inventory",
            active:false,
            children:[
                {
                    title:"Goods In",
                    path:"/goods-in"
                },
                {
                    title:"Goods Out",
                    path:"/goods-out"
                },
                {
                    title:"Summary",
                    path:"/summary"
                },
                {
                    title:"Adjustment",
                    path:"/adjustment"
                },
            ]
            
        },
        {
            title:"Reports",
            active:false,
            children:[
                {
                    title:"In And Out",
                    path:"/in-and-out"
                },
                {
                    title:"Activity",
                    path:"/activity"
                },
                {
                    title:"Stock Balance",
                    path:"/stock-balance"
                },
                {
                    title:"Pick List",
                    path:"/pick-list"
                },
                {
                    title:"Pack List",
                    path:"/pack-list"
                },
            ]
            
        },
        {
            title:"Settings",
            active:false,
            children:[
                {
                    title:"Warehouse",
                    path:"/warehouse"
                },
                {
                    title:"Location",
                    path:"/location"
                },
                {
                    title:"Commodity",
                    path:"/commodity"
                },
                {
                    title:"Customers",
                    path:"/customers"
                },
            ]
            
        },
        {
            title:"Config",
            path:"/config"
        },
        {
            title:"Billing",
            path:"/billing"
        },
    ]
}
export default navDefault
