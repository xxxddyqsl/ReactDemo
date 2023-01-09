import React from 'react'
export default function ChildB(props) {
  return (
    <div style={{border:'1px solid red',padding:'4px 10px'}}>
         { console.log('ChildB-组件')}
        <h4>ChildB</h4>
        {props.state.stateChildB}
    </div>
  )
}
