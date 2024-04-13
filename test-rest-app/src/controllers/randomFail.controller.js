const { getRandomBoolean } = require('../util/utils');
const { v4: uuidv4 } = require('uuid');

const getRandomFail = async (req,res)=>{
    const uid =  await uuidv4();
    try
    {
        const random = getRandomBoolean();
        if(random){
            throw new Error('Random error thrown');
        }
        const response = {message: 'all good!'}
        console.log(JSON.stringify(response));
        res
            .status(200)
            .set('correlation-id', uid)
            .json(response);
        return
    }
    catch(err){
        const response = {message: err.message}
        console.log(JSON.stringify(response));
        res
            .status(500)
            .set('correlation-id', uid)
            .json(response);
        return
    }
};

const createRandomFail = async (req,res)=>{
    const uid =  await uuidv4();
    try{
        const random = getRandomBoolean();
        if(random){
            throw new Error('Random error thrown');
        }
        const response = {message: 'all good!'}
        console.log(JSON.stringify(response));
        res
            .status(200)
            .set('correlation-id', uid)
            .json(response);
        return
    } catch(err){
        const response = {message: err.message}
        console.log(JSON.stringify(response));
        res
            .status(500)
            .set('correlation-id', uid)
            .json(response);
        return
    }
};

module.exports = {
    getRandomFail,
    createRandomFail,
}