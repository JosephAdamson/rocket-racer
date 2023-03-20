import { cleanEnv, str, port } from 'envalid';


const concatClasses = (...classes: string[]) => {
    return classes.join(" ");
}


const env = cleanEnv(process.env, {
    REACT_APP_BASE_URL: str(),
    REACT_APP_WSS_ADDR: str()
})


export {
    concatClasses,
    env
}
