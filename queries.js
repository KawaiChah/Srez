const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo_web',
    password: 'qwe',
    port: 5432,
});

const getTodos = (request, response) => {
    pool.query('select * from todo', (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    });
};

const getTodoById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('select * from todo where todo_id = $1', [id], (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    });
};

const postTodo = (request, response) => {
    const {todo, date, description} = request.body;
    console.log(request.body)
    pool.query('insert into todo(todo, todo_date, todo_description) values ($1, $2, $3) returning *',[todo,date,description], (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json({message: "added"});
    });
};

const putTodo = (request, response) => {
    const id = request.params.id
    const {todo, date, description} = request.body;
    pool.query('update todo set todo = $1, todo_date = $2, todo_description = $3 where todo_id = $4', [todo, date, description,id], (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json({message:"Updated"});
    });
};

const deleteTodo = (request, response) => {
    const id = request.params.id
    pool.query('delete from todo where todo_id = $1', [id], (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send('Deleted');
    });
};

module.exports = {
    getTodos,
    getTodoById,
    postTodo,
    putTodo,
    deleteTodo,
}