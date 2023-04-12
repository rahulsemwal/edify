# edify
Edify is a light weight, web based online editor plugin for websites and can be useful for developers, code content creators and education purpose. Currently it only supports HTML, JavaScript and CSS. This editor is build upon top of prismjs (https://prismjs.com/).  

# Demo
https://rahulsemwal.github.io/edify/examples/index.html

# Uses
##Step 1: include all files from lib folder like prism.css, edify.css, prism.js and edify.js into your website.
##Step 2: add 
  ```
  <edify language="html" preview="true"><h1>Hello edify!</h1></edify>
 ```
 element into your website and enjoy writing HTML online with live preview.
##Step 3: Try other examples from examples/index.html and examples/sample/

# Documentation
## Syntax and Parameters
@Abriviation
@(D) = Default
@[*] = Mandatory
@Tag ``` <edify language="" preview="" execution="" target="" style=""></edify> ```
@Params  language  =  "html" | "js" | "css" [[*] Mandatory]
@Params  preview   =  "false" (D) | "true" 
@Params  execution =  "file-markup" | "markup" | "script-markup" | ""  
@Params  target    =  'filename with path' [*] mandatory in case of execution == file-markup
@Params  target    =  'id of an element' [*] mandatory in case of execution == markup | script-markup
@Params  target    =  'empty or target not defined' not needed in case execution == "" or execution not defined     
@Params  style     =  any valid css styles which will further apply to parent element of the editor
