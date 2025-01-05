module.exports = (query) => {
    let objectSearch = {
        keyword:"",
        regex : ""
    }
    if(query.keyword){
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword,"i"); // regex find keyword
        objectSearch.regex = regex;
    }
    return objectSearch;
}