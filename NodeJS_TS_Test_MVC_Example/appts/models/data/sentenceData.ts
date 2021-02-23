
export class SentenceData {
        private readonly _id: number;
        private readonly _sentence: string;
        private readonly _translate: string;
        constructor(id: number, sentence: string, translate: string) {
            this._id = id;
            this._sentence = sentence;
            this._translate = translate;
        }
        public get id() {
            return this._id;
        }
        public get sentence() {
            return this._sentence;
        }
        public get translate() {
            return this._translate;
        }
 }
