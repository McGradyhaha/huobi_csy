import {post} from '../../post.js'

export function postLogin(list){
    const result = post('/auth/login', list)
    return result
}