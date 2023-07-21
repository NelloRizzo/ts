import fs from 'fs'

class Options {
    constructor(
        public serviceKey?: string,
        public citiesCsv?: string,
        public serverPort?: number
    ) { }
}

interface IConfigurationService {
    getConfiguration(): Promise<Options>
}

const configFileName = './config.json'
class JSONConfigurationService implements IConfigurationService {
    getConfiguration = async (): Promise<Options> => {
        if (fs.existsSync(configFileName))
            return JSON.parse(await fs.promises.readFile(configFileName, 'utf-8'))
        throw `Configuration file not found at ${configFileName}`
    }
}

class Store {
    static config: Options
}

export async function configuration(): Promise<Options> {
    if (!Store.config)
        Store.config = await new JSONConfigurationService().getConfiguration()
    return Store.config
}

export { IConfigurationService, Options }