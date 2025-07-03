import { TopicI } from "./TopicI";

export interface UnitI {
    id: number;
    name: string;
    topics: TopicI[];
}