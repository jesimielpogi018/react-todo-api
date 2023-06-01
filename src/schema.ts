// the todo list collection schema
interface todo_list {
  id: string;
  data: {
    todoTask: string;
    isStarred: boolean;
    todoDueDate: string;
    todoDetails: string;
  };
}

export { todo_list };