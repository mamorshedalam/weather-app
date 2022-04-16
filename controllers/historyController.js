const History = require('../model/History');

const createHistory = async (req, res) => {
     try {
          const result = await History.create(req.body);
          res.status(200).json(result);
     } catch (err) {
          console.error(err)
     }
}

const getHistory = async (req, res) => {
     try {
          const result = await History.find();
          res.status(200).json(result);
     } catch (err) {
          console.error(err)
     }

}

const deleteHistory = async (req, res) => {
     try {
          const result = await History.deleteOne({_id: req.body.id}).exec();
          res.status(200).json(result);
     } catch (err) {
          console.error(err)
     }
}

module.exports = { createHistory, getHistory, deleteHistory };