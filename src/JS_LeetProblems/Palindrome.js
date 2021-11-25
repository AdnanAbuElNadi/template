/* 
var x ;
y = String(x);

var spl = y.split("");
var rev = spl.reverse();
var res = rev.join("");

if(res == String(x)){
    return 1;
}
else{
    return 0;
}

*/
import React ,{useState} from "react";

const Palindrome = () =>{

    const [input, setInput] = useState("");
    var res = "";
    function handleChange(event){
        setInput(event.target.value);
        res = "";
    }
    function getRes(){
        var y = String(input);
        var spl = y.split("");
        var rev = spl.reverse();
        var res = rev.join("");
        console.log(y);
        console.log(res);
        if(res == y){
            res = (input + " is a palindrome")
        }
        else{
            res = (input + " is not a palindrome")
        }
    }


return(
<div>
    <input type='text' onChange={handleChange}/>
    <br/>
    <button onClick={getRes}>Check</button>
    <br/>
    <p id='output'>{res}</p>
</div>
);
}
export default Palindrome;