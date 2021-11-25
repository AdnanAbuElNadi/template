try {

    alert('Start of try runs');  // (1) <--
  
    // ...no errors here
  
    alert('End of try runs');   // (2) <--
  
  } catch (err) {
  
    alert('Catch is ignored, because there are no errors'); // (3)
  
  }

/*try...catch only works for runtime errors

For try...catch to work, the code must be runnable. In other words, it should be valid JavaScript.
It won’t work if the code is syntactically wrong, for instance it has unmatched curly braces: */

/*try...catch works synchronously
If an exception happens in “scheduled” code, like in setTimeout, then try...catch won’t catch it: */

try {
    setTimeout(function() {
      noSuchVariable; // script will die here
    }, 1000);
  } catch (err) {
    alert( "won't work" );
  }
  /*That’s because the function itself is executed later, when the engine has already left the try...catch construct.
  To catch an exception inside a scheduled function, try...catch must be inside that function: */


  setTimeout(function() {
    try {
      noSuchVariable; // try...catch handles the error!
    } catch {
      alert( "error is caught here!" );
    }
  }, 1000);



/* Error object
When an error occurs, JavaScript generates an object containing the details about it. The object is then passed as an argument to catch:


name
    Error name. For instance, for an undefined variable that’s "ReferenceError".
message
    Textual message about error details.

There are other non-standard properties available in most environments. One of most widely used and supported is:
stack
    Current call stack: a string with information about the sequence of nested calls that led to the error. Used for debugging purposes. */


 /*    Throwing our own errors

    What if json is syntactically correct, but doesn’t have a required name property?
    
    Like this: */
    
    let json = '{ "age": 30 }'; // incomplete data
    
    try {
    
      let user = JSON.parse(json); // <-- no errors
      alert( user.name ); // no name!
    
    } catch (err) {
      alert( "doesn't execute" );
    }
    
 /*    Here JSON.parse runs normally, but the absence of name is actually an error for us.
    
    To unify error handling, we’ll use the throw operator.
    “Throw” operator
    
    The throw operator generates an error.
    
    The syntax is: */

    /* throw <error object> */

/* Technically, we can use anything as an error object. That may be even a primitive, like a number or a string, but it’s better to use objects, preferably with name and message properties (to stay somewhat compatible with built-in errors).
JavaScript has many built-in constructors for standard errors: Error, SyntaxError, ReferenceError, TypeError and others. We can use them to create error objects as well.
Their syntax is:
 */

let error = new Error(message);
// or
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...

/* For built-in errors (not for any objects, just for errors), the name property is exactly the name of the constructor. And message is taken from the argument.
For instance: */

let json = '{ "age": 30 }'; // incomplete data

try {

  let user = JSON.parse(json); // <-- no errors

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name"); // (*)
  }

  alert( user.name );

} catch (err) {
  alert( "JSON Error: " + err.message ); // JSON Error: Incomplete data: no name
}


/* In the line (*), the throw operator generates a SyntaxError with the given message, the same way as JavaScript would generate it itself. The execution of try immediately stops and the control flow jumps into catch.
Now catch became a single place for all error handling: both for JSON.parse and other cases. */


/* In our case, try...catch is placed to catch “incorrect data” errors. But by its nature, catch gets all errors from try. Here it gets an unexpected error, but still shows the same "JSON Error" message. That’s wrong and also makes the code more difficult to debug.

To avoid such problems, we can employ the “rethrowing” technique. The rule is simple:

Catch should only process errors that it knows and “rethrow” all others.

The “rethrowing” technique can be explained in more detail as:

    Catch gets all errors.
    In the catch (err) {...} block we analyze the error object err.
    If we don’t know how to handle it, we do throw err.

Usually, we can check the error type using the instanceof operator: */

try {
    user = { /*...*/ };
  } catch (err) {
    if (err instanceof ReferenceError) {
      alert('ReferenceError'); // "ReferenceError" for accessing an undefined variable
    }
  }


