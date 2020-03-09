export default function(total = 0, action) {

    if(action.type == 'takeTotal') {
        return action.total;
    } else {
        return total;
    }
}