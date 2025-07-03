export class Template {
    title: string;
    subtitle: string;
    content: string;
    topic_id: number;

    constructor(title: string, subtitle: string, content: string, topic_id: number) {
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.topic_id = topic_id;
    }
}