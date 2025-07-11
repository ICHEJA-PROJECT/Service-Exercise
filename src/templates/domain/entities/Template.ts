export class Template {
    title: string;
    instructions: string;
    suggestTime: string;
    attributes: object;
    topic: number;
    layout: number;

    constructor(title: string, instructions: string, attributes: object, topic: number, suggest_time: string, layout: number) {
        this.title = title;
        this.instructions = instructions;
        this.suggestTime = suggest_time;
        this.attributes = attributes;
        this.topic = topic;
        this.layout = layout;
    }
}