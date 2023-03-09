

const getTimeStamp = () => {
    const date = new Date();
    const timestamp = date.toLocaleString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    });
    return timestamp;
}


export {
    getTimeStamp
}