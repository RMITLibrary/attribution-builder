"use strict";const fs=require("node:fs"),path=require("node:path"),{runSass:runSass}=require("sass-true");module.exports=(e,{describe:s,it:r})=>{const t=fs.readFileSync(e,"utf8");runSass({describe:s,it:r,sourceType:"string"},'$true-terminal-output: false; @import "true";'+t,{loadPaths:[path.dirname(e)]})};