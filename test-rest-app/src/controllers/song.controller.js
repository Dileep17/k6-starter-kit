const { pool } = require('../db/pool');

const getSong = async (req,res)=>{
    try
    {
        const response = await pool.query('SELECT * FROM "song"');
        console.log(JSON.stringify(response.rows));
        res.status(200).json(response.rows);
        return
    }
    catch(err){
        const response = {
            message: 'Failed to fetch Song',
            error: err.message
        };
        console.log(JSON.stringify(response));
        res.status(500).json(response);
        return
    }
};

const createSong = async (req,res)=>{
    try {
        const {name, duration} = req.body;
        if(name === undefined || duration === undefined || Number.isNaN(Number(duration))){
            const response = {
                message: 'Failed to add Song',
                error: 'invalid request body'
            };
            console.log(JSON.stringify(response));
            res.status(400).json(response);
            return
        } 

        const durationNumber = Number(duration);
        if( durationNumber < 100){
            const response = {
                message: 'Failed to add Song',
                error: 'Duration is less than 100'
            };
            console.log(JSON.stringify(response));
            res.status(400).json(response);
            return
        }
        const song = await pool.query('INSERT INTO "song" (name, duration) VALUES($1, $2) RETURNING *',[name, duration]);
        const response = {
            message: 'Song Added Successfully',
            body: song.rows[0]
        };
        console.log(JSON.stringify(response));
        res.status(200).json(response);
        return
    } catch(err){
        const response = {
            message: 'Failed to add Song',
            error: err.message
        };
        console.log(JSON.stringify(response));
        res.status(500).json(response);
        return
    }
};

module.exports = {
    getSong,
    createSong,
}