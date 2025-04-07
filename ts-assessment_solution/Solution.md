## Code Structure and Design Decisions

To improve the maintainability and readability of the codebase, 
```js
//I refactored the original flat structure into logically organized modules
```

## Benefits of This Structure

- **Extensibility**: Adding new functions is easy — just implement and export.
- **Testability**: Each module is small and testable in isolation.
- **Clarity**: Separating concerns makes the code easier to understand and review.
- **Production-readiness**: Mirrors how real-world projects are modularized.

## Structure UML
![UML Repo](doc\package_structures.PNG)

---

### `/evaluator`
The `Evaluator` class was kept as a single responsibility component that:
- Accepts an AST node
- Recursively evaluates it
- Dynamically calls the appropriate function
It is unaware of what functions exist — which makes it highly extensible.

```js
//Evaluator now extends functions by calling functionMap (earlier static calls were a hassle to maintain)
//Did not change literal logic since fetchget and contains were updates to fcuntions and adding functionMap made more sense
```
---
### `/functions/functions.ts`
Holds the core expression functions like `add`, `equals`, and `not`. These are pure functions, isolated from evaluation logic, which makes them easy to test independently.
```js
//equal --> was not comparing the value and type checking, updated that
//not --> condition is simpliedf to avoid syntax clutter
//add --> was not adding all paramters, improved it(adding sureity that sum is always a number)
```

### `/functions/extendedFunctions.ts` (Addd for new fetchget and contains)
Introduced new capabilities (`contains`, `fetchGet`) as per assignment. Splitting these into a separate file makes it easy to scale up or plug in more expression functions later — for example, without bloating the core `functions.ts`.

```js
//I took the liberty to expect fetchget is an asynchronous call? Else could be Busy-Wait Scenarion? My experience here is limited in typescript so assumed async.
//contains --> added the functionality as per assignment notes
```

### `/functions/index.ts` (Added as a common starting point)
```js
//Added to make sure in case one extends functions, there is a comon place to call all functions or remove
```
---
### `/types`
Contains shared type definitions (`Node`, `Value`, etc.) extracted from `ast.ts`. This separation makes type usage consistent across modules and avoids circular dependencies.

```js
//extended the function name to fetchget and contains, diud not change much here (can discuss more with team)
```
---
### Testing the changes
```js
//Extended the test to also cover the new added files
//Added test for evaluator.ts (since code changed the existingt test did not make much sense)
//Added some throw exception , can be handled more gracefully but not sure (can discuss with team)
```
![UML Repo](doc\Testing.PNG)

