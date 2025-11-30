class Common 
{
    static arrayDelete(array, match) 
    {
        const idx = array.findIndex(match);
        if (idx == -1)
            throw new Error("Item not found");
        return array.splice(idx, 1)[0];
    }

    static arrayGet(array, match) 
    {
        const item = array.find(match);
        if (!item)
            throw new Error("Item not found");
        return item;
    }
}

export default Common;
