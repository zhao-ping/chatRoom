#chatRoom
一个简单的基于socket.io的聊天室

##使用方法
首先安装全局socket.io
```
$ cnpm install socket.io -g
```
下载本例，install并运行
```$xslt
$ cnpm install
$ cnpm node app
$ node app
```
在浏览器中打开 localhost:5555

#socket.io文档
[SOCKET.IO，系统API](http://www.cnblogs.com/xiezhengcai/p/3956401.html)
##服务端
1. 监听客户端连接,回调函数会传递本次连接的socket
```$xslt
io.on('connection',function(socket));
```
2. 给所有客户端广播消息
```$xslt
io.sockets.emit('String',data);
```
3. 给指定的客户端发送消息
```$xslt
io.sockets.socket(socketid).emit('String', data);
```
4. 监听客户端发送的信息
```$xslt
socket.on('String',function(data));
```
5. 给该socket的客户端发送消息
```$xslt
socket.emit('String', data);
```
6. 广播消息
```$xslt
//给除了自己以外的客户端广播消息
socket.broadcast.emit("msg",{data:"hello,everyone"}); 

//给所有客户端广播消息
io.sockets.emit("msg",{data:"hello,all"});
```
7. 分组
```$xslt
socket.on('group1', function (data) {
        socket.join('group1');
});
socket.on('group2',function(data){
        socket.join('group2');
 });
```
8.客户端发送
```$xslt
socket.emit('group1')//就可以加入group1分组；
socket.emit('group2')//就可以加入group2分组；

//一个客户端可以存在多个分组（订阅模式）
```
9. 踢出分组
```$xslt
socket.leave(data.room);
```
对分组中的用户发送信息(broadcast方法允许当前socket client不在该分组内)
```$xslt
//不包括自己
socket.broadcast.to('group1').emit('event_name', data);
//包括自己
io.sockets.in('group1').emit('event_name', data);
```
10. 获取连接的客户端socket 
```$xslt
io.sockets.clients().forEach(function (socket) {
    //.....
})
```
11. 获取分组信息
```$xslt
//获取所有房间（分组）信息
io.sockets.manager.rooms
//来获取此socketid进入的房间信息
io.sockets.manager.roomClients[socket.id]
//获取particular room中的客户端，返回所有在此房间的socket实例
io.sockets.clients('particular room')
```    
12. 另一种分组方式
```$xslt
io.of('/some').on('connection', function (socket) {
    socket.on('test', function (data) {
        socket.broadcast.emit('event_name',{});
    });
});
```
客户端都链接到ws://103.31.201.154:5555 但是服务端可以通过io.of('/some')将其过滤出来。

另外，Socket.IO提供了4个配置的API：io.configure, io.set, io.enable, io.disable。其中io.set对单项进行设置，io.enable和io.disable用于单项设置布尔型的配置。io.configure可以让你对不同的生产环境（如devlopment，test等等）配置不同的参数。
# 客户端
1. 建立一个socket连接
```$xslt
var socket = io("ws://103.31.201.154:5555");
```
2. 监听服务消息
```$xslt
socket.on('msg',function(data){
    socket.emit('msg', {rp:"fine,thank you"}); //向服务器发送消息
    console.log(data);
});
```
3. 监听socket断开与重连。
```$xslt
socket.on('disconnect', function() {
    console.log("与服务其断开");
});


socket.on('reconnect', function() {
    console.log("重新连接到服务器");
});
```
4. 客户端socket.on()监听的事件：
```$xslt
connect：连接成功
connecting：正在连接
disconnect：断开连接
connect_failed：连接失败
error：错误发生，并且无法被其他事件类型所处理
message：同服务器端message事件
anything：同服务器端anything事件
reconnect_failed：重连失败
reconnect：成功重连
reconnecting：正在重连
//当第一次连接时，事件触发顺序为：connecting->connect；当失去连接时，事件触发顺序为：disconnect->reconnecting（可能进行多次）->connecting->reconnect->connect。
```










