export type FeedType<T> = {
    items: T[];
    Component: React.ComponentType<{ item: T }>;
};