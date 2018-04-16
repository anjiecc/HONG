/**
 * @Author: chenanjie
 * @Date:   2017-07-05T17:54:16+08:00
 * @Last modified by:   chenanjie
 * @Last modified time: 2017-07-05T21:39:35+08:00
 */

var dataBase = require("./dataBase.js");
var querySql = {
  login: "SELECT * FROM anjie where userName = ? and passWord= ?",
  register: "INSERT INTO anjie (userName,id,passWord) VALUES (?,?,?)",
  checkUserName: "SELECT * FROM anjie where userName = ?"
};
/**
 * 登录
 */
exports.login = function(params, callback) {
  dataBase(querySql.login, params, function(data) {
    if (data.success && data.data && data.data.length) {
      callback(true);
    } else {
      callback(false);
    }
  });
};
/**
 * 注册用户
 * chenanjie 2018.3.25 21:00
 * @param {Array} params
 * @param {Function} callback
 */
exports.register = function(params, callback) {
  dataBase(querySql.register, params, function(data) {
    callback(data);
  });
};
/**
 * 验证用户名是否重复
 * chenanjie 2018.3.25 21:20
 * @param {Array} params
 * @param {Function} callback
 */
exports.checkUserName = function(params, callback) {
  dataBase(querySql.checkUserName, params, function(data) {
    callback(data);
  });
};
/**
 * 获取照片数据
 */
exports.getFile = function(parmas, callback) {
  dataBase("SELECT * FROM files where fileType = ? ", parmas, function(data) {
    console.log(data);
    if (data.success) {
      callback({
        msg: true,
        data: data
      });
    } else {
      callback({
        msg: false,
        data: {}
      });
    }
  });
};

/**
 * 添加照片文件
 */
exports.addPhoto = function(params, callback) {
  dataBase(
    "INSERT INTO files(id,name,url,size,type,date,author,fileType) values(?,?,?,?,?,?,?,?)",
    params,
    function(data) {
      console.log(data);
      if (data.success) {
        callback({
          data: data.success
        });
      } else {
        callback({
          data: false
        });
      }
    }
  );
};

/**
 * 删除照片文件
 */
exports.delPhoto = function(params, callback) {
  dataBase("DELETE FROM files WHERE files.id = ?", params, function(data) {
    console.log(data);
    if (data.success) {
      callback({
        data: data,
        msg: true
      });
    } else {
      callback({
        data: "",
        msg: false
      });
    }
  });
};
