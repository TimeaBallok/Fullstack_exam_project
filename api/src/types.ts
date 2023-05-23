import { Document } from 'mongoose';

type UserType = {
    // id: string;
    email: string;
    password: string;
    createdEvents: EventType[];
};
type UserObjectType = Omit<UserDocumentType, '_id' | '__v' | 'password'> & { _id: string, password: null };

type EventType = {
    title: string;
    description: string;
    price: number;
    date: Date;
    creator: UserType;
};

type EventResultType = Omit<EventDocumentType, '_id' | '__v'> & { _id: string, date: Date };
type EventObjectType = Omit<EventDocumentType, '_id' | '__v'> & { _id: string };

type BookingType = {
    _id: string;
    event: EventType;
    user: UserType;
}

// type BookingResultType = Omit<BookingDocumentType, '_id' | '__v'> & { _id: string, createdAt: Date, updatedAt: Date };
// type BookingObjectType = Omit<BookingDocumentType, '_id' | '__v' | 'createdAt' | 'updatedAt'> & { _id: string, createdAt: Date, updatedAt: Date };

interface EventDocumentType extends EventType, Document {} // Extend both the Typescript type and the Mongoose Document type to get access to both sets of properties.
interface UserDocumentType extends UserType, Document {}
interface BookingDocumentType extends BookingType, Document {}

export type { UserType, UserDocumentType, UserObjectType,
    EventType, EventResultType, EventObjectType, EventDocumentType,
    BookingType, BookingDocumentType};