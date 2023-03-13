

export default function concatClasses(...classes: string[]){
    return classes.join(" ");
}

enum DataType {
    CONNECTION,
    DISCONNECT,
    MESSAGE
}


export {
    DataType
};