import {lazy} from 'react'
// const Home =lazy(()=>import('../views/Home'))
import Home from '../views/Home'
const Routers=[
    {
        path:'/login',
        exact:false,
        component:lazy(()=>import('../views/Login')),
    },
    {
        path:'/home',
        exact:true,
        // component:Home,
        component:lazy(()=>import('../views/Home')),
        children:[
            {
                path:'/list',
                exact:false,
                component:lazy(()=>import('../views/Home/list')),
            }
        ],
    },
    {
        path:'/films',
        exact:true,
        component:lazy(()=>import('../views/Films')),
        children:[
            {
                path:'/list',
                exact:false,
                component:lazy(()=>import('../views/Films/list')),
            }
        ],
    },
]

export default  Routers