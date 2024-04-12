const { getRandomBoolean } = require('../util/utils');
// function getRandomBoolean() {
//     return Math.random() < 0.5;
// }

const getRandomFail = async (req,res)=>{
    try
    {
        const random = getRandomBoolean();
        if(random){
            throw new Error('Random error thrown');
        }
        const response = {message: 'all good!'}
        console.log(JSON.stringify(response));
        res.status(200).json(response);
        return
    }
    catch(err){
        const response = {message: err.message}
        console.log(JSON.stringify(response));
        res.status(500).json(response);
        return
    }
};

const createRandomFail = async (req,res)=>{
    try{
        const random = getRandomBoolean();
        if(random){
            throw new Error('Random error thrown');
        }
        const response = {message: 'all good!'}
        console.log(JSON.stringify(response));
        res.status(200).json(response);
        return
    } catch(err){
        const response = {message: err.message}
        console.log(JSON.stringify(response));
        res.status(500).json(response);
        return
    }
};

module.exports = {
    getRandomFail,
    createRandomFail,
}