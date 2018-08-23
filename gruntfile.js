module.exports = function (grunt) {
  'use strict';  
  require("load-grunt-tasks")(grunt); 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	babel:{
		options:{
			sourceMap: true,
			presets: ['babel-preset-es2015']
		},
		dist:{
			files: [{
				expand: true,
				cwd: 'src/js/',
				src: ['**/*.js'],
				dest: 'babel/js/'
			}]
		}
	},
    uglify: {	
		options: {
			mangle: {
				except: ['jquery','md5','require','exports','module']
			},	
			banner: '/*!<%= pkg.name %> - v<%= pkg.version %>*/'
		},	
		my_target: {
			files: [{
				expand: true,//相对路径
				cwd: 'babel/js/',
				src: ['**/*.js'],
				dest: 'dist/js/'
			}]
		}
	},
	cssmin:{
		options: {
			keepSpecialComments: 0
		},
		my_target: {
			files: [{
				expand: true,//相对路径
				cwd: 'src/css/',
				src: ['**/*.css'],
				dest: 'dist/css/'
			}]
		}
	},
	imagemin: {
		options: {
			optimizationLevel: 3 //定义 PNG 图片优化水平
		},		
		my_target: {
			files: [{
				expand: true,
				cwd: 'images/',   // 图片在imagemin目录下
				src: ['**/*.{png,jpg,jpeg}'], // 优化 imagemin 目录下所有 png/jpg/jpeg 图片
				dest: 'img/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
			}]
		}
    }	
  });
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  // 默认任务
  grunt.registerTask('default', ['babel','uglify','cssmin']);
}