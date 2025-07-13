import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

interface isFileOptions {
    mime?: string[];
}

export function isFile(options: isFileOptions, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        return registerDecorator({
            name: 'isFile',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [options],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (!value) return false;

                    const [opts] = args.constraints;

                    if(opts.mime && opts.mime.lenght > 0) {
                        if(!value.mimetype || !opts.mime.includes(value.mimetype)) {
                            return false;
                        }
                    }

                    return true;
                },
                defaultMessage(args: ValidationArguments) {
                    const [opts] = args.constraints;
                    if(opts.mime) {
                        return `El archivo debe ser alguno de esos tipos:${opts.mime.join(', ')}`;
                    }
                    return 'Archivo invalido';
                }
            }
        });
    }
}