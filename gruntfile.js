module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "style.css": "style.less"
        }
      }
    },
    watch: {
      styles: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['css/**/*.less', 'css/*.less', 'style.less'],
        tasks: ['less']
      }
    },
    aws: grunt.file.readJSON(process.env.HOME 
      + '/Google\ Drive/Percolate\ Studio\ Corporate/Auth/config/percolate-s3-deploy.json'),
    s3: {
      options: {
        key: '<%= aws.key %>',
        secret: '<%= aws.secret %>',
        bucket: 'meetsous.com',
        region: 'us-west-1',
        access: 'public-read',
        headers: {
          // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
          "Cache-Control": "max-age=630720000, public",
          "Expires": new Date(Date.now() + 63072000000).toUTCString()
        },
        // maxOperations: 20,
        verify: true
      },
      deploy: {
        sync: [
          { src: 'fonts/*', dest: 'fonts' },
          { src: 'img/*', dest: 'img' },
          { src: 'js/*', dest: 'js' },
          { src: '*.png', dest: '/' },
          { src: 'index.html', dest: 'index.html' },
          { src: 'robots.txt', dest: 'robots.txt' },
          { src: 'style.css', dest: 'style.css' }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-s3');

  grunt.registerTask('default', ['watch']);
};