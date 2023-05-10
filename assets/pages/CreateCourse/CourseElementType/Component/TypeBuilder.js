class Type {
    constructor(id, type, name, description, answer = null) {
        this._id = id;
        this._type = type;
        this._name = name;
        this._description = description;
        this._answer = answer;
    }
    getId() {
        return this._id;
    }
    getType() {
        return this._type;
    }
    getName() {
        return this._name;
    }
    getDescription() {
        return this._description;
    }
    getAnswer() {
        return this._answer;
    }

    toObject() {
        return {
            id: this._id,
            type: this._type,
            name: this._name,
            description: this._description,
            answer: this._answer,
        }
    }
}

class TypeBuilderClass {
    mapActualType(actual) {

        return (new Type(
            actual && (actual.id ?? null),
            actual && (actual.type ?? null),
            actual && (actual?.name ?? ''),
            actual && (actual?.description ?? '')
        )).toObject();
    }
}

export const TypeBuilder = new TypeBuilderClass()