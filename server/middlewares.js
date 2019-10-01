function checkloginStatus(req, res, next) {
  res.locals.user = req.session.currentUser ? req.session.currentUser : null
  res.locals.isLoggedIn = Boolean(req.session.currentUser)
  res.locals.isAdmin =
    res.locals.isLoggedIn && req.session.currentUser.role === 'admin'
  next()
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next()
  else next({ status: 403, message: 'Unauthorized' })
}

// function isAdmin(req, res, next) {
//   if (req.isAuthenticated()) next()
//   else next({ status: 403, message: 'Unauthorized' })
// }

module.exports = {
  isLoggedIn,
  checkloginStatus,
  // isAdmin,
}
