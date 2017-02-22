Rust Book
## Syntax and Semantics
### Variable Bindings
Variable bindings “bind” some value to a name so it can be used later.  `let` is used to introduce a binding. 
EXAMPLE
```
fn main() {
    let x = 5;
}
```
##### Patterns
The left-hand side of a `let` statement is a ‘pattern’, not a variable name. Meaning we can do:
```
let(x,y) = (1,2);
```

##### Type Annotations
* Statically typed language
  * Types are check at compile time
  * Rust uses ‘type inference’ 
    * If it can figure out what the type of something is, then you don’t need to explicitly state it.
    You can type the ‘type’ if you want to, for example:
    ```
    let x: i32 = 5;
    ```
    Rust include several different primitive integer types:
    * Signed: i8, i16, i32, i64
    * Unsigned: u8, u16, u32, u64

##### Mutability
    Bindings are immutable by default
    To be able to mutate a binding then you can use `mut`: 
    ```
    let mut x = 5;
    x = 10;
    ```

