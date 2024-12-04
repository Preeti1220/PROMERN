
import Service from '../models/service-model.js'

const services = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response) {
            res.status(404).json({ msg: 'services not found' });
            return;
        }
        res.status(200).json({ msg: response })
    } catch (error) {
        console.log(`Services:${error}`)
    }
}

export default services;