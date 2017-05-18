var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs=require('ejs');
var index = require('./routes/index');
var app = express();
var http=require('http').Server(app);
var io=require('socket.io').listen(http);//引入socket.io模块并绑定到服务器

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html',ejs.__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function (req,res) {
    res.render('./client/index');
});

var users=[];
var userCount=0;
io.on('connection', function(socket){
    socket.on('nikname',function (nikname) {
        if(users.indexOf(nikname)>-1){
            socket.emit('hasNikname',nikname);
        }else {
            userCount++;
            users.push(nikname);
            socket.emit('logined',{nikname:nikname,userCount:userCount});
           // io.sockets.emit('system',nikname);//向除了自己以外的所有在线用户发送消息
            socket.broadcast.emit('system',{nikname:nikname,userCount:userCount});//向所有连接服务器的客户端发送当前登录成功的用户的昵称
        }
    })

   socket.on('message',function (data) {
        io.sockets.emit('newMessage',data);
   })
});


//node bin/www 运行 地址：localhost:5555
// module.exports = app;
//
//node app 运行
http.listen('5555',function () {
    console.log('server runing at localhost:5555');
})