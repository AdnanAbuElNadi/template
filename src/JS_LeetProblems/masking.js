
 /* You are given a personal information string s, representing either an email address or a phone number. Return the masked personal information using the below rules.

 Email address:
 
 An email address is:
 
     A name consisting of uppercase and lowercase English letters, followed by
     The '@' symbol, followed by
     The domain consisting of uppercase and lowercase English letters with a dot '.' somewhere in the middle (not the first or last character).
 
 To mask an email:
 
     The uppercase letters in the name and domain must be converted to lowercase letters.
     The middle letters of the name (i.e., all but the first and last letters) must be replaced by 5 asterisks "*****".
 
 Phone number:
 
 A phone number is formatted as follows:
 
     The phone number contains 10-13 digits.
     The last 10 digits make up the local number.
     The remaining 0-3 digits, in the beginning, make up the country code.
     Separation characters from the set {'+', '-', '(', ')', ' '} separate the above digits in some way.
 
 To mask a phone number:
 
     Remove all separation characters.
     The masked phone number should have the form:
         "***-***-XXXX" if the country code has 0 digits.
         "+*-***-***-XXXX" if the country code has 1 digit.
         "+**-***-***-XXXX" if the country code has 2 digits.
         "+***-***-***-XXXX" if the country code has 3 digits.
     "XXXX" is the last 4 digits of the local number.
  */
 
 
 
 
 var maskPII = function(s) {
    if(s.includes("@")){
        console.log(s);
        var arr1 = s.split("@");
        var arr2 = arr1[0].toLowerCase().split("");
        
        var newS=arr2[0] + "*****" + arr2[arr2.length-1];
        var res = newS+"@"+arr1[1].toLowerCase();
            return res;
        }
    else{
        var res = "";
        console.log(s);
        s=s.replace("+","");
        s=s.replace("-","");
        s=s.replace("(","");
        s=s.replace(")","");
        s=s.replace(" ","");
        console.log(s);
        var arr1 = s.split("");
        var localnum = [];
        count = 0;
        var L = arr1.length-1;
        if(L>10){
            res=res+"+";
        }
        while(count<11){
            localnum.push(arr1[L])
            count++;
            L--;
        }
        console.log(localnum);
        console.log(res);
    }
};