const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main().then(() => { console.log("connection sucessfull") }).catch((err) => { console.log(err) });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chats = [
    {
        from: 'sonu',
        to: 'yash',
        message: 'khelega',
        created_at: new Date()
    },
    {
        from: 'sonu',
        to: 'yash',
        message: 'khelega',
        created_at: new Date()
    },
    {
        from: 'shubham',
        to: 'khilesh',
        message: 'kya kar raha hai',
        created_at: new Date()
    },
    {
        from: 'ujjwal',
        to: 'zainab',
        message: 'Python',
        created_at: new Date()
    }
]

// Chat.insertMany(chats); 
let chat = new Chat({
    from: 'pain',
    to: 'tsunade',
    message: 'feel pain',
    created_at: new Date()
})
chat.save()