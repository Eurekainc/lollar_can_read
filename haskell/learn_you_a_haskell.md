# Learn You a Haskell
## Chapter 1 - Introduction
### So what’s Haskell?
A purely functional programming language, in which, a function has no side-effects. It is statically typed by using type inference meaning that the use does not have to explicitly state the type.

*Referential transparency*:  if a function is called twice with the same parameters it’s guaranteed to return the same result.

Haskell is lazy and won’t execute functions and calculate things until forced to do so.

##### Questions
* Does the recursion call do one number at a time on the return? See example for more details.

## Chapter 2 - Starting Out
### Ready, Set, Go!
Most other maths are the same. As well as Boolean algebra except that instead of `true` and `false` you would use `True` and `False`.  Also the not operator is explicitly typed out as `not`

Functions in Haskell are called without parens or commas.  For example: `min 9 10` would return 9.  Using parens defines precedence.  

If a function takes two parameters then you can use infix function calls.  Example:  92 `div` 10

### Baby’s First Function
Haskell’s `if` syntax requires that `else` be present. If statements in Haskell are expressions.  Expressions are basically pieces of code that return a value.

The apostrophe doesn’t have any special meaning in Haskell syntax.  It is typically used  to denote a strict version of a function or a slightly modified version of a function or a variable.  A strict function is one that isn’t lazy.

Functions can’t begin with uppercase letters.

A function that doesn’t take any parameters is known as a definition (or name)

### An intro to lists
Lists are a homogenous data structure, meaning it stores items of the same type. (Think C++ arrays)

```
NOTE: using let in GHCI allows us to define a name the same as var = value would in a script.
```

Strings are also lists of individual chars.  (Similar to a char array in C)

Combining two lists is done by using the `++` operator.  
EXAMPLE:
```
[1,2] ++ [3,4]
—- since strings are just char lists, you can append strings the same way.
“hello” ++ “ “ ++ “world”
```

Use caution when using the `++` operator too often. Haskell walks through the whole list on the left side before appending the additional values to the list.

Prepending to a list is done using the `:` and is instantaneous so therefore doesn’t have the same ramifications that `++` has.

Using the `++` at the end of the list requires that you wrap the item being added in `[ ]` even if you are just adding a single list.

EXAMPLE:
```
‘A’:“ SMALL CAT"
-> A SMALL CAT
5:[1,2,3,4,5]
-> [5,1,2,3,4,5]
```

[1,2,3] underneath is actually prepending to an empty list `1:2:3:[]`

Like arrays, lists have indices that start at 0.  To get the value at a given index then you use the `!!` operator.

```
let myList = [2,3,4]
myList !! 1
-> 3
```

You can also have a list of lists of lists of lists of…

Lists within a list can be different lengths but not types.

Lists can be compared using `<, <=, >, >=` and will be compared in lexicographical order.

```
— BASIC LIST FUNCTIONS
head [3,2,1]
-> 3
tail [3,2,1]
-> [2,1]
last [3,2,1]
-> 1
init [3,2,1]
-> [3,2]
-- OTHERS:
-- length
-- null, returns a bool value based on empty list
-- reverse
take 2 [3,2,1,0]
-> [3,2]
-- take 0 returns a list, take x (where x > length)
-- returns full list
-- drop, works opposite way of `take`
-- maximum, returns largest value in a list
-- minimum, returns smallest value in a list
-- sum, takes a list of ints and returns sum
-- product, takes a list of ints and returns product
-- elem, takes a value and checks if the value is in -- the list returning a bool.  Typically written infix

```

Trying to use list methods on an empty list will result in an exception.  Caution must be used when using these methods to verify they will not be called on an empty list.

### Texas Ranges
Ranges are a way of making lists that are arithmetic sequences of elements that can be enumerated (numbers, characters, etc.).

EXAMPLE:
```
[1..10]
-> [1,2,3,4,5,6,7,8,9,10]
['a'..'f']
-> "abcdef"
```

You are able to specify a step (or pattern) using ranges

EXAMPLE:
```
[2,4..20]
-> [2,4,6,8,10,12,14,16,18,20]
[3,6..20]
-> [3,6,9,12,15,18]
```

To make a list of numbers from 20 to 1 you have to do `[20,19..1]` not just `[20..1]`

