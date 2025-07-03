export class Exercise {
    instructions: string;
    paths_images: string[];
    context: Object;

    constructor(instructions: string, path_images: Array<string>, context: Object) {
        this.instructions = instructions;
        this.paths_images = path_images;
        this.context = context;
    }
}