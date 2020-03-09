export default function(userId = '', action){
    if(action.type == 'addUserId'){
        return action.userId
    } else {
        return userId
    }
}