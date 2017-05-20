module.exports = function(grunt) {
  var sitepath = "cdn";
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //step 1: 复制所有源文件到临时目录temp,所有的文件都从temp中取，避免覆盖源文件    
    //        复制业务js源文件到生产目录  
    //原则就是从temp到build目录
    copy: {
      all:{
        expand: true, 
        cwd: 'static/',
        src: ['**/*.*'], 
        dest:'temp/'
      },
      srcjs: {
        expand: true, 
        cwd: 'temp/js/app/src/',
        src: ['*.js'], 
        dest:'temp/js/app/dist/'
      },
      alljs: {
        expand: true, 
        cwd: 'temp/js/',
        src: ['**/*.js'], 
        dest:'build/js/'
      },      
      html: {
        expand: true, 
        cwd: 'temp/html/',
        src: ['*.html'], 
        dest:'build/html/'
      } 
    },

    //step 2: 将文件中定义的匿名函数转为具名函数。保存在创建的产出目录
    transport: {  
      build: {
          options: {
            debug:false,
            // 是否采用相对地址
            relative: true,
            // 生成具名函数的id的格式 默认值为 {{family}}/{{name}}/{{version}}/{{filename}} filename自动补全
            format: '../js/{{filename}}' 
         },
          files: [{
            // 相对路径地址           
            cwd:'temp/js/',
            // 需要生成具名函数的文件集合
            src:['app/dist/*.js','tpl/*.js','common/*.js'],
            // 生成存放的文件目录
            dest:'temp/js/'
          }]
      }
    },

    //step 3: 将产出目录下的具名函数合并为一个js文件。
    concat: {
      index: {
          // the files to concatenate
          src: ['temp/js/app/dist/index.js','temp/js/tpl/*.js','temp/js/common/*.js'],
          // the location of the resulting JS file
          dest: 'build/js/app/dist/index.js'
      },
      detail: {
          // the files to concatenate
          src: ['temp/js/app/dist/detail.js','temp/js/tpl/*.js','temp/js/common/toast.js'],
          // the location of the resulting JS file
          dest: 'build/js/app/dist/detail.js'
      }      
    },

    //js代码检查
    /*jshint: {
      options: {
        "curly": true
    },
      beforeconcat: ['static/src/js/*.js'],
      afterconcat: ['static/dist/js/*.js']
    },*/

    //step 4: 压缩合并后的js文件
    uglify: {
      options:{
        //stripBanners: true,
        banner:'/*<%= pkg.name %>-<%= pkg.version %>  <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>*/\n'
      },              
      build: {
        files: {
          //'static/js/lib/seajs/2.2.0/sea.min.js': ['static/js/lib/seajs/2.2.0/sea.js'], 
          //'static/js/lib/jquery/jquery/3.0.0/jquery.min.js': ['static/js/lib/jquery/jquery/3.0.0/jquery.js'],
          //'static/js/lib/jquery/easing/1.3.0/easing.min.js': ['static/js/lib/jquery/easing/1.3.0/easing.js'],
          //'static/js/tools/swiper.js': ['static/js/tools/swiper.js'],
          //'static/js/lib/template/2.0.4/template.min.js': ['static/js/lib/template/2.0.4/template.js'],
          'build/js/app/dist/index.js': ['<%= concat.index.dest %>'],   //把合并目录下的js压缩
          'build/js/app/dist/detail.js': ['<%= concat.detail.dest %>']   //把合并目录下的js压缩
        }
      }
    },

    //step 5:压缩css文件
    cssmin: {
      options: {
        stripBanners: true,
        banner:'/*<%= pkg.name %>-<%= pkg.version %>  <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>*/\n'
      },
      build: {
        expand: true,
        cwd: 'temp/css/',
        src: ['*.css'],
        dest: 'build/css/',
        ext: '.min.css'
      }
    },

    //step 6: 图片文件压缩处理后到build目录  
    imagemin: {
      images: {
          options: {
              optimizationLevel: 3 //定义 PNG 图片优化水平
          },
          files: [{
              expand: true,
              cwd: 'temp/images/',
              src: ['**/*.{png,jpg,jpeg,gif}'], // 优化目录下所有 png/jpg/jpeg/gif图片
              dest: 'build/images/' // 优化后的图片保存位置，
          }]
      }
    },
    useminPrepare: {  
       html: 'build/html/index.html'  
    },  
  
    usemin: {  
      html: 'build/html/index.html',  
      options: {  
        blockReplacements: {  
            css: function (block) {  
              return '<link rel="stylesheet" href="' + sitepath + block.dest + '">';  
            }  
        }  
      }  
    },  

    //step 7:删除临时目录
    clean: {
      build: ['.build','temp']
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-usemin');

 grunt.registerTask('default', ['usemin']);
 // grunt.registerTask('default', ['clean','copy','transport','concat','uglify','cssmin','imagemin','usemin']);
  grunt.registerTask('release', ['clean','copy','transport','concat','uglify','cssmin']);

};