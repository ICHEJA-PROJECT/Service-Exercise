import { InternalServerErrorException } from "@nestjs/common";
import { TopicSequenceRepository } from "../repositories/TopicSequenceRepository";

export class GetAvaibleTopicsUseCase {
    constructor(private readonly topicSequenceRepository: TopicSequenceRepository) {}

    async run(completedTopics: number[]): Promise<number[]> {
        try {

            if (!completedTopics || completedTopics.length === 0) {
                return [];
            }

            const allSequences = await this.topicSequenceRepository.findAll();
            
            // Construir un mapa para acceso rápido
            const nextTopicsMap = new Map<number, number[]>();
            const previousTopicsMap = new Map<number, number[]>();
            
            allSequences.forEach(seq => {
                // Mapear temas siguientes
                if (!nextTopicsMap.has(seq.currentTopic.id)) {
                    nextTopicsMap.set(seq.currentTopic.id, []);
                }
                nextTopicsMap.get(seq.currentTopic.id)!.push(seq.nextTopic.id);
                
                // Mapear temas anteriores
                if (!previousTopicsMap.has(seq.nextTopic.id)) {
                    previousTopicsMap.set(seq.nextTopic.id, []);
                }
                previousTopicsMap.get(seq.nextTopic.id)!.push(seq.currentTopic.id);
            });

            const accessibleTopics = new Set<number>();
            const visited = new Set<number>();
            const toProcess = [...completedTopics];

            while (toProcess.length > 0) {
                const currentTopicId = toProcess.pop()!;
                
                if (visited.has(currentTopicId)) {
                    continue;
                }
                
                visited.add(currentTopicId);

                // Procesar temas siguientes
                const nextTopics = nextTopicsMap.get(currentTopicId) || [];
                for (const nextTopicId of nextTopics) {
                    if (!accessibleTopics.has(nextTopicId)) {
                        // Verificar prerequisitos
                        const prerequisites = previousTopicsMap.get(nextTopicId) || [];
                        const allPrerequisitesCompleted = prerequisites.every(prereqId => 
                            completedTopics.includes(prereqId)
                        );
                        
                        if (allPrerequisitesCompleted) {
                            accessibleTopics.add(nextTopicId);
                            toProcess.push(nextTopicId);
                        }
                    }
                }

                // Procesar temas anteriores
                const previousTopics = previousTopicsMap.get(currentTopicId) || [];
                for (const previousTopicId of previousTopics) {
                    if (!accessibleTopics.has(previousTopicId)) {
                        accessibleTopics.add(previousTopicId);
                        toProcess.push(previousTopicId);
                    }
                }
            }

            const newAccessibleTopics = Array.from(accessibleTopics).filter(topicId => 
                !completedTopics.includes(topicId)
            );

            return newAccessibleTopics.sort((a, b) => a - b);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}