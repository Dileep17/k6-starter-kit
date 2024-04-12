const { pool } = require('../db/pool');
const { getRandomBoolean } = require('../util/utils');

const getFav = async (req,res)=>{
    try{
        const response = await pool.query('SELECT * FROM "FavSong"');
        console.log(JSON.stringify(response.rows));
        res.status(200).json(response.rows);
        return
    } catch(err) {
        const response = {
            message: 'Failed to fetch fav',
            error: err.message
        };
        console.log(JSON.stringify(response));
        res.status(500).json(response);
        return
    }
};

const createFav = async (req,res)=>{
    try{
        const {song_id, user_id} = req.body;
        if(song_id === undefined || user_id === undefined){
            const response = {message: `Invalid params. song_id = ${song_id}. user_id = ${user_id}`};
            console.log(JSON.stringify(response))
            res.status(400).json(response);
            return;
        }
        const favSong = await pool.query('INSERT INTO "FavSong" (song_id, user_id) VALUES($1, $2) RETURNING *',[song_id, user_id]);
        let response = {
            message: 'FavSong Added Successfully',
            body: favSong.rows[0]
        };

        // BUG
        const random = getRandomBoolean();
        if(random){
            response = {};
        }
        // END OF BUG
        
        console.log(JSON.stringify(response));
        res.status(200).json(response);
        return
    } catch(err) {
        const response = {
            message: 'Failed to add FavSong',
            error: err.message
        };
        console.log(JSON.stringify(response));
        res.status(500).json(response);
        return
    }
};

module.exports = {
    getFav,
    createFav,
}