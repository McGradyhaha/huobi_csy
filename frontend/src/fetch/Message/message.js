import {post} from "../post.js"

export function postMessage(list){
    const result = post('/send_message', list)
    return result
}

