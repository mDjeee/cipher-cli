function cesar(sometext){
    var solved ="";
    for(var i =0; i<sometext.length; i++){
        var ascii = sometext[i].charCodeAt();
        if(ascii>=65 && ascii <= 90){
            if( ascii - 65 <= 7){
                solved += String.fromCharCode(ascii+26-8);
            }
            else {
                solved += String.fromCharCode(ascii - 8);
            }
        }
        else if(ascii>=97 && ascii <= 122){
            if( ascii - 97 <= 7){
                solved += String.fromCharCode(ascii+26-8);
            }
            else {
                solved += String.fromCharCode(ascii - 8);
            }
        }
        else {
            solved+=sometext[i];
        }

    }
    return solved;
}
module.exports = {
    cesar
}