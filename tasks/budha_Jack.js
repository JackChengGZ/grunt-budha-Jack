/*
 * grunt-budha-Jack
 * 
 *
 * Copyright (c) 2017 JackCheng
 * Licensed under the MIT license.
 */

'use strict';
var path=require('path');


module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

//插件的制作时候采用registerMultiTask
  grunt.registerMultiTask('budha_Jack', '美女保佑代码', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      who:'budha',//budha alpaca
      commentSymbol:'//'
    });
    var testExistRegexMap={
      'budha':/.....88888888888888888:::88888::::顶::*顶*o:88888888 88/,
      'alpaca':/感謝分享⊙★讚讚讚讚讚讚讚讚讚讚讚★⊙享分謝感/
    };
    var who=options.who,
        commentSymbol=options.commentSymbol,
        commentFilepathMap={
          'budha':'assets/budha.txt',
          'alpaca':'assets/alpaca.txt'
        },
        commentFilepath=path.join(__dirname,commentFilepathMap[who]),
        commentContent=grunt.file.read(commentFilepath),
        lineCommentArr=commentContent.split(grunt.util.normalizelf('\n'));
        lineCommentArr.forEach(function(value,index,arr){
          arr[index]=commentSymbol+value;
        });
        commentContent=lineCommentArr.join(grunt.util.normalizelf('\n'));

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
      file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        var originalFileContent=grunt.file.read(filepath),
            newFileContent=commentContent+
                grunt.util.normalizelf('\n')+
                originalFileContent;
        if(testExistRegexMap[who].test(originalFileContent)){
          return;
        }

        grunt.file.write(filepath,newFileContent);
      });

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
