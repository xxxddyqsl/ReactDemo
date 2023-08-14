 
import { Checkbox, Space,Empty } from 'antd';
import { useEffect, useState } from 'react';
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];
const CheckboxOptions = (props) => {
//   const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const [checkedList, setCheckedList] = useState();
  const onChange = (list) => {
    console.log(props.callback(list),list)
    // setCheckedList(list);
    // setIndeterminate(!!list.length && list.length < plainOptions.length);
    // setCheckAll(list.length === plainOptions.length);
  };
  const onCheckAllChange = (e,data) => {
    console.log(e,data)
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  useEffect(()=>{
    const defaultVals = [];
    props.options.map(item=>{
        if(item.checked){
            defaultVals.push(item.label);
        }
    })
    console.log(defaultVals)
    setCheckedList(defaultVals)
  },[props.options])
  return (
    <>
        {
        props.options?
       <div>
         <Checkbox.Group onChange={onChange} value={checkedList} options={props.options}>
        {/* {props.options.map((item,index)=>{
            return(
            <span key={item.value}>
                <Checkbox onChange={(e)=>{onCheckAllChange(e,item)}} value={item.value} checked={checkAll}> {item.label}-{checkAll}</Checkbox>
                
            </span>
            )
        })
        } */}
        </Checkbox.Group>
       </div>:
        <div className='gg=flex-1'>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
        </div>
      }
    </>
  );
};
export default CheckboxOptions;