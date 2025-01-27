'use strict';

/**
 * Wrapper over the native HTMLElement
 * @template {HTMLElement} E
 */
export class Element {
    /**
     * 
     * @param {E} element 
     */
    constructor(element) {
        /**
         * Internal Element
         * @type {E}
         */
        this.element = element;
    }

    /**
     * @returns {E}
     */
    getElement() {
        return this.element
    }

    /**
     * Returns value of the given Attribute-key or null
     * @param {string} key key to be looked up
     * @returns {null|string}
    */
    getAttr(key) {
        return this.element.getAttribute(key);
    }

    getInnerText() {
        return this.element.innerText;
    }

    getInnerHTML() {
        return this.element.innerHTML;
    }

    getTextContent() {
        return this.element.textContent;
    }

    /**
     * @param {string} key 
     * @param {string} val 
     * @returns {Element<E>}
     */
    setAttribute(key, val) {
        this.element.setAttribute(key, val);
        return this;
    }

    /**
     * @param {...{[A: string]:string}} attributes 
     * @returns {Element<E>}
     */
    setAttributes(...attributes) {
        attributes.flatMap(Object.entries).forEach(([key, value]) => this.setAttribute(key, value))
        return this;
    }

    /**
     * 
     * @param {string} cssClass 
     * @returns {Element<E>}
    */
    setClass(cssClass) {
        this.element.className = cssClass;
        return this;
    }

    /**
     * 
     * @param {string} id
     * @returns {Element<E>}
     */
    setId(id) {
        this.element.id = id;
        return this;
    }

    /**
     * 
     * @param {string} text 
     * @returns {Element<E>}
     */
    setInnerText(text) {
        this.element.innerText = text;
        return this;
    }

    /**
     * 
     * @param {string} html 
     * @returns {Element<E>}
     */
    setInnerHTML(html) {
        this.element.innerHTML = html;
        return this;
    }

    /**
     * 
     * @param {string} textContent 
     * @returns {Element<E>}
     */
    setTextContent(textContent) {
        this.element.textContent = textContent;
        return this;
    }

    /**
     * 
     * @param {string} value 
     * @returns {Element<E>}
     */
    setValue(value) {
        this.element.value = value;
        return this;
    }

    /**
     * 
     * @param {string} name 
     * @returns {Element<E>}
     */
    setName(name) {
        this.element.name = name;
        return this;
    }

    /**
     * @param {{[K in keyof CSSStyleDeclaration]:string}} style 
     * @returns {Element<E>}
     */
    setStyle(style) {
        for (const [key, value] of Object.entries(style)) {
            this.element.style.setProperty(key, value);
        }
        return this;
    }

    /**
     * 
     * @param  {...Element<HTMLElement>} children 
     * @returns {Element<E>}
     */
    setChildren(...children) {
        this.element.replaceChildren(...[]);
        return this.addChildren(...children);
    }
    /**
     * 
     * @param {...string} classes 
     * @returns {Element<E>}
     */
    addClass(...classes) {
        this.element.classList.add(...classes);
        return this;
    }

    /**
     * 
     * @param  {...Element<HTMLElement>} children 
     * @returns {Element<E>}
     */
    addChildren(...children) {
        children.forEach(child => {
            this.element.appendChild(child.element)
        })
        return this;
    }

    /**
     * 
     * @param {string} text 
     * @returns {Element<E>}
     */
    addInnerText(text) {
        this.element.innerText += text;
        return this;
    }

    /**
     * 
     * @param {string} html 
     * @returns {Element<E>}
     */
    addInnerHTML(html) {
        this.element.innerHTML += html;
        return this;
    }

    /**
     * 
     * @param {string} textContent 
     * @returns {Element<E>}
     */
    addTextContent(textContent) {
        this.element.textContent += textContent;
        return this;
    }

    /**
     * @template {keyof HTMLElementEventMap} K
     * @param {K} kind 
     * @param {(this: HTMLElement, ev: HTMLElementEventMap[K]) => any} callback 
     * @param {boolean | AddEventListenerOptions} [options=undefined] 
     * @returns {Element<E>}
     */
    addEventListener(kind, callback, options = undefined) {
        this.element.addEventListener(kind, callback, options);
        return this;
    }

    /**
     * 
     * @param {HTMLElement} [to=document.body] Element to render into (default = document.body)
     */
    render(to = document.body) {
        to.appendChild(this.element);
    }
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} kind 
 * @param {...Element<HTMLElement>} children 
 * @returns {Element<HTMLElementTagNameMap[K]>}
 */
export function element1(kind, ...children) {
    return new Element(document.createElement(kind)).setChildren(...children);
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @typedef {Object} ElementParams
 * @prop {K} kind What Kind of HTMLElement to create
 * @prop {string} [id] The Id-Attribute of the Element
 * @prop {string[]} [classes] The Class-Attribute of the Element
 * @prop {{[A: string]:string}} [attributes] Other Attributes of the Element
 * @prop {{[C in keyof CSSStyleDeclaration]:string}} [style] The (Inline)Style-Attribute of the Element
 * @prop {ElementParams<keyof HTMLElementTagNameMap>[]} [children] Children before inner Text
 * @prop {string>[]} [innerText] The Inner Text of the Element (Warning: not sanitized)
 * @prop {ElementParams<keyof HTMLElementTagNameMap>[]} [children2] Children after inner Text
*/
/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {ElementParams<K>} param0 description of the Element that should be created
 * @returns {Element<HTMLElementTagNameMap[K]>}
 */
export function element2({ kind, id, classes, attributes, style, children = [], innerText, children2 = [] }) {
    let el = element1(kind);
    if (id != undefined) {
        el.setId(id)
    }
    if (classes != undefined && classes.length > 0) {
        el.addClass(...classes)
    }
    if (attributes != undefined && attributes.length > 0) {
        el.setAttributes(...attributes)
    }
    if (style != undefined) {
        el.setStyle(style)
    }
    el.addChildren(...(children.map(child => element(child))));
    if (innerText) {
        el.addInnerHTML(innerText);
    }
    el.addChildren(...(children2.map(child => element(child))));
    return el;
}

/**
 * @overload
 * @param {ElementParams<K>} param description of the Element that should be created
 * @returns {Element<HTMLElementTagNameMap[K]>}
 */
/** 
 * @overload
 * @param {K} param kind of HTMLElement to be created
 * @param {...Element<HTMLElement>} children children of the Element to be created
 * @returns {Element<HTMLElementTagNameMap[K]>}
*/
/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {ElementParams<K>|K} param description of the Element that should be created | Kind of HTMLElement to be created
 * @param {...Element<HTMLElement>} [children] undefined | children of the Element to be created
 * @returns {Element<HTMLElementTagNameMap[K]>}
 */
export function element(param, ...children) {
    if (param instanceof Object && 'kind' in param) {
        return element2(param);
    }
    return element1(param, ...children);
}
if (window) {
    window.element = element
}

/**
 * @exports [ElementParams]
 */