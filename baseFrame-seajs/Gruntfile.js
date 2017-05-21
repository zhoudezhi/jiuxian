module.exports = function(grunt) {
  var cdn = "//misc.360buyimg.com/busiuess/static/";
  cdn = '..';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //step 1:删除临时目录
    clean: {
      build: ['build','temp']
    },

    //step 2: 复制所有源文件到临时目录temp,所有的文件都从temp中取，避免覆盖源文件    
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

    //step 3: 将文件中定义的匿名函数转为具名函数。保存在创建的临时目录
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

   

    //step 4: 将临时目录下的具名函数合并为一个js文件保存到产出目录。
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

    //step 5: 压缩合并后的js文件
    uglify: {
      options:{
        banner:'/*<%= pkg.name %>-<%= pkg.version %>  <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>*/\n'
      },              
      build: {
        files: {
          //'static/js/tools/swiper.js': ['static/js/tools/swiper.js'],
          'build/js/app/dist/index.js': ['<%= concat.index.dest %>'],   //把合并目录下的js压缩
          'build/js/app/dist/detail.js': ['<%= concat.detail.dest %>']   //把合并目录下的js压缩
        }
      }
    },

    //step 6:压缩css文件
    cssmin: {
      options: {
        banner:'/*<%= pkg.name %>-<%= pkg.version %>  <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>*/\n'
      },
      build: {
        expand: true,
        cwd: 'temp/css/',
        src: ['*.css'],
        dest: 'build/css/',
        ext: '.css'
      }
    },

    //step 7: 图片文件压缩处理后到build目录  
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
    
    //step 8:对css和js用md5重命名。此处不能对js文件进行重命名，因为具名函数的id与文件名相关。
    //所以js文件只能手动刷新cdn
    filerev: {
      options: {
          algorithm: 'md5',
          length: 8
      },
      css: {
          src: 'build/css/*.css'
      }/*,
      js: {
          src: ['build/js/app/dist/*.js']
      }*/
    },

    //step 9:替换html中的md5文件名的引用 
    filerev_replace: {
      options: {
        assets_root: 'build/html'
      },
      compiled_assets: {
        src: 'build/html/*.html'
      }
    },

    //step 10:将产出文件的js复制到开发目录，用于本地测试即将发布的代码 
    copyto: {
      distJs: {
        files: [
          {cwd: 'build/js/app/dist/', src: ['*.js'], dest: 'static/js/app/dist/', expand: true}
        ]
      }
    },

    //step 11:部署CDN，替换html中静态资源的引用路径
    replace: {
      //htnl中引用的js、css、图片
      htmlUrl: {
        src: ['build/html/*.html'],
        dest: 'build/html/',
        replacements: [{
          from: /..\/css\//g,
          to: cdn + 'css/'
          },{
          from: /..\/js\//g,
          to: cdn + 'js/'
          },{
          from: /..\/images\//g,
          to: cdn + 'images/'
          }]
      },
      //模版中引用的图片，最后被压缩到产出目录中
      tplUrl: {
        src: ['build/js/app/dist/*.js'],
        dest: 'build/js/app/dist/',
        replacements: [{
          from: /..\/images\//g,
          to: cdn + 'images/'
          }]
      }
    }


  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');  
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-filerev-replace');
  grunt.loadNpmTasks('grunt-copy-to');
  grunt.loadNpmTasks('grunt-text-replace');

  /*var steps = [];
 
  if(release){
    steps.push('clean');
    steps.push('copy');
    steps.push('transport');
    steps.push('concat');
    steps.push('uglify');
    steps.push('cssmin');
    steps.push('imagemin');
    steps.push('filerev');
    steps.push('filerev_replace');
  }else{
    steps.push('clean');
    steps.push('copy');
    steps.push('transport');
    steps.push('concat');
    steps.push('uglify');
    steps.push('cssmin');
  }
  grunt.registerTask('default', steps);*/
  grunt.registerTask('default', ['clean','copy','transport','concat','uglify','cssmin','copyto']);
  grunt.registerTask('release', ['clean','copy','transport','concat','uglify','cssmin','imagemin','filerev','filerev_replace','copyto','replace']);
  

};