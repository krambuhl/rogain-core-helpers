# rogain-core-helpers

Core helpers for Rogain templates.

## Helpers

### Frame

Alias and create inline variables.

```html
<Frame friend={@attrs.name} intro="My friend's name is">
    <div>{intro} {friend}</div>
</Frame>
```

```html
<Friend name="Buckle" />
```

```html
<div>My friend's name is Buckle</div>
```


### Children

Provides an outlet in a component that can be used to compose components.

```html
<div class="card"><Children /></div>
```


### Each

Returns a tree of the `data` mapped to children.  Each child can access the current element with the `@item` (or `as` attribute) properties and the current index with `@index`.

```html
<Each data={searchResults} as="@result">
    <h3>{@result.title}</h3>
    <p>{@result.excerpt}</p>
</Each>
```

__Attributes__

___data___

Variable. Array.

___as___

String. Defines the local variable for accessing each element in `data`. Defaults to `@item`.

### Defined

Returns children if `data` is an non-empty Array or Object (`[0, 1]`, `{x:1,y:3}`) or defined variable.  If the `<Else />` branch is defined, it will be returned when `data` is empty or undefined.

```html
<Defined data={searchResults}><Results /></Defined>
```

__Attributes__

___data___

Variable or Expression.

### Empty

Returns children if `data` is an empty Array or Object (`[]`, `{}`) or undefined variable.  If the `<Else />` branch is defined, it will be returned when `data` is non-empty and defined.

```html
<Empty data={searchResults}>No results.</Empty>
```

__Attributes__

___data___

Variable or Expression.


### If

Returns it's children if `data` to `value` are equal. If the `<Else />` branch is defined, it will be returned when `data` and `value` are not equal.

If `value` is not defined, `If` will have the same behavior as `Defined`.

```html
<If data={loggedIn} value="true"><Dashboard /></If>
```

__Attributes__

___data___

Variable or Expression.

___value___

Variable or Expression. Optional.

### Unless

Returns it's children if `data` to `value` are __not__ equal. If the `<Else />` branch is defined, it will be returned when `data` and `value` are equal.

If `value` is not defined, `Unless` will have the same behavior as `Empty`.

```html
<Unless data={loggedIn} value="true"><LoginForm /></Unless>
```

__Attributes__

___data___

Variable or Expression.

___value___

Variable or Expression.  Optional.

### Range

Returns children if `data` is between `min` and `max`.  If the `<Else />` branch is defined, it will be returned when `data` is out of range. 

Omitting `min` or `max` will default to `-Infinity` and `Infinity` respectively.

```html
<Each data={searchResults}>
    <Range data={@index} min="0" max="2">
        <!-- Top 3 -->
        <h2>{@item.title}</h2>
        <p>{@item.excerpt}</p>
    <Else />
        <!-- The rest -->
        <h3>{@item.title}</h3>
    </Range>
</Each>
```

__Attributes__

___data___

Variable or expression.

___min___

Number. Optional.

___max___

Number. Optional.


### Else

_Implicit helper._  Can be used with `If`, `Unless`, `Defined`, `Empty`, `Range`.  Used to denote an inverse branch. 

```html
<If data={loggedIn} value="true">
    <!-- If Branch -->
<Else />
    <!-- Else Branch -->
</If>

<Unless data={loggedIn}><Else /></Unless>
<Defined data={loggedIn}><Else /></Defined>
<Empty data={loggedIn}><Else /></Empty>
<Range data={loggedIn}><Else /></Range>
```

__Else helper is not meant to be called as a block, it's used to split trees inside other helpers.__

<!-- ### Slot

Provides multiple outlet slots for a component that can be used for layout type composition.

```html
<div>
    <header><Slot name="header" /></header>
    <footer><Slot name="footer" /></footer>
</div>
```

```html
<Card>
    <Slot name="header">Gob Bluth</Slot>
    <Slot name="footer">Bluth Family</Slot>
</Card>
```

```html
<div>
    <header>Gob Bluth</header>
    <footer>Bluth Family</footer>
</div>
```
 -->

## Install 

With [npm](https://www.npmjs.com) do:

```
npm install rogain-core-helpers
```

## License

MIT