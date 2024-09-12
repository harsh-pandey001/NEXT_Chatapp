import {Server} from "socket.io"

class SocketService{
    private _io:Server;
    constructor(){
        console.log("init Socket Services...")
        this._io = new Server({
            cors :{
                allowedHeaders : ["*"],
                origin : "*"
            }
        })
    }


    public initListeners(){
        const io = this._io;
        console.log("init socket listener...");
        
        io.on('connection', (socket) => {

            console.log(`New Socket Connected`, socket.id);

            socket.on('event:message',async({message} : {message : string})=>{

                console.log("new Message ", message);
                
            })
            
        })
    }
    get io(){
        return this._io
    }
}

export default SocketService;