export default function(token = '', action) {
    if (action.type == 'addTokenTable') {
        return action.tokenTable;
    } else {
        return token;
    }
}