function cesar(sometext){
    var solved ="";
    for(var i =0; i<sometext.length; i++){
        var ascii = sometext[i].charCodeAt();
        if(ascii>=65 && ascii <= 90){
            if( 90 - ascii <= 7){
                solved += String.fromCharCode(65+(7-90+ascii));
            }
            else {
                solved += String.fromCharCode(ascii + 8);
            }
        }
        else if(ascii>=97 && ascii <= 122){
            if( 122 - ascii <= 7){
                solved += String.fromCharCode(97+(7-122+ascii));
            }
            else {
                solved += String.fromCharCode(ascii + 8);
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