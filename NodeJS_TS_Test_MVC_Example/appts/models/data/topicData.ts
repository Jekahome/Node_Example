
    export class TopicData {
        private readonly _id: number;
        private readonly _topic: string;
        private readonly _translate: string;
        constructor(id: number, topic: string, translate: string) {
            this._id = id;
            this._topic = topic;
            this._translate = translate;
        }
        public get id() {
            return this._id;
        }
        public get topic() {
            return this._topic;
        }
        public get translate() {
            return this._translate;
        }
    }
