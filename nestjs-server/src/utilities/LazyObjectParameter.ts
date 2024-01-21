export class LazyObjectParameter {

    constructor(private object: Record<any, any>) {
    }

    toString() {
        return JSON.stringify(this.object);
    }
}
