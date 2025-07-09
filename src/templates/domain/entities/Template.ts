export class Template {
    title: string;
    instructions: string;
    suggest_time: string;
    attributes: object;
    topic_id: number;
    layout: number;

    constructor(title: string, instructions: string, attributes: object, topic_id: number, suggest_time: string, layout: number) {
        this.title = title;
        this.instructions = instructions;
        this.suggest_time = suggest_time;
        this.attributes = attributes;
        this.topic_id = topic_id;
        this.layout = layout;
    }
}