const value = function ticketGenarate(){
    let numberString = Date.now();
    numberString = numberString.toString();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    numberString = numberString.slice(0,10);
    let achar = characters.charAt(Math.floor(Math.random() * characters.length));
    let ticketCode = numberString + achar;
    return ticketCode;

}


module.exports = value;