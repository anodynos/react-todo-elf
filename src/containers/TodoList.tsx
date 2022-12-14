import TodoContext from '../infrastructure/todo.context.provider';
import { useContext } from 'react';
import TodoItem from '../components/TodoItem';
import { useObservable } from '@ngneat/use-observable';

const TodoList = () => {
  const { repository } = useContext(TodoContext);
  const [todos] = useObservable(repository.visibleTodos$);

  const handleToggleCompleted = (id: string) => {
    repository.toggleCompleted(id);
  };
  const handleRemove = (id: string) => {
    repository.removeTodo(id);
  };

  return (
    <div>
      <h2 className="font-semibold uppercase text-xl tracking-wide text-slate-400 mt-8 mb-4">Todo List</h2>
      {todos.map((todo) => (
        <TodoItem todo={todo}
                  onToggleCompleted={handleToggleCompleted}
                  onRemove={handleRemove}
                  // onActive={handleActive}
                  key={todo.id}/>
      ))}
    </div>
  );
};

export default TodoList;
