import { createState, select, Store, withProps } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  selectAllApply,
  updateEntities,
  withEntities,
  selectEntity,
} from '@ngneat/elf-entities';
import { Observable, switchMap, take, tap } from 'rxjs';

export interface VisibilityFilterProps {
  filter: 'active' | 'completed' | 'all';
}

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
}

export interface TodoRepository {
  todos$: Observable<Todo[]>;
  
  addTodo(text: Todo['name']): void;
  
  removeTodo(id: string): void;
  
  toggleCompleted(id: string): void;
  
  updateFilter(type: VisibilityFilterProps['filter']): void;
}


const {state, config} = createState(
  withProps<VisibilityFilterProps>({filter: 'all'}),
  withEntities<Todo>(),
);


export class TodoRepositoryElf implements TodoRepository {
  private todosStore = new Store({name: 'todos', state, config});
  filter$ = this.todosStore.pipe(select(({filter}) => filter));
  todos$: Observable<Todo[]> = this.filter$.pipe(switchMap((filter) => {
    return this.todosStore.pipe(selectAllApply({
      filterEntity({completed}): boolean {
        if (filter === 'all') return true;
        return filter === 'completed' ? completed : !completed;
      },
    }));
  }));
  
  addTodo(text: Todo['name']) {
    this.todosStore.update(addEntities({
      name: text,
      id: Date.now().toString(),
      completed: false,
    }));
  }
  toggleCompleted(id: string) {
    this.todosStore.pipe(selectEntity(id), take(1))
    .subscribe((todo =>
        this.todosStore.update(updateEntities(id, {
          completed: !todo?.completed,
        }))
    ))
  }
  
  removeTodo(id: string): void {
    this.todosStore.update(deleteEntities(id));
  }
  
  updateFilter(type: VisibilityFilterProps['filter']): void {
    this.todosStore.update((state) => ({
      ...state,
      filter: type,
    }));
  }
}
