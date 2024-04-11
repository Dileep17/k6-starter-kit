function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  function generateJsonWithRandomSongs(count) {
    const jsonData = { "song": [] };
    for (let i = 0; i < count; i++) {
      jsonData.song.push({
        "name": generateRandomString(Math.floor(Math.random() * 10) + 5),
        "duration": Math.floor(Math.random() * 5000) // Duration between 0 and 5000 milliseconds
      });
    }
    return JSON.stringify(jsonData, null, 2);
  }
  
  console.log(generateJsonWithRandomSongs(20000));
  