const informationModel = require("../model/informationModel");
class InformationController {
  async getRecord(req, res) {
    var id = req.params.id;
    let setinfo = await new informationModel(id);
    var info = await setinfo.getRecord();
    console.log(info);
    res.send(info);
  }
  async createRecord(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    let setinfo = await new informationModel(1);
    var info = await setinfo.createRecord(req.files);

    res.send("Record added successfully");
  }
}

module.exports = InformationController;
