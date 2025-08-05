const sanitizeHtml = require('sanitize-html');

module.exports = (req, res, next) => {
  if (req.body.content) req.body.content = sanitizeHtml(req.body.content, { allowedTags: [], allowedAttributes: {} });
  if (req.body.text) req.body.text = sanitizeHtml(req.body.text, { allowedTags: [], allowedAttributes: {} });
  next();
};
