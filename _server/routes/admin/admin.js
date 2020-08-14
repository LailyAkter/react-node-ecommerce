module.exports = function(app){
  require('../../controllers/admin/adminController')(app,'/admin');
}
