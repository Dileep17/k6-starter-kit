function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
  
function generateJsonWithRandomNames(count) {
    const jsonData = { "user": [] };
    for (let i = 0; i < count; i++) {
        jsonData.user.push({ "name": generateRandomString(Math.floor(Math.random() * 10) + 5) });
    }
    return JSON.stringify(jsonData, null, 2);
}
  
console.log(generateJsonWithRandomNames(20000)); 