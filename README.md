<p align="center">
  <img height="400" src="https://raw.githubusercontent.com/exelord/solid-proxies/main/logo.png" alt="Solid Proxies logo" />
</p>

# Solid Proxies

This package provides signaled versions of Javascript's built-in objects. Thanks to it, all theirs properties will be automatically tracked while using standard API.

Signaled built-ins:

- Object
- Array
- Map (coming soon)
- WeakMap (coming soon)
- Set (coming soon)
- WeakSet (coming soon)


## Installation

```
npm i solid-proxies
```

## Compatibility

- Solid.js ^1.0

## Demo

## Usage

### SignaledObject

`SignaledObject` will track all properties changes automatically. Setting new values, deleting, or checking keys will make your code react to changes.

There are 2 ways of how you can use `SignaledObject`:

```js
import { SignaledObject } from 'solid-proxies';

const user = new SignaledObject({ name: "Maciej" })

createEffect(() => {
  console.log(user.name);
})

// After some time...
user.name = "Exelord" // This change will rerun the effect
```

and

```js
import { createObject } from 'solid-proxies';

const user = createObject({ name: "Maciej" })

createEffect(() => {
  console.log(user.name);
})

// After some time...
user.name = "Exelord" // This change will rerun the effect
```

**Important** SignaledObjects are not deep wrapped. Means an object in SignaledObject would need to be signaled individually.


### SignaledArray

`SignaledArray` will track any changes in the array automatically. Setting new values, deleting, or checking keys will make your code react to changes.

There are 2 ways of how you can use `SignaledArray`:

```js
import { SignaledArray } from 'solid-proxies';

const users = new SignaledArray([{ name: "Maciej" }])

createEffect(() => {
  console.log(users[0].name);
})

// After some time...
users[0] = { name: "Exelord" } // This change will rerun the effect
```

and

```js
import { createObject } from 'solid-proxies';

const users = createObject([{ name: "Maciej" }])

createEffect(() => {
  console.log(users[0].name);
})

// After some time...
users[0] = { name: "Exelord" } // This change will rerun the effect
```

**Important** SignaledArrays are not deep wrapped. Means an array or object in SignaledObject would need to be signaled individually.
