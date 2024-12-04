import Contact from '../models/contact-model.js';

const contactForm = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({ message: 'Message send successfully', response })
    } catch (error) {
        res.status(500).json({ message: 'Message not Delivered' })
        console.log(error)
    }
}

export default contactForm;
