//import express 和 ws 套件
const express = require('express')
const SocketServer = require('ws').Server
var { of } = require('rxjs');

//指定開啟的 port
const PORT = 3000

//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
const server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server })

//當 WebSocket 從外部連結時執行
wss.on('connection', ws => {

    //連結時執行此 console 提示
    console.log('Client connected')


    //固定送最新時間給 Client
    // const sendNowTime = setInterval(()=>{
    //     ws.send(String(new Date()))
    // },1000)

    // ws.on('message', data => {
    //     //取得所有連接中的 client
    //     let clients = wss.clients

    //     //做迴圈，發送訊息至每個 client
    //     clients.forEach(client => {
    //         client.send(data)
    //     })
    // })

    //對 message 設定監聽，接收從 Client 發送的訊息
    ws.on('message', data => {
        let ob = of('zevi')
        //data 為 Client 發送的訊息，現在將訊息原封不動發送出去
        ob.subscribe((v) => {
            ws.send(v)
        })
        // ws.send(data)
    })

    //當 WebSocket 的連線關閉時執行
    ws.on('close', () => {
        console.log('Close connected')
    })
})