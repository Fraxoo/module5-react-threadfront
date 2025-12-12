import type { FeedType } from "../types/FeedType";


export default function FeedComponent<T>({ items, Component }: FeedType<T>) {
  return (
    <div>
      <h1>Feed</h1>

      {items.map((item: any) => (
        <Component 
        key={item.id} 
        item={item}
         />
         
      ))}
    </div>
  );
}