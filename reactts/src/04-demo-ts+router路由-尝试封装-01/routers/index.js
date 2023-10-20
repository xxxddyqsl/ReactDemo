import React, { Suspense } from 'react'
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom'

// import RouterConfig from './config.js'

export default function index(props) {
  const createRouter = (route, index) => {
    console.log(route.path)
    return <Route key={index+''+route.path} exact={route.exact} path={route.path} render={(props) => <route.component {...props} routes={route}/>}></Route>
  }
  const createSonRouter = (route, index) => {
    return<React.Fragment key={index+''+route.path} >
            <Route  exact={route.exact} path={route.path} render={(props) => <route.component {...props} routes={route} />}></Route>
            {
              route.children.map((item, key) => createRouter( { ...item, path: route.path + '' + item.path }, key))
            }
        </React.Fragment>
  }
  return (
    // <BrowserRouter>
      <Suspense fallback={<div>懒加载中。。。</div>}>
        <Switch>
          {
            props.RouterConfig.map((item, index) => {
              // if (item.children && item.children.length > 0) {
              //   console.log(item)
              //   return createSonRouter(item, index);
              // } else {
                return createRouter(item, index);
              // }
            })
          }
        </Switch>
      </Suspense>
    // </BrowserRouter>
  )
}
