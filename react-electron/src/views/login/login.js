import React from 'react'
import { createTheme, ThemeProvider, Button, IconButton, Stack, Typography, Paper,Alert ,AlertTitle} from "@mui/material";
import styles from'./login.module.css'
export default function login() {
  const handleClick=()=>{
    console.log(window.electron,global);
    window.electron.sendMessage('some-name','login-发送消息->主进程').then((result)=>{
       
      console.log(result)
       
    })
  }
  return (
    <div>
      <header className={styles.header}>
        顶部菜单-可拖动
      </header>
      login
      <input type={'range'} name={'range'} min={'0'} max='10'></input>
      <Button variant='contained' onClick={()=>{handleClick()}}>login</Button>
    </div>
  )
}
