# edify
Edify is a light weighted web based online editor plugin for web apps, can be useful for developers, code content creators and educational purpose. Currently it supports HTML, JavaScript and CSS only. This editor is build on top of prismjs (https://prismjs.com/).  

# Demo
https://rahulsemwal.github.io/edify/examples/index.html

# Uses
- Step 1: Include all files from lib folder like prism.css, edify.css, prism.js and edify.js into your website.
- Step 2: Add below syntax into your website and enjoy writing HTML online with live preview.
  ``` 
  <edify language="html" preview="true"><h1>Hello edify!</h1></edify> 
  ```
- Step 3: Try other examples from examples/index.html and examples/sample/

# Documentation
## Syntax and Parameters
- Abbreviation
  * (D) = Default
  * [*] = Mandatory
- Syntax ``` <edify language="" preview="" execution="" target="" style=""></edify> ```
- Parameters
  * language  =  `"html" | "js" | "css"` [*]
  * preview   =  `"false" (D) | "true"` [*]
  * execution =  `"file-markup" | "markup" | "script-markup" | ""` [*]  
  * target    =  `"Filename with path"` [*] mandatory in case of execution == file-markup
  * target    =  `"Id of an element"` [*] mandatory in case of execution == markup | script-markup
  * target    =  `"Empty or target not defined"` not needed in case of execution == "" or exclude execution attribute from `<edify>`     
  * style     =  `"Any valid css"` which will be applied to the root element of the editor

# Tasks

