
type UserType = {
    // id: string;
    email: string;
    password: string;
    createdEvents: EventType[];
};

type EventType = {
    id: string;
    title: string;
    description: string;
    price: number;
    date: Date;
    creator: UserType;
};
export type {UserType, EventType}