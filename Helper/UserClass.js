class Users{
    constructor() {
        this.user = [];
    }
   
   
    removeUser=(id)=>{
        const newList = this.user.filter(user=> {
          return user.id !==id;
        })
        this.user = newList;
    }

    addUser =(userName , id)=>{
        let users = {id : id ,user : userName}
        this.user.push(users);
        return this.user;
    }
    
    getUser=()=>{
         return this.user;
    }
}

module.exports = Users;