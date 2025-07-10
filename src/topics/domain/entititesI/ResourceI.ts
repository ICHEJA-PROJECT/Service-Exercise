import { LayoutI } from "src/layouts/domain/entitiesI/LayoutI";
import { TopicI } from "./TopicI";

export class ResourceI {
    id: number;
    content: object;
    topics: TopicI[];
    layout: LayoutI;
}