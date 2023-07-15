import { createSignal, onCleanup } from "solid-js";

function MyComponent(props) {
  const [count, setCount] = createSignal(0),
    timer = setInterval(() => setCount(count() + 1), 1000);

  onCleanup(() => clearInterval(timer));


  return <div>Hello {props.name} {count()}</div>;
}

export default MyComponent;
