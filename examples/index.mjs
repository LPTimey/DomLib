'use strict';

import { element } from "../src/dom_lib.mjs";
/**
 * @import {ElementParams} from "../src/dom_lib.mjs"
 */

let test = element("div")
    .setAttribute("id", "test")
    .addClass("test", "test2")
    .addChildren(
        element("p").setInnerText("Hallo")
    );
console.log(test);
test.render();
/** 
 * @template {keyof HTMLElementTagNameMap } K
 * @type {ElementParams<K>} 
 * */
let test15 = { kind: "button", id: "hello" };

let test2 = element(test15).setValue("Test2").setInnerText("Test2").setStyle({ color: "red" });

console.log(test2);
test2.render()

let list = element(
    {
        kind: "ul",
        id: "List",
        style: { padding: "2rem" },
        children: [
            { kind: "li", innerText: "Hello" },
            { kind: "li", innerText: "sweet" }
        ],
        innerText: "Test",
        children2: [
            { kind: "li", innerText: "World" }
        ],
    })
console.log(list);
list.render();