export async function me(req, res, next) {
  let user = req.user;

  try {
    if (user) {
      res.json(user);
    } else {
      return next('User not found');
    }
  } catch(e) {
    return next(e);
  }
}

