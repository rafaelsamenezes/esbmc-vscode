class Logger {
    private _base: string;

    constructor() {
        this._base = "[ESBMC]";
    }

    private _sendMessage(msg: string, mode: string) {
        console.log(`${this._base}[${mode}] ${msg}`);
    }

    info(msg: string) {
        this._sendMessage(msg, "INFO");
    }

    verbose(msg: string) {
        this._sendMessage(msg, "VERBOSE");
    }

    debug(msg: string) {
        this._sendMessage(msg, "DEBUG");
    }
}
let logger = new Logger();
export default logger;