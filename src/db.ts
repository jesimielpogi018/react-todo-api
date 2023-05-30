interface DB {
  DB: string,
  TODOS: string,
  USERS: string,
  AUTH: string,
}

const db: DB = {
  DB: "todos",
  TODOS: "todo_lists",
  USERS: "todo_users",
  AUTH: "todo_users_auth",
};

module.exports = db;
