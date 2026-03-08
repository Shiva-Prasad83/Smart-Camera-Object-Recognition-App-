/*
Given a string s, return the length of the longest substring without repeating characters.
 
Example
 
Input: "abcabcbb"
Output: 3
Explanation: longest substring = "abc"
*/

let str="abcabcbb";

function hasUniqueCharacters(str){
  let temp="";
  for(let i=0;i<str.length;i++){
    if(temp.includes(str[i])){
        return false;
    }
    temp+=str[i];
  }
  return true;
}
function uniqueLongestSubString(str){
   
    let result="";
    for(let i=0;i<str.length;i++){
        for(let j=i+1;j<str.length+1;j++){
            let currSubString=str.substring(i,j);
            if(currSubString.length>result.length&&hasUniqueCharacters(currSubString)){
                result=currSubString;
            }
        }
    }
    return result;
}

console.log(uniqueLongestSubString(str));