import Event from "../models/eventModel";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import {EventDocumentType, BookingDocumentType, UserObjectType, EventResultType, EventObjectType} from '../types';
import {DateTimeResolver} from 'graphql-scalars';
import Booking from "../models/bookingModel";
import jwt from 'jsonwebtoken';

const resolvers = {
    DateTime: DateTimeResolver,

    Query: {
        events: async () => {
            try {
                const events: EventDocumentType[] = await Event.find().populate('creator');
                return events.map((event: any) => {
                    const eventObject = (event.toObject() as EventResultType);
                    return {...eventObject, date: new Date(eventObject.date).toISOString()};
                });
            } catch (err) {
                throw new Error(`Failed to fetch events: ${err.message}`);
            }
        },
        bookings: async (parent: any, args: any, context: any, info: any) => {
            try {
                const bookings: BookingDocumentType[] = await Booking.find().populate('event').populate('user');
                return bookings.map((booking: any) => {
                    const bookingObject = (booking.toObject() as BookingDocumentType);
                    return {
                        ...bookingObject,
                    };
                });
            } catch (err) {
                throw new Error(`Failed to fetch bookings: ${err.message}`);
            }
        }
    },

    Mutation: {
        createEvent: async (parent: any, args: any, context: any, info: any) => {
            try {
                const event = new Event({
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: +args.eventInput.price,
                    date: new Date(args.eventInput.date),
                    creator: args.eventInput.creator
                });
                const result = await event.save();
                const eventObject = (result.toObject() as EventObjectType);
                return {...eventObject, _id: result.id, date: new Date(eventObject.date).toISOString()};
            } catch (err) {
                throw new Error(`Failed to create new event: ${err.message}`);
            }
        },

        deleteEvent: async (parent: any, args: any, context: any, info: any) => {
            try {
                const event: EventDocumentType = await Event.findById(args.eventId);
                if (!event) {
                    throw new Error('Event not found.');
                }
                await Event.deleteOne({_id: args.eventId});
                return event;
            } catch (err) {
                throw new Error(`Failed to delete event: ${err.message}`);
            }
        },

        updateEvent: async (parent: any, args: any, context: any, info: any) => {
            try {
                const event: EventDocumentType = await Event.findById(args.eventId);
                if (!event) {
                    throw new Error('Event not found.');
                }
                event.title = args.eventInput.title;
                event.description = args.eventInput.description;
                event.price = +args.eventInput.price;
                event.date = new Date(args.eventInput.date);
                await event.save();
                const eventObject = (event.toObject() as EventObjectType);
                return {...eventObject, _id: event.id, date: new Date(eventObject.date).toISOString()};
            } catch (err) {
                throw new Error(`Failed to update event: ${err.message}`);
            }
        },

        createUser: async (parent: any, args: any, context: any, info: any) => {
            try {
                const existingUser = await User.findOne({email: args.userInput.email});
                if (existingUser) {
                    throw new Error('User exists already.');
                }
                const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                });
                const result = await user.save();
                const userObject = (result.toObject() as UserObjectType);
                return {...userObject, password: null};
            } catch (err) {
                throw new Error(`Failed to create user: ${err.message}`);
            }
        },

        login: async (parent: any, args: any, context: any, info: any) => {
            const user: UserObjectType = await User.findOne({email: args.email});
            const passwordIsEqual = await bcrypt.compare(args.password, user.password);
            if (!user || !passwordIsEqual) {
                throw new Error('Invalid credentials.');
            }
            const token = jwt.sign({userId: user.id, email: user.email}, process.env.TOKEN_SECRET!, {expiresIn: '1h'});
            return {userId: user.id, token: token, tokenExpiration: 1};
        },

        bookEvent: async (parent: any, args: any, context: any, info: any) => {
            try {
                const event = await Event.findById(args.bookingInput.event);
                const user = await User.findById(args.bookingInput.user);

                if (!event || !user) {
                    throw new Error('Event or user not found');
                }

                const booking = new Booking({
                    user: args.bookingInput.user,
                    event: args.bookingInput.event
                });

                const result = await booking.save();
                return {...result, _id: result.id};

            } catch (err) {
                throw new Error(`Failed to book event: ${err.message}`);
            }
        },

        cancelBooking: async (parent: any, args: any, context: any, info: any) => {
            try {
                const booking: BookingDocumentType = await Booking.findById(args.bookingId).populate('event');
                const event: EventDocumentType = (booking.event as EventDocumentType);
                if (!booking || !event) {
                    throw new Error('Booking or event not found.');
                }
                await Booking.deleteOne({_id: args.bookingId});
                return event;
            } catch (err) {
                throw new Error(`Failed to cancel booking: ${err.message}`);
            }
        }
    },
};


export default resolvers;
