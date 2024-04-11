
function getRandomBoolean() {
    return Math.random() < 0.5;
}

const getRandomFail = async (req,res)=>{
    try
    {
        const random = getRandomBoolean();
        if(random){
            throw new Error('Random error thrown');
        }
        res.status(200).json({message: 'all good!'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

const createRandomFail = async (req,res)=>{
    try{
        const random = getRandomBoolean();
        if(random){
            throw new Error('Random error thrown');
        }
        res.status(200).json({message: 'all good!'});
    } catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getRandomFail,
    createRandomFail,
}