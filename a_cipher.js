function cesar(sometext){
    var solved ="";
    for(var i =0; i<sometext.length; i++){
        var ascii = sometext[i].charCodeAt();
        if(ascii>=65 && ascii <= 90){
            if( ascii - 65 <= 12){
                solved += String.fromCharCode(90 - (ascii - 65));
            }
            else {
                solved += String.fromCharCode(65 + (90 - ascii));
            }
        }
        else if(ascii>=97 && ascii <= 122){
            if( ascii - 97 <= 12){
                solved += String.fromCharCode(122 - (ascii - 97));
            }
            else {
                solved += String.fromCharCode(97 + ( 122 - ascii));
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