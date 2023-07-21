class User {
    id;
    username;
    constructor(id, username) {
        this.id = id;
        this.username = username;
    }
}
class ToDo {
    userId;
    id;
    title;
    completed;
    user;
    constructor(userId, id, title, completed, user) {
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.user = user;
    }
}
const usersUrl = "https://jsonplaceholder.typicode.com/users";
const todosUrl = "https://jsonplaceholder.typicode.com/todos";
class Extractor {
    url;
    constructor(url) {
        this.url = url;
    }
    get = async () => {
        return (await fetch(this.url)).json();
    };
}
class UserExtractor extends Extractor {
    constructor() { super(usersUrl); }
}
class ToDoExtractor extends Extractor {
    constructor() { super(todosUrl); }
}
class Aggregator {
    users = new UserExtractor();
    todos = new ToDoExtractor();
    get = async () => {
        const todos = await this.todos.get();
        const users = await this.users.get();
        return todos.map(t => {
            const user = users.filter(u => u.id == t.userId).pop();
            return new ToDo(t.userId, t.id, t.title, t.completed, new User(user?.id, user?.username));
        });
    };
}
export { User, ToDo, UserExtractor, ToDoExtractor, Aggregator };
