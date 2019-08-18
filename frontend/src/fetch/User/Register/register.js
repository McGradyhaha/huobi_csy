import {post} from '../../post.js'

export function postRegister(list){
    const result = post('/auth/signup', list)
    return result
}

