const { pool } = require('../db/pool');

const getUsers = async (req,res)=>{
    try
    {
        const response = await pool.query('SELECT * FROM "user"');
        res.status(200).json(response.rows);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

const createUser = async (req,res)=>{
    try{
        console.log(`this is req in fav = ${JSON.stringify(req.body)}`);
        const {name} = req.body;
        if(name === undefined){
            res.status(400).json({message: 'Invalid params'});
        }
        const response = await pool.query('INSERT INTO "user" (name) VALUES($1)',[name]);
        // console.log(response);
        const user = await pool.query('SELECT * FROM "user" WHERE "name" = $1',[name]);
        res.status(200).json({
            message: 'User Added Successfully',
            body:user.rows[0]
        });
    } catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }

};

// const getUserById = async(req,res) => {
//     const id = req.params.id;
//     const response = await pool.query('SELECT * FROM users WHERE id = $1',[id]);
//     res.json(response.rows);
// };

// const deleteUser = async(req,res) =>{
//     const id = req.params.id;
//     const response = await pool.query('DELETE FROM users WHERE id = $1',[id]);
//     console.log(response);
//     res.json(`User ${id} deleted successfully`);
// };

// const updateUser = async(req,res) => {
//     const id = req.params.id;
//     const {name, email} = req.body;
//     const response = await pool.query('UPDATE users SET name = $1, email=$2 WHERE id = $3',[name, email,id]);
//     console.log(response);
//     res.json('User updated successfully');
// };

module.exports = {
    getUsers,
    createUser,
}