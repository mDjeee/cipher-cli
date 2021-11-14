function cesar(sometext){
    var solved ="";
    for(var i =0; i<sometext.length; i++){
        var ascii = sometext[i].charCodeAt();
        if(ascii>=65 && ascii <= 90){
            if( ascii == 90){
                solved += String.fromCharCode(65);
            }
            else {
                solved += String.fromCharCode(ascii + 1);
            }
        }
        else if(ascii>=97 && ascii <= 122){
            if( ascii == 122){
                solved += String.fromCharCode(97);
            }
            else {
                solved += String.fromCharCode(ascii + 1);
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