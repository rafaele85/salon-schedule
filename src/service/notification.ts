import EventEmitter from "events";

export enum IEvent {
    UPDATEDAY="updateday",
    UPDATEEENTITY="updateentity",
    UPDATEINTERVAL="updateinterval",
    UPDATEINTERVALLIST="updateintervallist",
}

export type IEventPayload = any;

export type IEventHandler = (event: IEvent, payload: IEventPayload) => void;



export class NotificationService {

    private static readonly _instance = new NotificationService();
    public static instance() {
        return NotificationService._instance;
    }

    private emitter;
    private constructor() {
        this.emitter = new EventEmitter({captureRejections: true});
    }

    public subscribe(event: IEvent, handler: IEventHandler) {
        this.emitter.addListener(event, handler);
    }


    public unsubscribe(event: IEvent, handler: IEventHandler) {
        this.emitter.removeListener(event, handler);
    }

    public notify(event: IEvent, eventData: IEventPayload) {
        const payload = [event, eventData];
        try {
            this.emitter.emit(event, ...payload);
        } catch(err) {
            console.error(err);
        }
    }
}

/*

    NotificationService.instance().subscribe(IEvent.UPDATEDAY,
        (event: IEvent, payload: IEventPayload) => this.handleEvent(event, payload)
    );

*/