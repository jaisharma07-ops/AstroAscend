import fs from "node:fs";

const html = fs.readFileSync("./rendered.html", "utf8");

// Pattern: "A?":"A","A":"<actual text>"
// followed by a "}" or "}]"
// Text may contain escaped chars. Let's extract every occurrence.
const blocks = [];
const re = /"A\?":"A","A":"((?:[^"\\]|\\.)*?)"/g;
let m;
while ((m = re.exec(html)) !== null) {
  // Decode escapes
  let t = m[1];
  t = t
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\")
    .replace(/\\\//g, "/");
  if (t.trim().length > 0) blocks.push(t);
}

console.log(`Found ${blocks.length} text blocks in JSON\n`);
blocks.forEach((b, i) => {
  console.log(`--- block ${i} ---`);
  console.log(b);
});

fs.writeFileSync("./text_blocks.json", JSON.stringify(blocks, null, 2));
