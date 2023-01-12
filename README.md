# Video 8 show notes for JavaScript/TypeScript Base62

* Link to this [page](https://bit.ly/js_ts_base62): `https://bit.ly/js_ts_base62` 
* Link to related [video](https://youtu.be/1kbAUob3Bi0) TODO


## Tags

```
#typescript #javascript #python #java #functionalprogramming #scala #base62 

```



# Base62Encoder URLShortener



### Example URL shortener services:
* https://www.shorturl.at/
* https://bitly.com/
* https://tinyurl.com/

### URL shortener services and Base 62 explained:
* [WikiPedia URL Shortening](https://en.wikipedia.org/wiki/URL_shortening)
* [Base 62](https://en.wikipedia.org/wiki/Base62).

### URL shortener services and Base 62 tutorials with example code:
* [How a URL Shortening Application Works](https://dzone.com/articles/how-a-url-shortening-application-works)
* [Designing the Shortening URL system like Bit.ly, loading 6 billion clicks a month](https://itnext.io/designing-the-shortening-url-system-like-bit-ly-loading-6-billion-clicks-a-month-78b3e48eee8c)

# Videos in this series
* [First Video in Base62 language series 3rd Vlog video](https://www.youtube.com/watch?v=07Wkf9OZE3U)  [Show Notes]()
* [Second Video in Base62 language (Java) series 4th Vlog video](https://www.youtube.com/watch?v=sOhzb6OqyGA) [Show Notes](https://gist.github.com/RichardHightower/035fda0b65de540574e458dedf9dae6d)
* [Third Video in Base62 language (Scala) series 5th Vlog video](https://www.youtube.com/watch?v=TlQZn9MajlY)  [Show Notes](https://gist.github.com/RichardHightower/1d64d0c958a7643c8b0b573c08138e1f)
* [Fourth Video in Base62 language (Clojure) series 6th Vlog video](https://www.youtube.com/watch?v=1kbAUob3Bi0) [Show notes](https://gist.github.com/RichardHightower/5b45e5162cf8295f73e71d67ad4a442d)
* [Fifth Video in Base62 language (Python) series 7th Vlog video](https://www.youtube.com/watch?v=Sdfxs8UsK3w) [Show notes](https://github.com/RichardHightower/python_base62)
* [Sixth Video in Base62 language (JavaScript/TypeScript) series 8th Vlog video](https://www.youtube.com/TBD) [Show notes](https://github.com/RichardHightower/ts_js_base62)
* [Seventh Video in Base62 language (Rust) series 9th Vlog video](https://www.youtube.com/TBD) [Show notes](https://github.com/RichardHightower/https://github.com/RichardHightower/rust_base62)
* [Eighth Video in Base62 language (Go Lang) series 10th Vlog video](https://www.youtube.com/TBD) [Show notes](https://github.com/RichardHightower/golang_base62)

# Related articles
* [Comparing Basic FP support part 1 --Rick Hightower](https://www.linkedin.com/pulse/comparing-basic-fp-support-part-1-rick-hightower/)
* [Is Java a good FP language? Comparing Basic FP support part 2 --Rick Hightower](https://www.linkedin.com/pulse/java-good-fp-language-comparing-basic-support-part-2-rick-hightower/)
* [Translating to Clojure: a learning task (Part 1) --Tom Hicks](https://hickst.hashnode.dev/translating-to-clojure-a-learning-task-part-1)


# Where is Rick?
* [LinkedIn](https://www.linkedin.com/in/rickhigh/)
* [Rick's YouTube Channel](https://www.youtube.com/channel/UCgCx8XtYUGW9aSfzXhP2m6Q)
* [Where Rick works](http://www.cloudurable.com/)


## Title: Porting Base62Encoder/Decoder from Scala to JavaScript/TypeScript

Porting Base62Encoder/Decoder from Scala to JavaScript/TypeScript.

[Link To video](https://youtu.be/TBD)

## Scala to JavaScript

### Main Method

<table>
<tr>
<th>
Scala
</th>
<th>
JavaScript
</th>
</tr>

<tr>
<td>
<sub>

```scala 
def main(args: Array[String]): Unit = {
  val id = 12345678910L
  val strId = convertToEncodedString(id)
  val newId = convertToLong(strId)
  println(s"$id $strId $newId")

  val longURL = "https://www.somewebiste.com/dp/..."
  val urlId = Math.abs(longURL.hashCode)
  val shortHandle = convertToEncodedString(urlId)
  println(s"$urlId $shortHandle ${convertToLong(shortHandle)}")

}
```
</sub>
</td>

<td >
<sub>

```javascript
console.log("Output", convertToEncodedString(12345678910),    convertToLong("DTVD3O") );
let longUrl = "https://www.somewebiste.com/...";
let urlId = Math.abs(hashCode(longUrl))
let shortHandle = convertToEncodedString(urlId)
console.log("url id", urlId, "short handle", shortHandle, convertToLong(shortHandle))
```

</sub>
</td>

</tr>
</table>



### convertToEncodedString

<table>
<tr>
<th>
Scala
</th>
<th>
JavaScript
</th>
</tr>

<tr>
<td>
<sub>

```scala 
def convertToEncodedString(id: Long): String = {
  val builder: List[String] = List()
  val placeHolder = findStartBucket(id)
  val results = accumulateDigits(placeHolder, id, builder)
  val bucketValue = powDigitsBase(1)
  val digitIndex: Int = (results._2 / bucketValue).toInt
  val acc = results._2 - (bucketValue * digitIndex)
  val newBuilder: List[String] = appendSafeToList(results._3, digitIndex)
  //Put the remainder in the ones column
  val place1DigitIndex = (acc % bucketValue).toInt
  val finalBuilder = newBuilder ++ List(DIGITS(place1DigitIndex).toString)
  finalBuilder.mkString("")
}

private def accumulateDigits(placeHolder: Int, acc: Long, 
                     builder: List[String]): (Int, Long, List[String]) = {
  if (!(placeHolder > 1)) {
    return (placeHolder, acc, builder)
  }
  val bucketValue = powDigitsBase(placeHolder)
  val digitIndex = (acc / bucketValue).toInt
  accumulateDigits(placeHolder - 1, acc - (bucketValue * digitIndex), 
       appendSafeToList(builder, digitIndex))
}
```
</sub>
</td>

<td >
<sub>

```javascript
function convertToEncodedString(id)  {
    const builder = [];
    const placeHolder = findStartBucket(id);
    const results = accumulateDigits(placeHolder, id, builder);
    const bucketValue = powDigitsBase(1);
    const digitIndex = Math.floor(results[1] / bucketValue);
    const acc = results[1] - (bucketValue * digitIndex);
    appendSafe(builder, digitIndex);
    //Put the remainder in the ones column
    const place1DigitIndex = Math.floor(acc % bucketValue);
    appendSafe(builder, place1DigitIndex);
    return builder.join("");
}

function accumulateDigits(placeHolder, acc, builder)  {
    if (placeHolder <= 1) {
        return [placeHolder, acc, builder];
    }
    const bucketValue = powDigitsBase(placeHolder);
    const digitIndex = Math.floor(acc / bucketValue);
    return accumulateDigits(placeHolder - 1, acc - (bucketValue * digitIndex), appendSafe(builder, digitIndex));
}
```

</sub>
</td>

</tr>
</table>


### findStartBucket

<table>
<tr>
<th>
Scala
</th>
<th>
JavaScript
</th>
</tr>

<tr>
<td>
<sub>

```scala
private def findStartBucket(value: Long): Int = {
  val i = Range(0, 15, 1).find(i => value < powDigitsBase(i.toLong))
  i.getOrElse(0)
}
```
</sub>
</td>

<td >
<sub>

```javascript
function findStartBucket(value) {
    const range = [...Array(14).keys()];
    const index = range.find( i => value < powDigitsBase(i));
    return index ? index : 0;
}
```

</sub>
</td>

</tr>
</table>



### powDigitsBase

<table>
<tr>
<th>
Scala
</th>
<th>
JavaScript
</th>
</tr>

<tr>
<td>
<sub>

```scala
private def powDigitsBase(exponent: Long): Long = 
                        doPow(exponent, DIGITS.length)

private def doPow(exponent: Long, base: Int): Long = {
  if (exponent == 0) return 1
  doPow(exponent - 1, base) * base
}

```
</sub>
</td>

<td >
<sub>

```javascript 
function powDigitsBase(exponent) {
    return doPow(exponent, DIGITS.length);
}

function doPow(exponent, base)  {
    if (exponent === 0) return 1;
    return doPow(exponent - 1, base) * base;
}
```

</sub>
</td>

</tr>
</table>




### appendSafeToList

<table>
<tr>
<th>
Scala
</th>
<th>
JavaScript
</th>
</tr>

<tr>
<td>
<sub>

```scala

private def appendSafeToList(builder: List[String], digitIndex: Int): List[String] = {
  if (digitIndex != 0) builder ++ List((DIGITS(digitIndex)).toString)
  else if (builder.nonEmpty) builder ++ List((DIGITS(digitIndex)).toString)
  else builder
}
```
</sub>
</td>

<td >
<sub>

```javascript
function appendSafe(builder, digitIndex) {
    digitIndex = Math.floor(digitIndex);
    if (digitIndex !== 0) {
        builder.push(DIGITS[digitIndex]);
    } else {
        if (builder.length > 0) {
            builder.push(DIGITS[digitIndex]);
        }
    }
    return builder;
}
```

</sub>
</td>

</tr>
</table>




### convertToLong

<table>
<tr>
<th>
Scala
</th>
<th>
JavaScript
</th>
</tr>

<tr>
<td>
<sub>

```scala
def convertToLong(strId: String): Long = 
                            doConvertToLong(strId.toCharArray)

private def doConvertToLong(chars: Array[Char]): Long = {
  val (acc, _) = chars.reverse.foldLeft(0L, 0) { (pos, ch) =>
    val (acc, position) = pos
    val value = computeValue(ch, position)
    (acc + value, position + 1)
  }
  acc
}
```
</sub>
</td>

<td >
<sub>

```javascript
function convertToLong(strId) {
    return doConvertToLong(strId)
}

function doConvertToLong(str) {
    const chars = str.split("").reverse();
    const [acc, _] = chars.reduce((pos, ch) => {
        const [acc, position] = pos;
        const value = computeValue(ch, position);
        return [acc + value, position + 1];
    }, [0,0]);
    return acc;
}
```
</sub>
</td>

</tr>
</table>




### computeValue

<table>
<tr>
<th>
Scala
</th>
<th>
JavaScript
</th>
</tr>

<tr>
<td>
<sub>

```scala 
private def computeValue(c: Char, position: Int) = {
  val digitIndex = findIndexOfDigitInTable(c)
  val multiplier = powDigitsBase(position)
  digitIndex * multiplier
}
```
</sub>
</td>

<td >
<sub>

```javascript
function computeValue(c, position) {
    const digitIndex = findIndexOfDigitInTable(c);
    const multiplier = powDigitsBase(position);
    return digitIndex * multiplier;
}
```

</sub>
</td>

</tr>
</table>






----


## JavaScript full example

```javascript

const DIGITS = [
    //0    1    2    3    4    5    6    7    8    9
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    //10    11   12   13  14   15   16   17    18    19   20  21
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    //22    23   24   25  26   27   28   29    30    31   32  33    34  35
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    // 36  37  38   39   40   41    42    43   44  45   46    47
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',  //Easy to add more characters if not using lookup tables.
    // 48  49   50   51   52   53   54   55  56   57   58  59   60   61   // 62   63, 64
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']


function convertToEncodedString(id)  {
    const builder = [];
    const placeHolder = findStartBucket(id);
    const results = accumulateDigits(placeHolder, id, builder);
    const bucketValue = powDigitsBase(1);
    const digitIndex = Math.floor(results[1] / bucketValue);
    const acc = results[1] - (bucketValue * digitIndex);
    appendSafe(builder, digitIndex);
    //Put the remainder in the ones column
    const place1DigitIndex = Math.floor(acc % bucketValue);
    appendSafe(builder, place1DigitIndex);
    return builder.join("");
}

function findStartBucket(value) {
    const range = [...Array(14).keys()];
    const index = range.find( i => value < powDigitsBase(i));
    return index ? index : 0;
}

function powDigitsBase(exponent) {
    return doPow(exponent, DIGITS.length);
}

function doPow(exponent, base)  {
    if (exponent === 0) return 1;
    return doPow(exponent - 1, base) * base;
}

function accumulateDigits(placeHolder, acc, builder)  {
    if (placeHolder <= 1) {
        return [placeHolder, acc, builder];
    }
    const bucketValue = powDigitsBase(placeHolder);
    const digitIndex = Math.floor(acc / bucketValue);
    return accumulateDigits(placeHolder - 1, acc - (bucketValue * digitIndex), appendSafe(builder, digitIndex));
}

function appendSafe(builder, digitIndex) {

    digitIndex = Math.floor(digitIndex);
    if (digitIndex !== 0) {
        builder.push(DIGITS[digitIndex]);
    } else {
        if (builder.length > 0) {
            builder.push(DIGITS[digitIndex]);
        }
    }
    return builder;
}

function convertToLong(strId) {
    return doConvertToLong(strId)
}

function doConvertToLong(str) {
    const chars = str.split("").reverse();
    const [acc, _] = chars.reduce((pos, ch) => {
        const [acc, position] = pos;
        const value = computeValue(ch, position);
        return [acc + value, position + 1];
    }, [0,0]);
    return acc;
}

function computeValue(c, position) {
    const digitIndex = findIndexOfDigitInTable(c);
    const multiplier = powDigitsBase(position);
    return digitIndex * multiplier;
}



function findIndexOfDigitInTable(c)  {
    const i = DIGITS.indexOf(c);
    if (i === -1) {
        throw `Unknown char #${c}#`;
    }
    return i;
}

hashCode = function(s) {
    return s.split("").reduce(function(a, b) {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
}

console.log("Output", convertToEncodedString(12345678910),    convertToLong("DTVD3O") );
let longUrl = "https://www.somewebiste.com/dp/0201616165/?_encoding=UTF8&pd_rd_w=vwEcs&content-id=amzn1.sym.8cf3b8ef-6a74-45dc-9f0d-6409eb523603&pf_rd_p=8cf3b8ef-6a74-45dc-9f0d-6409eb523603&pf_rd_r=BQ0KD40K57XG761DBNBA&pd_rd_wg=DtkHk&pd_rd_r=f94b60b7-9080-4065-b77f-6377ec854d17&ref_=pd_gw_ci_mcx_mi";
let urlId = Math.abs(hashCode(longUrl))
let shortHandle = convertToEncodedString(urlId)
console.log("url id", urlId, "short handle", shortHandle, convertToLong(shortHandle))


```



## Scala to TypeScript

### Main Method

<table>
<tr>
<th>
Scala
</th>
<th>
TypeScript
</th>
</tr>

<tr>
<td>
<sub>

```scala 
def main(args: Array[String]): Unit = {
  val id = 12345678910L
  val strId = convertToEncodedString(id)
  val newId = convertToLong(strId)
  println(s"$id $strId $newId")

  val longURL = "https://www.somewebiste.com/dp/..."
  val urlId = Math.abs(longURL.hashCode)
  val shortHandle = convertToEncodedString(urlId)
  println(s"$urlId $shortHandle ${convertToLong(shortHandle)}")

}
```
</sub>
</td>

<td >
<sub>

```typescript
console.log("Output", convertToEncodedString(12345678910), convertToLong("DTVD3O") );
let longUrl = "https://www.somewebiste.com/dp/...";
let urlId = Math.abs(hashCode(longUrl))
let shortHandle = convertToEncodedString(urlId)
console.log("url id", urlId, "short handle", shortHandle, convertToLong(shortHandle))
```

</sub>
</td>

</tr>
</table>



### convertToEncodedString

<table>
<tr>
<th>
Scala
</th>
<th>
TypeScript
</th>
</tr>

<tr>
<td>
<sub>

```scala 
def convertToEncodedString(id: Long): String = {
  val builder: List[String] = List()
  val placeHolder = findStartBucket(id)
  val results = accumulateDigits(placeHolder, id, builder)
  val bucketValue = powDigitsBase(1)
  val digitIndex: Int = (results._2 / bucketValue).toInt
  val acc = results._2 - (bucketValue * digitIndex)
  val newBuilder: List[String] = appendSafeToList(results._3, digitIndex)
  //Put the remainder in the ones column
  val place1DigitIndex = (acc % bucketValue).toInt
  val finalBuilder = newBuilder ++ List(DIGITS(place1DigitIndex).toString)
  finalBuilder.mkString("")
}

private def accumulateDigits(placeHolder: Int, acc: Long, 
                     builder: List[String]): (Int, Long, List[String]) = {
  if (!(placeHolder > 1)) {
    return (placeHolder, acc, builder)
  }
  val bucketValue = powDigitsBase(placeHolder)
  val digitIndex = (acc / bucketValue).toInt
  accumulateDigits(placeHolder - 1, acc - (bucketValue * digitIndex), 
       appendSafeToList(builder, digitIndex))
}
```
</sub>
</td>

<td >
<sub>

```typescript
function convertToEncodedString(id: number) : string {
    const builder : string[] = [];
    const placeHolder : number = findStartBucket(id);
    const results = accumulateDigits(placeHolder, id, builder);
    const bucketValue = powDigitsBase(1);
    const digitIndex = Math.floor(results[1] / bucketValue);
    const acc = results[1] - (bucketValue * digitIndex);
    appendSafe(builder, digitIndex);
    //Put the remainder in the ones column
    const place1DigitIndex = Math.floor(acc % bucketValue);
    appendSafe(builder, place1DigitIndex);
    return builder.join("");
}

function accumulateDigits(placeHolder : number, acc: number, builder: string[]) : [number, number, string[]]  {
    if (placeHolder <= 1) {
        return [placeHolder, acc, builder];
    }
    const bucketValue = powDigitsBase(placeHolder);
    const digitIndex = Math.floor(acc / bucketValue);
    return accumulateDigits(placeHolder - 1, acc - (bucketValue * digitIndex), appendSafe(builder, digitIndex));
}
```

</sub>
</td>

</tr>
</table>


### findStartBucket

<table>
<tr>
<th>
Scala
</th>
<th>
TypeScript
</th>
</tr>

<tr>
<td>
<sub>

```scala
private def findStartBucket(value: Long): Int = {
  val i = Range(0, 15, 1).find(i => value < powDigitsBase(i.toLong))
  i.getOrElse(0)
}
```
</sub>
</td>

<td >
<sub>

```typescript
function findStartBucket(value: number) : number {
    const range = [...Array(14)].map((_, i) => i);
    const index = range.find( i => value < powDigitsBase(i));
    return index ? index : 0;
}
```

</sub>
</td>

</tr>
</table>



### powDigitsBase

<table>
<tr>
<th>
Scala
</th>
<th>
TypeScript
</th>
</tr>

<tr>
<td>
<sub>

```scala
private def powDigitsBase(exponent: Long): Long = 
                        doPow(exponent, DIGITS.length)

private def doPow(exponent: Long, base: Int): Long = {
  if (exponent == 0) return 1
  doPow(exponent - 1, base) * base
}

```
</sub>
</td>

<td >
<sub>

```typescript 
function powDigitsBase(exponent: number): number {
    return doPow(exponent, DIGITS.length);
}

function doPow(exponent: number, base: number) : number  {
    if (exponent === 0) return 1;
    return  doPow(exponent - 1, base) * base;
}
```

</sub>
</td>

</tr>
</table>




### appendSafeToList

<table>
<tr>
<th>
Scala
</th>
<th>
TypeScript
</th>
</tr>

<tr>
<td>
<sub>

```scala

private def appendSafeToList(builder: List[String], digitIndex: Int): List[String] = {
  if (digitIndex != 0) builder ++ List((DIGITS(digitIndex)).toString)
  else if (builder.nonEmpty) builder ++ List((DIGITS(digitIndex)).toString)
  else builder
}
```
</sub>
</td>

<td >
<sub>

```typescript
function appendSafe(builder:string[], digitIndex:number) {
    digitIndex = Math.floor(digitIndex);
    if (digitIndex !== 0) {
        builder.push(DIGITS[digitIndex]);
    } else {
        if (builder.length > 0) {
            builder.push(DIGITS[digitIndex]);
        }
    }
    return builder;
}
```

</sub>
</td>

</tr>
</table>




### convertToLong

<table>
<tr>
<th>
Scala
</th>
<th>
TypeScript
</th>
</tr>

<tr>
<td>
<sub>

```scala
def convertToLong(strId: String): Long = 
                            doConvertToLong(strId.toCharArray)

private def doConvertToLong(chars: Array[Char]): Long = {
  val (acc, _) = chars.reverse.foldLeft(0L, 0) { (pos, ch) =>
    val (acc, position) = pos
    val value = computeValue(ch, position)
    (acc + value, position + 1)
  }
  acc
}
```
</sub>
</td>

<td >
<sub>

```typescript
function convertToLong(strId:string) {
    return doConvertToLong(strId)
}

function doConvertToLong(str: string) : number {
    const chars = str.split("").reverse();
    const [acc, _] = chars.reduce((pos, ch) => {
        const [acc, position] = pos;
        const value = computeValue(ch, position);
        return [acc + value, position + 1];
    }, [0,0]);
    return acc;
}
```
</sub>
</td>

</tr>
</table>




### computeValue

<table>
<tr>
<th>
Scala
</th>
<th>
TypesScript
</th>
</tr>

<tr>
<td>
<sub>

```scala 
private def computeValue(c: Char, position: Int) = {
  val digitIndex = findIndexOfDigitInTable(c)
  val multiplier = powDigitsBase(position)
  digitIndex * multiplier
}
```
</sub>
</td>

<td >
<sub>

```typescript
function computeValue(c: string, position: number) : number {
    const digitIndex = findIndexOfDigitInTable(c);
    const multiplier = powDigitsBase(position);
    return digitIndex * multiplier;
}
```

</sub>
</td>

</tr>
</table>

----


## TypeScript full example

```typescript
const DIGITS : string[] = [
    //0    1    2    3    4    5    6    7    8    9
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    //10    11   12   13  14   15   16   17    18    19   20  21
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    //22    23   24   25  26   27   28   29    30    31   32  33    34  35
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    // 36  37  38   39   40   41    42    43   44  45   46    47
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',  //Easy to add more characters if not using lookup tables.
    // 48  49   50   51   52   53   54   55  56   57   58  59   60   61   // 62   63, 64
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function findStartBucket(value: number) : number {
    const range = [...Array(14)].map((_, i) => i);
    const index = range.find( i => value < powDigitsBase(i));
    return index ? index : 0;
}

function convertToEncodedString(id: number) : string {
    const builder : string[] = [];
    const placeHolder : number = findStartBucket(id);
    const results = accumulateDigits(placeHolder, id, builder);
    const bucketValue = powDigitsBase(1);
    const digitIndex = Math.floor(results[1] / bucketValue);
    const acc = results[1] - (bucketValue * digitIndex);
    appendSafe(builder, digitIndex);
    //Put the remainder in the ones column
    const place1DigitIndex = Math.floor(acc % bucketValue);
    appendSafe(builder, place1DigitIndex);
    return builder.join("");
}

function powDigitsBase(exponent: number): number {
    return doPow(exponent, DIGITS.length);
}

function doPow(exponent: number, base: number) : number  {
    if (exponent === 0) return 1;
    return  doPow(exponent - 1, base) * base;
}

function accumulateDigits(placeHolder : number, acc: number, builder: string[]) : [number, number, string[]]  {
    if (placeHolder <= 1) {
        return [placeHolder, acc, builder];
    }
    const bucketValue = powDigitsBase(placeHolder);
    const digitIndex = Math.floor(acc / bucketValue);
    return accumulateDigits(placeHolder - 1, acc - (bucketValue * digitIndex), appendSafe(builder, digitIndex));
}

function appendSafe(builder:string[], digitIndex:number) {

    digitIndex = Math.floor(digitIndex);
    if (digitIndex !== 0) {
        builder.push(DIGITS[digitIndex]);
    } else {
        if (builder.length > 0) {
            builder.push(DIGITS[digitIndex]);
        }
    }
    return builder;
}

function convertToLong(strId:string) {
    return doConvertToLong(strId)
}

function computeValue(c: string, position: number) : number {
    const digitIndex = findIndexOfDigitInTable(c);
    const multiplier = powDigitsBase(position);
    return digitIndex * multiplier;
}

function doConvertToLong(str: string) : number {
    const chars = str.split("").reverse();
    const [acc, _] = chars.reduce((pos, ch) => {
        const [acc, position] = pos;
        const value = computeValue(ch, position);
        return [acc + value, position + 1];
    }, [0,0]);
    return acc;
}

function findIndexOfDigitInTable(c: string) : number {
    const i = DIGITS.indexOf(c);
    if (i === -1) {
        throw `Unknown char #${c}#`;
    }
    return i;
}

function hashCode(s : string) : number{
    return s.split("").reduce(function(a : number, b: string) {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
}

console.log("Output", convertToEncodedString(12345678910), convertToLong("DTVD3O") );


let longUrl = "https://www.somewebiste.com/dp/0201616165/?_encoding=UTF8&pd_rd_w=vwEcs&content-id=amzn1.sym.8cf3b8ef-6a74-45dc-9f0d-6409eb523603&pf_rd_p=8cf3b8ef-6a74-45dc-9f0d-6409eb523603&pf_rd_r=BQ0KD40K57XG761DBNBA&pd_rd_wg=DtkHk&pd_rd_r=f94b60b7-9080-4065-b77f-6377ec854d17&ref_=pd_gw_ci_mcx_mi";
let urlId = Math.abs(hashCode(longUrl))
let shortHandle = convertToEncodedString(urlId)
console.log("url id", urlId, "short handle", shortHandle, convertToLong(shortHandle))

```