Don’t use floating point numbers in ranges. They suck.

More list functions:
```
-- cycle: takes a list and cycles it into an infinite list
-- repeat: takes an element and produces an infinite list of just that element.
-- replicate: puts x number of y in a list. Called by replicate x y
```

### I’m a list comprehension
A list comprehension is very similar to a set comprehension.

STEP-BY-STEP EXAMPLE:
```
[x*2 | x <- [1..10]]
-> [2,4,6,8,10,12,14,16,18,20]

-- x is drawn from 1..10
-- every element in 1..10 (which is bound to x) we get -- that element returned, only doubled.
-- NEXT WE CAN ADD A CONDITION (PREDICATE)

[x*2 | x <- [1..10], x*2 >= 12]
-> [12,14,16,18,20]

-- NEXT WE WANT ALL NUMBERS 50-100 THAT HAVE A
-- REMAINDER 3 WHEN DIVIDED BY 7

[ x | x <- [50..100], x `mod` 7 == 3]
-> [52,59,66,73,80,87,94]
```

Weeding out lists by predicates is also known as filtering. You can have multiple predicates in a list comprehension.

You can also draw from several lists in a list comprehension. A list comprehension that draws from two lists will always have a count of `length a * length b`

EXAMPLE
```
[ x*y | x <- [2,5,10], y <- [8,10,11]]
-> [16,20,22,40,50,55,80,100,110]
```

Writing our own length function:
```
length' xs = sum [1 | _ <- xs]
-- like many programming languages, _ is a placeholder -- for a variable that won't be used.
```

### Tuples

Unlike lists, tuples are used when you know exactly the number of values you want to combine and its type depends on how many components it has and the type of those components.  They don’t have to be homogeneous, the can contain a combination of several different types.

Use tuples when you know in advance how many components some piece of data should have. Because each tuple that is a different size is a type of it’s own you can’t just write a general function to append to a tuple, you would need specific instances each function for a tuple of n size.

No such thing as a singleton tuple.

```
-- fst takes a pair and returns it's first component
ghci> fst (8, 11)
8
ghci> fst ("blah", True)
"blah"

-- snd takes a pair and returns its second component
ghci> snd (8,11)
11
ghci> snd ("Blah", True)
True

-- above functions only work on PAIRS

-- zip takes two lists and matches them into pairs, if -- lengths don't match then the longer list is cutoff
ghci> zip [1,2,3] [3,3,3]
[(1,3),(2,3),(3,3)]

-- since haskell is lazy, we can zip finite lists with  -- infinite
```

##### Questions
* Infix function calls, just a general feeling on them.
* WTF does /= do? <- it’s a not equal operator (`!=`)
* `:1 program_name` compile for anyone?
* The use of the verbiage ‘lists’ instead of array. Why do it?
* Did I miss the part on set comprehensions?

## Chapter 3 - Types and Typeclasses
### Believe the Type
The type of every expression is know at compile time. Unlike other statically typed languages Haskell can infer the type value.

`:t value` will display the type Haskell infers
`::` is read “has type of”.  i.e. `True :: Bool`

When  writing functions we can choose to give them an explicit type declaration.  It’s generally considered a best practice.

EXAMPLE:
```
removeNonUppercase :: [Char] -> [Char]
removeNonUppercase st = [ c | c <- st, c `elem` ['A'..'Z']]
```

Functions with multiple parameters are separated by using the `->` operator.  For example:
```
addThree :: Int -> Int -> Int -> Int
addThree x y z = x + y + z
```

Common Data Types:
* Int
* Integer
* Float
* Double
* Bool
* Char
* [Char] (string)

Tuples are types but they are dependent on their length as well as the types of their components.

### Type variables
When a variable is not in capital case it’s actually a type variable.  Example: `head :: [a] -> a` ‘a’ can be of any type.  Functions that have type variables are called *polymorphic functions*

### Typeclasses 101
A typeclass is a sort of interface that defines some behavior.  What is the type of `==` function? …
```
:t (==)
(==) :: (Eq a) => a -> a -> Bool
```

`=>` Defines a class constraint which is everything before the symbol.  

