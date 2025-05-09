const mongoose = require('mongoose');

const PlayerData = mongoose.model('Player');

const Player  = require("../models/Player");

module.exports = {
	async showAll(req, res){
		const playerData = await PlayerData.find().sort({score: -1}).select('name score updatedAt createdAt');
		return res.json(playerData);
	},

	async showAllGTZero(req, res){
		const playerData = await PlayerData.find({ "score": { $gt: 0 } }).sort({score: -1}).select('name score updatedAt createdAt');
		return res.json(playerData);
	},

	async show(req, res){
		const id = req.params.id;
		Player.findById(id)
			.select('_id name score createdAt')
			.exec()
			.then(doc => {
				if(doc){
					res.status(200).json({
						Player: doc,
					});
				}else{
					res.status(404).json({message: 'No data available.'});
				}
			})
			.catch(err => {
				res.status(500).json({error: err});
			});
	},

	async store(req, res){
		const player = new Player({
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			score: req.body.score,
		});
		player
			.save()
			.then(result => {
				res.status(201).json({
					message: 'player created successfully',
					createdPlayer:{
						name: result.name,
						score: result.score,
						updatedAt: result.updatedAt,
						createdAt: result.createdAt,
						_id: result._id,
					}
				});
			})
			.catch(err => {
				res.status(500).json({
					error: err
				});
			});
	},

	async update(req,res){
		const id = req.params.id;
		const updateOps = {};
		let hasUpdated = false;
		for(const ops of req.body){
			updateOps[ops.propName] = ops.value;
			if(ops.propName === "updatedAt") {
				hasUpdated = true;
			}
		}
		if(!hasUpdated){
			updateOps["updatedAt"] = Date.now();
		}
		
		Player.updateMany({_id: id}, {$set: updateOps})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Player updated',
				});
			})
			.catch(err => {
				res.status(500).json({
					error: err
				})
			});
	},

	async destroy(req, res){
		const id = req.params.id;
		Player.deleteOne({_id: id})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Player deleted',
				});
			})
			.catch(err => {
				res.status(500).json({
					error: err
				});
			});
	}

};