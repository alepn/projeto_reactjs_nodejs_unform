const Box = require('../models/Box');

class BoxController{
    
    async index(req, res){
		const { page = 1 } = req.query;
		const boxes = await Box.paginate({},{page, limit:10});

		return res.json(boxes);
    }
    
    async show(req, res){
		const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: { sort: { createdAt: -1 } } //Ordenacao decrescente
        });

		return res.json(box);
	}

    async store(req, res){
        const box = await Box.create(req.body);
        return res.json(box);
    }
}

module.exports = new BoxController();