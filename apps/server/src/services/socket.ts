import { Server } from "socket.io"
import { Redis } from "ioredis";


const pub = new Redis({
    host: 'caching-1eb08288-harshpandey.l.aivencloud.com',
    port: 22110,
    username: "default",
    password: "AVNS_9da-XtxKPzBr9PO9YVe"
})
const sub = new Redis({
    host: 'caching-1eb08288-harshpandey.l.aivencloud.com',
    port: 22110,
    username: "default",
    password: "AVNS_9da-XtxKPzBr9PO9YVe"
})
class SocketService {
    private _io: Server;
    constructor() {
        console.log("init Socket Services...")
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*"
            }
        })
        sub.subscribe('MESSAGES')
    }


    public initListeners() {
        const io = this._io;
        console.log("init socket listener...");

        io.on('connection', (socket) => {

            console.log(`New Socket Connected`, socket.id);

            socket.on('event:message', async ({ message }: { message: string }) => {

                console.log("new Message ", message);
                await pub.publish('MESSAGES', JSON.stringify({ message }))
            })
        })
    sub.on('message',(channel,message)=>{
        if(channel === 'MESSAGES'){
            io.emit('message', message)
        }
    })
    }
    get io() {
        return this._io
    }
}

export default SocketService;