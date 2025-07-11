import { LayoutI } from "src/layouts/domain/entitiesI/LayoutI";
import { TopicI } from "./TopicI";

export class ResourceI {
    id: number;
    title: string;
    content: object;
    topics: TopicI[];
    layout: LayoutI;
}