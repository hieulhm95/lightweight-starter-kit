/**
 * NOTE: Untested, just a sample custom API routes handler
 */
const cookieOptions = {
  path: '/',
  domain: `.vieclamtot.${process.env.BASE_DOMAIN}`,
  maxAge: 86400000 * 90, // 90 days
};

const invokeToken = (req, res) => {
  res.cookie('privateToken', req.cookies['privateToken'], {
    ...cookieOptions,
    maxAge: 0,
  });
  res.cookie('refreshToken', req.cookies['refreshToken'], {
    ...cookieOptions,
    maxAge: 0,
  });
  res.cookie('u.ac', req.cookies['u.ac'], { ...cookieOptions, maxAge: 0 });
  res.cookie('userId', req.cookies['userId'], { ...cookieOptions, maxAge: 0 });
};

function deleteHandler(req, res) {
  if (req.cookies.privateToken && req.cookies.refreshToken) {
    // invoke current access_token due to its expired
    invokeToken(req, res);
    return res.json({ success: true });
  }
  return res.json({ success: false });
}

export default function handler(req, res) {
  if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  } else {
    if (
      !req.cookies.privateToken &&
      !req.cookies.refreshToken &&
      req.cookies.state === req.body.state // only share the cookies if client state match response state
    ) {
      res.cookie('privateToken', req.body['privateToken'], cookieOptions);
      res.cookie('refreshToken', req.body['refreshToken'], cookieOptions);
      res.cookie('u.ac', req.body['uAc'], cookieOptions);
      res.cookie('userId', req.body['userId'], cookieOptions);
      return res.json({ success: true });
    }
    return res.json({ success: false });
  }
}
