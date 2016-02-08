# rogain-core-helpers

Core helpers for Rogain templates.

## Each

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

## If

Returns it's children if `data` to `value` are equal. If the `<Else />` branch is defined, it will be returned when `data` and `value` are not equal.

```html
<If data={loggedIn} value="true"><Dashboard /></If>
```

__Attributes__

___data___

Variable or Expression.

___value___

Variable or Expression.

## Unless

Returns it's children if `data` to `value` are __not__ equal. If the `<Else />` branch is defined, it will be returned when `data` and `value` are equal.

```html
<Unless data={loggedIn} value="true"><LoginForm /></Unless>
```

__Attributes__

___data___

Variable or Expression.

___value___

Variable or Expression.

## Defined

Returns children if `data` is an non-empty Array or Object (`[0, 1]`, `{x:1,y:3}`) or defined variable.  If the `<Else />` branch is defined, it will be returned when `data` is empty or undefined.

```html
<Defined data={searchResults}><Results /></Defined>
```

__Attributes__

___data___

Variable or Expression.

## Empty

Returns children if `data` is an empty Array or Object (`[]`, `{}`) or undefined variable.  If the `<Else />` branch is defined, it will be returned when `data` is non-empty and defined.

```html
<Empty data={searchResults}>No results.</Empty>
```

__Attributes__

___data___

Variable or Expression.

## Range

Returns children if `data` is between `min` and `max`.  If the `<Else />` branch is defined, it will be returned when `data` is out of range. 

Omitting `min` or `max` will default to `-Infinity` and `Infinity` respectively.

```html
<Repeat data={searchResults}>
    <Range data={@index} min="0" max="2">
        <!-- Top 3 -->
        <h2>{@repeat.title}</h2>
        <p>{@repeat.excerpt}</p>
    <Else />
        <!-- The rest -->
        <h3>{@repeat.title}</h3>
    </Range>
</Repeat>
```

__Attributes__

___data___

Variable or expression.

___min___

Number. Optional.

___max___

Number. Optional.


## Else

_Implicit helper._  Can be used with `If`, `Unless`, `Empty`, `NonEmpty`, `range`.  Used to denote an inverse branch. 

```html
<If data={loggedIn} value="true">
    <!-- If Branch -->
<Else />
    <!-- Else Branch -->
</If>

<Unless data={loggedIn}><Else /></Unless>
<Empty data={loggedIn}><Else /></Empty>
<NonEmpty data={loggedIn}><Else /></NonEmpty>
<Range data={loggedIn}><Else /></Range>
```

__Else helper meant to be called as a block, it's used to split trees inside other helpers.__




## Install 

With [npm](https://www.npmjs.com) do:

```
npm install rogain-lib-helpers
```

## License

MIT