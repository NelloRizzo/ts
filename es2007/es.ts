class User {
    public constructor(
        public id?: number,
        public username?: string
    ) { }
}
class ToDo {
    public constructor(
        public userId: number,
        public id: number,
        public title: string,
        public completed: boolean,
        public user?: User,
    ) { }
}

const usersUrl = "https://jsonplaceholder.typicode.com/users"
const todosUrl = "https://jsonplaceholder.typicode.com/todos"

interface IExtractor<T> {
    get(): Promise<Array<T>>
}

class Extractor<T> implements IExtractor<T>{
    protected constructor(private url: string) { }
    public get = async (): Promise<Array<T>> => {
        return (await fetch(this.url)).json()
    }
}

class UserExtractor extends Extractor<User>{
    constructor() { super(usersUrl) }
}
class ToDoExtractor extends Extractor<ToDo>{
    constructor() { super(todosUrl) }
}

class Aggregator implements IExtractor<ToDo> {
    private users = new UserExtractor()
    private todos = new ToDoExtractor()

    public get = async (): Promise<Array<ToDo>> => {
        const todos = await this.todos.get()
        const users = await this.users.get()
        return todos.map(t => {
            const user = users.filter(u => u.id == t.userId).pop()
            return new ToDo(t.userId, t.id, t.title, t.completed, new User(user?.id, user?.username))
        })
    }
}
export { User, ToDo, UserExtractor, ToDoExtractor, Aggregator }