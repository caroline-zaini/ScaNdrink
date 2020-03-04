export default function(basket = [], action) {

    if (action.type == 'addProduit') {

        var basketCopy = [...basket];

        basketCopy.push({name: action.produitName, price: action.produitPrice, quantity: action.produitQuantity+1});

        for (let i = 0; i < basketCopy.length; i++) {
            if (i != (basketCopy.length - 1) && basketCopy[i].name == action.produitName) {
                basketCopy[i].quantity++;
                basketCopy.pop();
                break;
            }
        }
        
        console.log('basketCopy :', basketCopy);

        return basketCopy;

    } else if (action.type == 'deleteProduit') {

        var basketCopy = [...basket];

        for (let j = 0; j < basketCopy.length; j++) {
            if (basketCopy[j].name == action.produitName) {
                basketCopy[j].quantity--;
                if (basketCopy[j].quantity == 0)
                    basketCopy.splice(j, 1);
                break;
            }
        }

        console.log('basketCopy :', basketCopy);

        return basketCopy;
        
    } else {
        
        return basket;
    }
}