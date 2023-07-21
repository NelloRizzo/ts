import fs from 'fs';
class Options {
    serviceKey;
    citiesCsv;
    serverPort;
    constructor(serviceKey, citiesCsv, serverPort) {
        this.serviceKey = serviceKey;
        this.citiesCsv = citiesCsv;
        this.serverPort = serverPort;
    }
}
const configFileName = './config.json';
class JSONConfigurationService {
    getConfiguration = async () => {
        if (fs.existsSync(configFileName))
            return JSON.parse(await fs.promises.readFile(configFileName, 'utf-8'));
        throw `Configuration file not found at ${configFileName}`;
    };
}
class Store {
    static config;
}
export async function configuration() {
    if (!Store.config)
        Store.config = await new JSONConfigurationService().getConfiguration();
    return Store.config;
}
export { Options };
