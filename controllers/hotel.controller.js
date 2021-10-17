const { hotelService } = require("../services")
const PatternController = require("./pattern.controller")

class HotelComtroller extends PatternController {
    index = async (req, res) => {
        try {
            const query = req.query
            const config = {
                limit: query.limit || 10,
                page: query.page || 1
            }
            const filter = {
                location: req.query.location || null,
                rating: req.query.rating || null,
                type: req.query.type || null,
            }
            const data = await hotelService.getAll(config, filter)
            return res.status(200).json({
                mes: 'success',
                data
            })
        } catch (error) {
            return res.status(409).json({
                mes: error.message
            })
        }

    };
} 

const hotelController = new HotelComtroller(hotelService)

module.exports = hotelController
