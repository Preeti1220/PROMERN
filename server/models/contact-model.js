import { mongoose } from 'mongoose'

const contactSchema = new mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    message: { type: String, require: true }
})

// create collection or model
const Contact = new mongoose.model("Contact", contactSchema);

export default Contact;
