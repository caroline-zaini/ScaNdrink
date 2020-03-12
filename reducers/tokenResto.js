export default function(token = '', action){
    if(action.type == 'addTokenResto'){
        console.log('action.tokenResto :', action.tokenResto);
        return action.tokenResto
    } else {
        return token
    }
}