import { ResourceI } from "./ResourceI";

export interface TopicI {
    id: number;
    name: string;
    unit_id: number;
    resources: ResourceI[];
}