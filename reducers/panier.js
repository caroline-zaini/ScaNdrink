export default function(basket = [], action) {

    if (action.type == 'addProduit') {

        var basketCopy = [...basket];

        basketCopy.push(action.produit);
        console.log('basketCopy :', basketCopy);

        return basketCopy;

    } else if (action.type == 'deleteProduit') {

        var basketCopy = [...basket];

        for (let i = 0; i < basketCopy.length; i++) {

            if (basketCopy[i] == action.produit) {
                basketCopy.splice(i, 1)
                break;
            }
        }

        console.log('basketCopy :', basketCopy);

        return basketCopy;
        
    } else {
        return basket;
    }
}