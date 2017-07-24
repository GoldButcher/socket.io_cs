var mysql = require('mysql');
//填写数据库连接信息，可查询数据库详情页
var username = 'root';
var password = '123456';
var db_host = '127.0.0.1';
var db_port = 3306;
var db_name = 'kefu';
var option = {
    host: db_host,
    port: db_port,
    user: username,
    password: password,
    database: db_name
};

function _exec(sqls,values,after) {
    var client = mysql.createConnection(option);


    client.connect(function(err,result){
        if (err) {
            console.log(err);
            return;
        }

        client.query(sqls || '', values || [],function(err,r){
            after(err,r);
        });
        client.end();

    });
    client.on('error',function(err) {
        if (err.errno != 'ECONNRESET') {
            after("err01",false);
            throw err;
        } else {
            after("err02",false);
        }
    });
}
exports.exec = _exec;