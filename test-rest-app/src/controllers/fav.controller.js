const { pool } = require('../db/pool');

const getFav = async (req,res)=>{
    try
    {
        const response = await pool.query('SELECT * FROM "FavSong"');
        res.status(200).json(response.rows);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

const createFav = async (req,res)=>{
    try{
        console.log(`this is req in fav = ${JSON.stringify(req.body)}`);
        const {song_id, user_id} = req.body;
        if(song_id === undefined || user_id === undefined){
            res.status(400).json({message: `Invalid params. song_id = ${song_id}. user_id = ${user_id}`});
            return;
        }
        const response = await pool.query('INSERT INTO "FavSong" (song_id, user_id) VALUES($1, $2)',[song_id, user_id]);
        console.log(response);
        const FavSong = await pool.query('SELECT * FROM "FavSong" WHERE "song_id" = $1 and "user_id" = $2',[song_id, user_id]);
        res.status(200).json({
            message: 'Fav Added Successfully',
            body:{
                Song: FavSong.rows[0]
            }
        });
    } catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getFav,
    createFav,
}