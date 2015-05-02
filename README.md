#Bloomish

A bloom filter in javascript. To know more about bloom filters have a look [here](http://en.wikipedia.org/wiki/Bloom_filter#Examples).

## Usage

A bloom filter is comprised of a set, a hashing function, a reduction function, and a membership test function.

The hash function needs to output some value to identify the items, the reduction function is used to combine the hashes of the set members, and a membership function is used to test an item's hash against the filter.

Bloomish is just the structure that ties it all together.

```
import Bloomish from 'bloomish';

let items = [...];

let hash = (item) => { ... };

let reduce = (acc, item) => { ... };

let has = (itemHash, filter) => { ... };

let awesomeFilter = new Bloomish({
  items,
  hash,
  reduce,
  has
});
```

Then it can be used as such : 

```
var item = 'hello';

awesomeFilter.has(item);
// returns true or false
```

## Contribution

Any contribution is welcome. Suggestions can be opened as issues, and feel free to fork the repo and open a pull request for any code contribution.

## License

This software is provided as such, without any guarantees regarding it's functionality.

It is licensed under the MIT software license.

Original Author : Omar Kamali.
