---
title: Lightning Talk No. 5 - Object Mapper
---
# Object Mapper

_transforming data while keeping your sanity_

---

# Thank You!

---

## The Problem

API properties and internal data patterns differ.

Data Transformation can be tedious.

---

## The Solution

```
objectMapper(object, { source ~> destination })
```

Source
```
{
  "foo": "bar"
}
```

Map
```
{
  "foo": "bar.baz",
  "bar.foo:" "baz"
}
```

---

# Demo

---

## That's all folks!