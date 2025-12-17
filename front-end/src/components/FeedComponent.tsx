import type { FeedType } from "../types/FeedType";


export default function FeedComponent<T>({ items, Component }: FeedType<T>) {
 return (
    <div className="list" >
     
      {items.map((item, index) => (
        <Component
          key={(item as any).id ?? index}
          item={item}
        />
      ))}
    </div>
  );
}


//MS ne pas mettre de "any" dans un projet react jamais !!!! 