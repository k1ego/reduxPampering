import { useEffect, useReducer } from 'react';
import './App.css';
import { DecrementAction, IncrementAction, store } from './store';

function App() {

  // это для принудительного обновления компонента. Переменная forceUpdate 
  // содержит функцию-диспатчер, которая увеличивает состояние на 1 каждый раз, 
  // когда вызывается, что заставляет компонент перерендериваться

  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  // useEffect выполняет подписку на изменения состояния хранилища Redux при монтировании компонента. 
  // Когда состояние хранилища изменяется, вызывается forceUpdate, 
  // что приводит к перерендериванию компонента. Возвращаемая функция 
  // unsubscribe отменяет подписку при размонтировании компонента, чтобы 
  // избежать утечек памяти.

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });

    return unsubscribe;
  }, [])



	return (
		<div>
      {/* достаем актуальное значение counter */}
			counter {store.getState().counter}
			{/* ключевое слово "satisfies" говорит о том, что {type: ""} этот литерал соответствует типу IncrementAction*/}
			<button
				onClick={() =>
					store.dispatch({ type: 'increment' } satisfies IncrementAction)
				}
			>
				increment
			</button>
			<button
				onClick={() =>
					store.dispatch({ type: 'decrement' } satisfies DecrementAction)
				}
			>
				decrement
			</button>
		</div>
	);
}

export default App;
