export default function(token = '', action) {
    if (action.type == 'addTokenTable') {
        console.log('action.tokenTable :', action.tokenTable);
        return action.tokenTable;
    } else {
        return token;
    }
}