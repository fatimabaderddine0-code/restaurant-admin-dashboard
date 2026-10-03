import { useState } from "react";
import users from "../data/usersData";
function Users()
{
    const[searchTerm,setSearchTerm]=useState("");
    const[currentPage,setCurrentPage]=useState(1);
    const usersPerPage = 2;
    const filteredUsers = users.filter((user)=>
    user.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
   //y3ne e5er index bdna nusalo 
   const indexOfLastUser = currentPage * usersPerPage;
   //y3ne mn aya undex mnblsh
   const indexOfFirstUser = indexOfLastUser - usersPerPage;
   const currentUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
   );
   return(
    <div className="container-fluid">
        <h2 className="page-title">Users List</h2>
        <input 
          type="text"
          className="form-control my-3"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(event)=> setSearchTerm(event.target.value)}
          />
          <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>      
                </tr>
            </thead>
            <tbody>
                {currentUsers.map((user)=>(
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                        <button className="btn btn-warning btn-sm me-2">
                               Edit
                        </button>

                        <button className="btn btn-danger btn-sm">
                               Delete
                        </button>
                        </td>
                    </tr>
                )
                )}
            </tbody>
          </table>
          </div>
          <div className="d-flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                   key={index}
                   className="btn pagination-btn btn-sm"
                   onClick={()=> setCurrentPage(index + 1)}
                >
                    {index + 1}
                </button>))}
          </div>
    </div>
   );

}
export default Users;