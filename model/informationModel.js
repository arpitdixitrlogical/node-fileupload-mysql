const mysql = require("mysql2/promise");
class informationModel {
  constructor(id) {
    this.id = id;
    this.pool = mysql.createPool({
      host: "phpmyadmin.rlogical.com",
      user: "root",
      database: "node_information_demo",
      password: "Mobile2020",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  async getRecord() {
    const result = await this.pool.query(
      "SELECT * from informations WHERE id = ?",
      [this.id]
    );
    if (result[0].length < 1) {
      throw new Error("Post with this id was not found");
    }
    return result[0][0];
  }
  async createRecord(data) {
    var picture = data.picture;
    var picture_name = picture.name;
    picture.mv("public/files/" + picture.name, function (err) {});
    var file = data.file;
    var file_name = file.name;
    file.mv("public/files/" + file.name, function (err) {});

    const result = await this.pool.query(
      "INSERT INTO informations SET picture = ?, file = ?",
      [picture_name, file_name]
    );
    return result[0].insertId;
  }
}
module.exports = informationModel;
