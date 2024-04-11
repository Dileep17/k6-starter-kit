const { pool } = require('../db/pool');

const getSong = async (req,res)=>{
    try
    {
        const response = await pool.query('SELECT * FROM "song"');
        res.status(200).json(response.rows);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

const createSong = async (req,res)=>{
    try {
        console.log(`this is req in fav = ${JSON.stringify(req.body)}`);
        const {name, duration} = req.body;
        if(name === undefined || duration === undefined){
            res.status(400).json({message: 'Invalid params'});

        }
        const response = await pool.query('INSERT INTO "song" (name, duration) VALUES($1, $2)',[name, duration]);
        // console.log(response);
        const song = await pool.query('SELECT * FROM "song" WHERE "name" = $1',[name]);
        res.status(200).json({
            message: 'Song Added Successfully',
            body: song.rows[0]
        });
    } catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getSong,
    createSong,
}