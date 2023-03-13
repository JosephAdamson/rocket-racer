

const getTimeStamp = () => {
    const date = new Date();
    const timestamp = date.toLocaleString("en-GB", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        day: "numeric",
        month: "numeric",
        year: "numeric"
    });
    return timestamp;
}


enum DataType {
    CONNECTION,
    DISCONNECT,
    MESSAGE
}


export {
    getTimeStamp,
    DataType
}