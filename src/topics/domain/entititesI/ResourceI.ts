import { LayoutI } from "src/layouts/domain/entitiesI/LayoutI";
import { TopicI } from "./TopicI";

export class ResourceI {
    id: number;
    content: Object;
    topics: TopicI[];
    layout: LayoutI;
}