import react from "react";
import { useState, useEffect } from "react/cjs/react.development";
import "../Table/users.css";



const UserTable = () => {
const [data , setData] = useState([]);
const [data2, setData2]= useState([]);

    async function getData (){
        let url = "https://jsonplaceholder.typicode.com/users";
        const response = await fetch(url);
        let url2 = "https://jsonplaceholder.typicode.com/posts";
        const response2 = await fetch(url2);

        const users = await response.json();
        const posts = await response2.json();
        setData(users);
        setData2(posts);
    }
    useEffect(() => {
        getData();
      }, []);

    return(
    <div>
        <table id = "userstable">
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>E-mail</th>
                <th>Posts</th>
            </tr>
        {data.map((item, i) => (
        <tr key={i} >
        <td id = "row">{item.name}</td>
        <td id = "row">{item.username}</td>
        <td id = "row">{item.email}</td>
        <table id = "userstable">
            <tr>
                <th>
                    Title
                </th>
                <th>
                    Body
                </th>
            </tr>
            
                {data2.filter(function(obj){
                return obj.userId == item.id}).map((post)=>(
                      <tr>
                        <td id = "row"> 
                            {post.title}
                        </td>
                        <td id = "row">
                            {post.body}
                        </td>
                    </tr>
                ))}
            
        </table>
        </tr>   
        ))}
        </table>
    </div>
)
}
export default UserTable;