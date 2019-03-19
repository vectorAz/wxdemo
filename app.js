const express = require('express');
const app = express();
app.get('/', (request, response) => {
console.log('服务器接收到请求了');
console.log(request.body);
})
app.listen(3000, err => {
if (!err) {
console.log('服务器启动成功');
} else {
console.log(err);
}
})