import React, { useEffect, useMemo, useState } from 'react'
import MyRouter from '../../routers'

export default function Index(props:any) {
  const [routes,setRoutes]=useState()
 
 const getRoutes =  useMemo(()=>{
    console.log(props)
    let data:any = [];
    if( props.routes.children &&  props.routes.children.length>0){
      let path = props.routes.path;
      props.routes.children.map((item:any)=>{
        data.push({...item,path:path+''+item.path})
      })
    }
     return  data
  },[props.routes])
  {console.log(getRoutes)}
  return (
    
    <div>home
     
     <MyRouter RouterConfig= {getRoutes}></MyRouter>
    </div>
  )
}
