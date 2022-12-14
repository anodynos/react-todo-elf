import React, { useCallback, useContext } from 'react';
import { Todo } from '../repository/todo.repository';
import TodoContext from '../infrastructure/todo.context.provider';

const TodoItem = ({
                    todo,
                    onRemove,
                    onToggleCompleted,
                  }: {
  todo: Todo,
  onRemove: (id: string) => void,
  onToggleCompleted: (id: string) => void
}) => {
  const {repository} = useContext(TodoContext);
  
  
  return (
    <div
      className={`flex mb-4 px-4 py-2 items-center rounded-[20px]  drop-shadow-xl ${todo.completed ? 'bg-slate-900' : 'bg-slate-800'}`}>
      <label className={`flex grow items-center ${todo.completed ? 'line-through' : ''} cursor-pointer`}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleCompleted(todo.id)}
          className=" text-green-500 w-8 h-8 mr-2 focus:ring-green-400 focus:ring-opacity-25 border border-gray-300 rounded-full"/>
        <span className="grow text-center  text-xl">{todo.name}</span>
      </label>
      <button
        onClick={() => onRemove(todo.id)}
        className="flex-no-shrink p-2 ml-2 border-2 rounded-full text-red-500 border-red-500 hover:text-white hover:bg-red-500 fill-red-500 hover:fill-white">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
             width="30" height="30"
             viewBox="0 0 30 30"
        >
          <path
            d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z">
          
          </path>
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;