/*   We can also get the error class name from err.name property. All native errors have it. Another option is to read err.constructor.name.

In the code below, we use rethrowing so that catch only handles SyntaxError: */

let json = '{ "age": 30 }'; // incomplete data
try {

  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name");
  }

  blabla(); // unexpected error

  alert( user.name );

} catch (err) {

  if (err instanceof SyntaxError) {
    alert( "JSON Error: " + err.message );
  } else {
    throw err; // rethrow (*)
  }

}

/* The error throwing on line (*) from inside catch block “falls out” of try...catch and can be either caught by an outer try...catch construct (if it exists), or it kills the script.

So the catch block actually handles only errors that it knows how to deal with and “skips” all others.

The example below demonstrates how such errors can be caught by one more level of try...catch: */

function readData() {
    let json = '{ "age": 30 }';
  
    try {
      // ...
      blabla(); // error!
    } catch (err) {
      // ...
      if (!(err instanceof SyntaxError)) {
        throw err; // rethrow (don't know how to deal with it)
      }
    }
  }
  
  try {
    readData();
  } catch (err) {
    alert( "External catch got: " + err ); // caught it!
  }

  // Here readData only knows how to handle SyntaxError, while the outer try...catch knows how to handle everything.

/*   try…catch…finally

Wait, that’s not all.

The try...catch construct may have one more code clause: finally.

If it exists, it runs in all cases:

    after try, if there were no errors,
    after catch, if there were errors.

The extended syntax looks like this: */

/* try {
    ... try to execute the code ...
 } catch (err) {
    ... handle errors ...
 } finally {
    ... execute always ...
 } */

 try {
    alert( 'try' );
    if (confirm('Make an error?')) BAD_CODE();
  } catch (err) {
    alert( 'catch' );
  } finally {
    alert( 'finally' );
  }

/*   The code has two ways of execution:

    If you answer “Yes” to “Make an error?”, then try -> catch -> finally.
    If you say “No”, then try -> finally.

The finally clause is often used when we start doing something and want to finalize it in any case of outcome.

For instance, we want to measure the time that a Fibonacci numbers function fib(n) takes. Naturally, we can start measuring before it runs and finish afterwards. But what if there’s an error during the function call? In particular, the implementation of fib(n) in the code below returns an error for negative or non-integer numbers.

The finally clause is a great place to finish the measurements no matter what.

Here finally guarantees that the time will be measured correctly in both situations – in case of a successful execution of fib and in case of an error in it: */

let num = +prompt("Enter a positive integer number?", 35)

let diff, result;

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Must not be negative, and also an integer.");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
  result = fib(num);
} catch (err) {
  result = 0;
} finally {
  diff = Date.now() - start;
}

alert(result || "error occurred");

alert( `execution took ${diff}ms` );


// global catch



<script>
  window.onerror = function(message, url, line, col, error) {
    alert(`${message}\n At ${line}:${col} of ${url}`);
  };

  function readData() {
    badFunc(); // Whoops, something went wrong!
  };

  readData();
</scriptclass ValidationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Whoops!
  alert(err.name); // ValidationError
  alert(err.stack); // a list of nested calls with line numbers for each>


  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
  }
  
  // Usage
  function readUser(json) {
    let user = JSON.parse(json);
  
    if (!user.age) {
      throw new ValidationError("No field: age");
    }
    if (!user.name) {
      throw new ValidationError("No field: name");
    }
  
    return user;
  }
  
  // Working example with try..catch
  
  try {
    let user = readUser('{ "age": 25 }');
  } catch (err) {
    if (err instanceof ValidationError) {
      alert("Invalid data: " + err.message); // Invalid data: No field: name
    } else if (err instanceof SyntaxError) { // (*)
      alert("JSON Syntax Error: " + err.message);
    } else {
      throw err; // unknown error, rethrow it (**)
    }
  }



  

