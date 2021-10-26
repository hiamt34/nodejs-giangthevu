const PatternService = require("./pattern.service");
const { hotelModel } = require('../models');
const replaceTones = require('../ultis/funcSuport') 
class HotelService extends PatternService {

    constructor(model) {
        super(model)
    };

    getAll = async (config, { location, rating, type }) => {
        try {
            const count = await this.model.count({})
            let payload = await this.model.find({}).limit(config.limit).skip(config.limit * (config.page - 1))

            if (location) {
                payload = payload.filter(item => item.location == location)
            }
            if (rating) {
                payload = payload.filter(item => item.rating >= Number(rating))
            }
            if (type) {
                payload = payload.filter(item => item.type == type)
            }

            return await {
                data: payload,
                meta: {
                    perPage: Number(config.limit),
                    total: count,
                    currentPage: Number(config.page),
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    search = async ({ search }) => {
        try {

            let hotels = await this.model.find({})
            return hotels = await hotels.filter(hotel => 
                replaceTones(
                    hotel.name.trim()
                )
                .toLowerCase()
                .includes(
                    replaceTones(search.trim())
                    .toLowerCase()
                )
            )

        } catch (error) {
            throw new Error(error);
        }
    };
}

const hotelservice = new HotelService(hotelModel);

module.exports = hotelservice;
