const ValueUtil = {
    isNull: (param) => {
        if (!param || param == '') return true;
    
        return false;
    }
}

export default ValueUtil;