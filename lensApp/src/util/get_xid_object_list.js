async function getXidObjectList (items) {
    const list = []
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        for(let j = 0; j < item.product.models.length; j++) {
            const model = item.product.models[j].model
            console.log(model)
            for(let k = 0; k < model.objects.length; k++) {
                const object = model.objects[k]
                console.log(object)
                for(let l = 0; l < object.options.length; l++) {
                    const option = object.options[l]
                    console.log(option)
                    for(let m = 0; m < option.xids.length; m++) {
                        const xid = option.xids[m]
                        const listItem = {
                            item_id: item.item_id,
                            product_id: item.product.product_id,
                            model_id: model.model_id,
                            object_id: object.object_id,
                            option_id: option.option_id,
                            xid: xid
                        }
                        list.push(listItem)
                    }
                }
            }
        }
    }
    return list
    
}

export default getXidObjectList