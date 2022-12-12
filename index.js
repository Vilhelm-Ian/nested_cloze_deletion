const str = "The year was {{c1::{{c2::19}}{{c3::84}}}}, when {{c4::Big brother appeared}}";

solution =  str.replaceAll(/{{c\d::/g, "");
solution =  solution.replaceAll(/}/g, "");

let split_str = str.split("");
let cloze_deletions = [];
for (let i = 0; i <= str.length; i++) {
  if (
    str.slice(i, i + 3) == "{{c" &&
    isNaN(str[4]) &&
    str.slice(i + 4, i + 6) == "::"
  ) {
    cloze_deletions.push({ start: i });
  } else if (str.slice(i, i + 2) == "}}") {
    for (let z = cloze_deletions.length - 1; z >= 0; z--) {
      if (cloze_deletions[z].end == undefined) {
        cloze_deletions[z].end = i;
        break;
      }
    }
  }
}

for (let i = cloze_deletions.length - 1; i >= 0; i--) {
  //    console.log(str.slice(cloze_deletions[i].start + 6,cloze_deletions[i].end))
  let str_copy =
    str.slice(0, cloze_deletions[i].start + 6) +
    "[...]" +
    str.slice(cloze_deletions[i].end, str.length);
 str_copy =  str_copy.replaceAll(/{{c\d::/g, "");
str_copy =  str_copy.replaceAll(/}/g, "");
  console.log(`question: ${str_copy}. solution: ${solution}`);
}
