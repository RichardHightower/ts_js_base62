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
