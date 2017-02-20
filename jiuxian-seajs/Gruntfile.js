module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //step 1: 复制入口main.js文件到生产目录  
    copy: {
      js: {
        expand: true, 
        cwd: 'static/js/app/src/',
        src: ['main.js','public-main.js'], 
        dest:'static/js/app/dist/'
      }
    },

    //step 2: 将文件中定义的匿名函数转为具名函数。保存在创建的临时目录
    transport: {  
      jiuxian: {
          options: {
            debug:false,
            // 是否采用相对地址
            relative: true,
            // 生成具名函数的id的格式 默认值为 {{family}}/{{name}}/{{version}}/{{filename}} filename自动补全
            format: '../js/{{filename}}' 
         },
          files: [{
            // 相对路径地址           
            cwd:'static/js/',
            // 需要生成具名函数的文件集合
            src:['app/src/*.js','!app/src/main.js','!app/src/public-main.js','app/dist/main.js','app/dist/public-main.js','tpl/*.js'],
            // 生成存放的文件目录
            dest:'.build'
          }]
      }
    },

    //step 3: 将临时目录下的具名函数合并为一个js文件，保存到生产目录。css文件合并。
    concat: {
      main: {
          // the files to concatenate
          src: ['.build/app/dist/main.js','.build/app/src/*.js','.build/tpl/*.js'],
          // the location of the resulting JS file
          dest: 'static/js/app/dist/main.js'
      },
      public_main: {
          // the files to concatenate
          src: ['.build/app/dist/public-main.js','.build/app/src/public.js'],
          // the location of the resulting JS file
          dest: 'static/js/app/dist/public-main.js'
      },
      css: {
          // the files to concatenate  注意css的导入顺序，如果顺序无关，可以直接static/src/css/*.css
          src: ['static/css/base.css','static/css/footer.css','static/css/header.css','static/css/menu.css','static/css/sidebar.css','static/css/index.css','static/css/index_1200.css'],
          // the location of the resulting css file
          dest: 'static/css/main.css'
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

    //step 4:压缩合并后的js文件
    /*uglify: {
      options:{
        //stripBanners: true,
      },              
      build: {
        files: [{
          expand:true,
          cwd:'static/js/app/src',
          src:'*.js',
          dest:'static/js/app/dist'

        }]
      }
    },*/

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
          //'static/js/lib/template/2.0.4/template-native.min.js': ['static/js/lib/template/2.0.4/template-native.js'],
          //'static/js/lib/template/2.0.4/template.min.js': ['static/js/lib/template/2.0.4/template.js'],
          'static/js/app/dist/main.js': ['<%= concat.main.dest %>'],   //把合并目录下的js压缩
          'static/js/app/dist/public-main.js': ['<%= concat.public_main.dest %>']   //把合并目录下的js压缩
        }
      }
    },

    //step 5:压缩合并后的css文件
    cssmin: {
      options: {
        stripBanners: true,
        banner:'/*<%= pkg.name %>-<%= pkg.version %>  <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>*/\n'
      },
      build: {
        src: ['<%= concat.css.dest %>'],
        dest: 'static/css/main.min.css'
      }
    },

    //step 6:删除临时目录
    clean: {
      build: ['.build']
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

 
  grunt.registerTask('default', ['copy','transport','concat','uglify','cssmin']);

};