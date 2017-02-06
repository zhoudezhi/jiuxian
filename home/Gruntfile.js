module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //复制文件  
    /*copy: {
      images: {
        expand: true, 
        cwd: 'static/js/business/src/',
        src: 'main.js', 
        dest:'static/js/business/dist/'
      }
    },*/

    //将文件中定义的匿名函数转为具名函数
    transport: {  
      jiuxian: {
          options: {
            debug: false,
            // 生成具名函数的id的格式 默认值为 {{family}}/{{name}}/{{version}}/{{filename}} filename自动补全
            idleading: '../js/business/src/' 
         },
          files: [{
            // 是否使用相对路径
            expand: true, 
            // 相对路径地址           
            cwd:'static/js/business/src/',
            // 需要生成具名函数的文件集合
            src:['*.js','!main.js'],
            // 生成存放的文件目录
            dest:'.build'
          }]
      }
    },

    //js，css文件合并
    concat: {
      js: {
          // the files to concatenate
          src: ['static/js/business/dist/main.js','.build/*.js'],
          // the location of the resulting JS file
          dest: 'static/js/business/dist/init.js'
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

    //js压缩
    uglify: {
      options:{
        //stripBanners: true,
        banner:'/*<%= pkg.name %>-<%= pkg.version %>  <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>*/\n'
      },              
      build: {
        files: {
          //'static/js/lib/seajs/2.2.0/sea.min.js': ['static/js/lib/seajs/2.2.0/sea.js'], 
          //'static/js/lib/jquery/jquery/3.0.0/jquery-3.0.0.min.js': ['static/js/lib/jquery/jquery/3.0.0/jquery-3.0.0.js'],
          'static/js/business/dist/init.js': ['<%= concat.js.dest %>']   //把合并目录下的js压缩
        }
      }
    },

    //css压缩
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

    

    //删除临时目录
    clean: {
      build: ['.build']
    }
    
  });
  
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  
 
  grunt.registerTask('default', ['transport','concat','uglify','cssmin','clean']);

};