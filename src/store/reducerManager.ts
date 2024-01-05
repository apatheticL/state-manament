export type ReducerFunction<S, A> = (state: S | undefined, action: A) => S;
class ReducerManager<S, A> {
  private reducers: Record<string, ReducerFunction<S, A>> = {};
  private rootReducer: ReducerFunction<Record<string, S>, A>;

  constructor(initialReducers: Record<string, ReducerFunction<S, A>>) {
    this.reducers = {...initialReducers};
    this.rootReducer = this.combineReducers(this.reducers);
  }

  private combineReducers(reducers: Record<string, ReducerFunction<S, A>>) {
    return (state: Record<string, S> = {}, action: A) => {
      const nextState: Record<string, S> = {};
      for (const key in reducers) {
        nextState[key] = reducers[key](state[key], action);
      }
      return nextState;
    };
  }

  add(name: string, reducer: ReducerFunction<S, A>) {
    this.reducers[name] = reducer;
    this.rootReducer = this.combineReducers(this.reducers);
  }

  addMulti(reducers: object[]) {
    reducers.forEach((item: any) => {
      console.log(item);
      // @ts-ignore
      this.reducers[item.name] = item.reducer;
    });
    this.rootReducer = this.combineReducers(this.reducers);
  }

  remove(name: string) {
    delete this.reducers[name];
    this.rootReducer = this.combineReducers(this.reducers);
  }

  getNameOfReducer(): string[] {
    return Object.keys(this.reducers);
  }

  getRootReducer(): ReducerFunction<Record<string, S>, A> {
    return this.rootReducer;
  }
}

export default ReducerManager;