Basic Type Classes:
* *Eq* is used for types that support equality testing.  
* *Ord* is for types that have an ordering
* *Show* presents types as strings
* *Read* takes a string and returns a type which is a member of read
* *Enum* are sequentially ordered types that can be enumerated.
* *Bounded* members have an upper and lower bound
* *Num* is a numeric typeclass.
* *Integral* Also a numeric typical includes only whole numbers.
* *Floating* includes only floating point numbers so `Float` and `Double`

## Syntax in Functions
### Pattern Matching

Pattern matching consists of specifying patterns to which some data should conform and checking to see if it does and then deconstructing that data according to the defined patterns.

EXAMPLE:

```
factorial :: (Integral a) => a -> a
factorial 0 = 1
factorial n = n * factorial (n-1)
```

This function makes a recursive call and then when it equals 0 it returns 1

Order is important when defining patterns and it is always best to specify most specific ones first and then more general ones later.

When defining patterns we should always write a catch all so that our program doesn’t crash with unexpected input.

Pattern matching can also be done in list comprehension

EXAMPLE:
```
let xs = [(1,3),(4,3),(2,4),(5,3),(5,6),(3,1)]
[ a+b | (a,b) <- xs]
[4,7,6,8,11,4]
```
#TODO: Find out about syntax in the above example

Should the above pattern match fail it will just move to the next element.

Lists themselves can also be used in the pattern match, like matching the empty list [].

See `patterns.hs` for more examples.

Haskell has something called “as patterns” which break up something according to a pattern, bind it to a different name, and still keep reference to the whole thing. It is denoted by putting an `@` in front of a pattern.

EXAMPLE:
```
capital :: String -> String
capital "" = "Empty string!"
capital all@(x:xs) = "The first letter of " ++ all ++ " is " ++ [x]
```

You can’t us `++` in pattern matches.  

### Guards, guards!
Guards are more readable than if statements and play nicely with patterns.

EXAMPLE:
```
bmiTell :: (RealFloat a) => a -> String
bmiTell bmi
	| bmi <= 18.5 = "..."
	| bmi <= 35 = "..."
	| otherwise = "..."
```

Guards are indicated by pipes that follow a functions’s name and it’s parameters.  A guard is basically a boolean expression.  If true then corresponding body is used.

If all guards eval to `False` and an `otherwise` isn’t defined then evaluation falls through to the next pattern. If not pattern is defined an error is thrown.

### Where!?

Using a where clause can help reduce some of the receptiveness in guards

EXAMPLE:
```
bmiTell :: (RealFloat a) => a -> a -> String
bmiTell weight height
	| bmi <= 18.5 = "..."
	| bmi <= 25.0 = "..."
	| bmi <= 30.0 = "..."
	| otherwise  	 = "..."
	where bmi = weight / height ^ 2
```

The names we define in the where section of a function are only visible to the function so they will not pollute namespace.

All names in a `where` clause have to be defined at the same indentation otherwise it won’t work.

You can also use `where` to pattern match.
EXAMPLE:
```
...
where bmi = weight / height ^ 2
		 (skinny, normal, fat) = (18.5, 25.0, 30.0)
```

You can also define functions in where blocks:
EXAMPLE:
```
calcBMIs :: (RealFloat a) => [(a,a)] -> [a]
calcBMIs xs = [bmi w h | (w,h) <- xs]
	where bmi weight height = weight / height ^ 2
```

`where` bindings can also be nested.

### Let it be
Allow you to bind variables anywhere and are expressions themselves, but are very local, so they don’t span across guards.  

EXAMPLE:
```
cylinder :: (RealFloat a) => a -> a -> a
cylinder r h =
	let sideArea = 2 * pi * r * h
		 topArea = pi * r  ^2
	in sideArea + 2 * topArea
```

The form is `let <bindings> in <expression>`
`let` bindings are expressing themselves whereas `where` bindings are just syntactic constructs.  

They can be used to introduce functions in a local scope:
`[let square x = x * x in (square 5, square 3, square 2)]`

Let bindings are very useful for quickly binding tuple parts in to names:
`(let (a,b,c) = (1,2,3) in a+b+c) * 100`

## Recursion
### Hello Recursion!
An element or two in a recursion definition that is not defined recursively is known as an edge condition. These are important if you want your recursive function to terminate.

### Maximum Awesome
