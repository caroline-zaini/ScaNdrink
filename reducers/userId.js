export default function(idUser = '', action){
    if(action.type == 'addUserId'){
        return action.idUser
    } else {
        return idUser
    }
}